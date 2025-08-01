"use client";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import {
    FiHome,
    FiCalendar,
    FiBook,
    FiUser,
    FiX,
    FiSettings,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../organiser/contexts/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EventForm() {
    const { isAuthenticated, loading, userData, logout } = useAuth();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [eventDetails, setEventDetails] = useState({
        title: "",
        description: "",
        imageUrl: "",
    });

    const [events, setEvents] = useState<
        {
            _id: string;
            title: string;
            description: string;
            imageUrl: string;
        }[]
    >([]);

    // Fetch events on load
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    "https://fest-event-app-backend.onrender.com/api/events"
                );
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    // Input Change Handler
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
    };

    // Edit Handler
    const handleEdit = (event: (typeof events)[0]) => {
        setEventDetails({
            title: event.title,
            description: event.description,
            imageUrl: event.imageUrl,
        });
        setEditingId(event._id);
    };

    // Delete Handler
    const handleDelete = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete this event?");
        if (!confirmed) return;

        try {
            await axios.delete(`https://fest-event-app-backend.onrender.com/api/events/${id}`);
            setEvents(events.filter((ev) => ev._id !== id));
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Failed to delete event.");
        }
    };

    // Form Submit Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingId
                ? `https://fest-event-app-backend.onrender.com/api/events/${editingId}`
                : "https://fest-event-app-backend.onrender.com/api/events";

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventDetails),
            });

            if (!response.ok) throw new Error("Failed to submit event");

            const result = await response.json();

            if (editingId) {
                setEvents((prev) =>
                    prev.map((ev) => (ev._id === editingId ? result : ev))
                );
            } else {
                setEvents((prev) => [...prev, result]);
            }

            setEventDetails({ title: "", description: "", imageUrl: "" });
            setEditingId(null);

            alert(editingId ? "Event updated successfully!" : "Event created successfully!");
        } catch (error) {
            console.error("Error submitting event:", error);
            alert("Error submitting event");
        }
    };

    // Logout with confirmation
    const handleLogout = () => {
        const confirmed = confirm("Are you sure you want to logout?");
        if (confirmed) {
            logout();
            router.push("/organiser/login");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white p-5 w-screen">
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-6 bg-black/80 rounded-xl shadow-md">
                <button onClick={() => setIsOpen(true)}>
                    <FaBars size={28} className="text-white hover:text-blue-400 transition" />
                </button>
                <h2 className="text-3xl font-bold text-center flex-1 hover:text-yellow-400">
                    Adding Types of Event
                </h2>
            </header>

            {/* Sidebar */}
            <nav className={`fixed top-0 left-0 h-full w-[240px] bg-black text-white z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out shadow-xl`}>
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <Image src="/icon.png" alt="Logo" width={40} height={40} className="rounded-full" />
                        <h1 className="text-2xl font-bold">Organiser</h1>
                    </div>
                    <button onClick={() => setIsOpen(false)}>
                        <FiX size={26} className="text-white hover:text-red-500" />
                    </button>
                </div>

                <ul className="mt-6 px-8 space-y-5 text-md">
                    {[{ name: "Dashboard", icon: <FiHome size={22} />, href: "/organiser/dashboard" },
                    { name: "Organiser Details", icon: <FiUser size={22} />, href: "/organiser/profile" },
                    { name: "Event Details", icon: <FiCalendar size={22} />, href: "/organiser/events" },
                    { name: "Bookings", icon: <FiBook size={22} />, href: "/organiser/dashboard/bookings" },
                    { name: "Settings", icon: <FiSettings size={22} />, href: "/organiser/settings" }].map((link) => (
                        <li key={link.name}>
                            <Link href={link.href} className="flex items-center space-x-3 hover:text-blue-400">
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <br></br>
                <div className="px-6 pb-6 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-blue-800 hover:bg-yellow-500 transition text-white px-4 py-2 rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Event Form */}
            <div className="flex justify-center mt-12 px-4">
                <div className="bg-black p-8 rounded-xl shadow-lg w-full max-w-3xl">
                    <h2 className="text-2xl font-bold text-center mb-6">{editingId ? "Update" : "Create"} Event</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium">Event Title</label>
                            <input
                                type="text"
                                name="title"
                                value={eventDetails.title}
                                onChange={handleInputChange}
                                className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-400"
                                placeholder="Enter event title"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium">Description</label>
                            <textarea
                                name="description"
                                value={eventDetails.description}
                                onChange={handleInputChange}
                                className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-400"
                                placeholder="Enter event description"
                                rows={4}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium">Image URL</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={eventDetails.imageUrl}
                                onChange={handleInputChange}
                                className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:ring focus:ring-blue-400"
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-3 rounded-md text-white font-semibold transition ${editingId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
                        >
                            {editingId ? "Update Event" : "Create Event"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Display Events */}
            <div className="mt-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Events List</h2>
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="bg-black p-4 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                            >
                                <img
                                    src={event.imageUrl}
                                    alt={event.title || "Event image"}
                                    className="w-full h-40 object-cover rounded-md mb-3"
                                />
                                <h3 className="text-xl font-bold">{event.title}</h3>
                                <p className="text-sm text-gray-300 mt-1">{event.description}</p>
                                <div className="flex justify-between gap-2 mt-4">
                                    <button
                                        onClick={() => handleEdit(event)}
                                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded transition w-full"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded transition w-full"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">No events created yet.</p>
                )}
            </div>
        </div>
    );
}
