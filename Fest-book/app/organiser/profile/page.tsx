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

export default function OrganiserForm() {
    const { isAuthenticated, loading, userData, logout } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [organiserDetails, setOrganiserDetails] = useState({
        name: "",
        phone: "",
        address: "",
        eventId: "",
        eventName: "",
        imageUrls: "",
    });

    const [organisers, setOrganisers] = useState<
        {
            _id: string;
            name: string;
            phone: string;
            address: string;
            eventId: number;
            eventName: string;
            imageUrls: string[];
        }[]
    >([]);

    // Fetch organisers on component mount
    useEffect(() => {
        const fetchOrganisers = async () => {
            try {
                const response = await axios.get(
                    "https://fest-event-app-backend.onrender.com/api/organiserdetails"
                );
                setOrganisers(response.data);
            } catch (error) {
                console.error("Error fetching organisers:", error);
            }
        };

        fetchOrganisers();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setOrganiserDetails({
            ...organiserDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (org: (typeof organisers)[0]) => {
        setOrganiserDetails({
            name: org.name,
            phone: org.phone,
            address: org.address,
            eventId: org.eventId.toString(),
            eventName: org.eventName,
            imageUrls: org.imageUrls.join(", "),
        });
        setEditingId(org._id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this organizer?")) return;

        try {
            await axios.delete(
                `https://fest-event-app-backend.onrender.com/api/organiserdetails/${id}`
            );
            setOrganisers(organisers.filter((org) => org._id !== id));
        } catch (error) {
            console.error("Error deleting organiser:", error);
            alert("Failed to delete organizer.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formattedDetails = {
            ...organiserDetails,
            imageUrls: organiserDetails.imageUrls
                .split(",")
                .map((url) => url.trim()),
        };

        try {
            const url = editingId
                ? `https://fest-event-app-backend.onrender.com/api/organiserdetails/${editingId}`
                : `https://fest-event-app-backend.onrender.com/api/organiserdetails`;

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedDetails),
            });

            if (!response.ok) throw new Error("Failed to submit organizer");

            const result = await response.json();

            if (editingId) {
                setOrganisers((prev) =>
                    prev.map((org) => (org._id === editingId ? result : org))
                );
            } else {
                setOrganisers((prev) => [...prev, result]);
            }

            setOrganiserDetails({
                name: "",
                phone: "",
                address: "",
                eventId: "",
                eventName: "",
                imageUrls: "",
            });
            setEditingId(null);

            alert(editingId ? "Organizer updated successfully!" : "Organizer registered successfully!");
            router.push("/organiser/dashboard");
        } catch (error) {
            console.error("Error submitting organizer:", error);
            alert("Error submitting organizer");
        }
    };

    const handleLogout = () => {
        logout();
        if (confirm("Are you sure you want to logout")) {
            router.push("/organiser/login");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 via-black to-gray-900 p-5 text-white w-screen">
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-6 text-gray-200 h-24 w-full bg-black/70 shadow-lg rounded-xl relative">
                <button onClick={() => setIsOpen(true)}>
                    <FaBars size={36} className="text-white hover:text-blue-400 transition" />
                </button>
                <h2 className="text-3xl sm:text-2xl font-bold hover:text-yellow-400 transition text-center flex-1">
                    Organizer Details
                </h2>
            </header>

            {/* Sidebar */}
            <nav
                className={`fixed top-0 left-0 h-full w-[240px] bg-black text-white z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out shadow-2xl`}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <Image src="/icon.png" alt="Logo" width={40} height={40} className="rounded-full" />
                        <h1 className="text-2xl font-bold">Organiser</h1>
                    </div>
                    <button onClick={() => setIsOpen(false)}>
                        <FiX size={28} className="text-white hover:text-red-500 transition" />
                    </button>
                </div>

                <ul className="mt-6 px-8 space-y-6 text-md">
                    {[
                        { name: "Dashboard", icon: <FiHome size={24} />, href: "/organiser/dashboard" },
                        { name: "Organiser Details", icon: <FiUser size={24} />, href: "/organiser/profile" },
                        { name: "Add Events", icon: <FiCalendar size={24} />, href: "/organiser/events" },
                        { name: "Bookings", icon: <FiBook size={24} />, href: "/organiser/dashboard/bookings" },
                        { name: "Settings", icon: <FiSettings size={24} />, href: "/organiser/settings" },
                    ].map((link) => (
                        <li key={link.name}>
                            <Link href={link.href} className="flex items-center space-x-4 hover:text-blue-400 transition">
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
                        className="w-full bg-blue-900 hover:bg-yellow-500 transition text-white px-4 py-2 rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Organiser Form */}
            <div className="flex justify-center items-center mt-12 px-4">
                <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-3xl">
                    <h2 className="text-3xl font-bold text-center mb-6">Register your Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {[
                            { id: "name", type: "text", label: "Organizer Name", placeholder: "Enter your name" },
                            { id: "phone", type: "tel", label: "Phone Number", placeholder: "Enter your phone number" },
                            { id: "address", type: "text", label: "Address", placeholder: "Enter your address" },
                            { id: "eventId", type: "text", label: "Event ID", placeholder: "Enter your event ID" },
                            { id: "eventName", type: "text", label: "Event Name", placeholder: "Enter your event name" },
                            { id: "imageUrls", type: "text", label: "Image URLs (comma-separated)", placeholder: "https://img1.com, https://img2.com" },
                        ].map((input) => (
                            <div key={input.id}>
                                <label htmlFor={input.id} className="block text-sm font-medium">
                                    {input.label}
                                </label>
                                <input
                                    type={input.type}
                                    id={input.id}
                                    name={input.id}
                                    value={organiserDetails[input.id as keyof typeof organiserDetails]}
                                    onChange={handleInputChange}
                                    className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500 focus:ring focus:ring-blue-300"
                                    placeholder={input.placeholder}
                                    required
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className={`w-full p-3 font-semibold rounded-md transition ${editingId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                                } text-white`}
                        >
                            {editingId ? "Update Organizer" : "Register Organizer"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Registered Organisers */}
            <div>
                <h2 className="text-4xl font-semibold text-center my-10">Registered Organizers</h2>
                {organisers.length === 0 ? (
                    <p className="text-center text-gray-400">No organisers registered yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                        {organisers.map((org) => (
                            <div
                                key={org._id}
                                className="rounded-xl shadow-lg bg-gray-800 p-4 space-y-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-white">{org.eventName}</h3>
                                    <p className="text-sm text-gray-300">Organizer: {org.name}</p>
                                    <p className="text-sm text-gray-300">Phone: {org.phone}</p>
                                    <p className="text-sm text-gray-300">Address: {org.address}</p>
                                    <p className="text-sm text-gray-300">Event ID: {org.eventId}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {org.imageUrls.map((url, i) => (
                                        <img
                                            key={i}
                                            src={url}
                                            alt={`Image ${i + 1}`}
                                            className="w-full h-24 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between gap-2 mt-4">
                                    <button
                                        onClick={() => handleEdit(org)}
                                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded transition w-full sm:w-auto"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(org._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded transition w-full sm:w-auto"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
