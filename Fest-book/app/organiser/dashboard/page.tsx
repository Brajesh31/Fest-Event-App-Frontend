"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../organiser/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import { FiX, FiHome, FiCalendar, FiBook, FiUser, FiSettings } from "react-icons/fi";
import axios from "axios";

export default function DashboardPage() {
    const { isAuthenticated, loading, userData, logout } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    interface Event {
        _id: string;
        title: string;
        description: string;
        imageUrl: string;
        // add other fields if needed
    }

    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        if (loading || isAuthenticated) {
            router.push("/organiser/dashboard");
        }
    }, [loading, isAuthenticated, router]);

    const handleLogout = () => {
        logout();
        confirm("Are you sure want to logout");
        router.push("/organiser/login");
    };

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

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 via-black to-gray-900 p-5 text-white w-screen">
            {/* Header */}
            <header className="flex justify-between items-center px-8 py-6 text-gray-200 h-24 w-full bg-black/70 shadow-lg rounded-xl relative">
                <button onClick={() => setIsOpen(true)}>
                    <FaBars size={36} className="text-white hover:text-blue-400 transition" />
                </button>
                <h2 className="text-2xl sm:text-2xl font-bold hover:text-yellow-400 transition text-center flex-1">Organiser Dashboard</h2>

                {/* Sidebar Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}

                {/* Sidebar */}
                <nav
                    className={`fixed top-0 left-0 h-full w-[240px] bg-black text-white z-50 transform 
                        ${isOpen ? "translate-x-0" : "-translate-x-full"
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
                        {[{ name: "Dashboard", icon: <FiHome size={24} />, href: "/organiser/dashboard" },
                        { name: "Organiser Details", icon: <FiUser size={24} />, href: "/organiser/profile" },
                        { name: "Add Events", icon: <FiCalendar size={24} />, href: "/organiser/events" },
                        { name: "Bookings", icon: <FiBook size={24} />, href: "/organiser/dashboard/bookings" },
                        { name: "Settings", icon: <FiSettings size={24} />, href: "/organiser/settings" }].map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="flex items-center space-x-4 hover:text-blue-400 transition">
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="px-6 pb-6 mt-6">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-blue-900 hover:bg-yellow-500 transition text-white px-4 py-2 rounded-md"
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            </header>

            {/* Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <h2 className="text-xl sm:text-4xl font-bold mb-4">
                    Hello, {"Organisers"} 👋
                </h2>

                {/* Registered Organizers */}
                <div>
                    <h2 className="text-4xl font-semibold text-center my-10">Organizers for</h2>
                    <h2 className="text-3xl font-bold text-center mb-8">Events List</h2>

                    {events.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-2 md:px-10">
                            {events.map((event) => (
                                <Link
                                    key={event._id}
                                    href={`/organiser/events/${encodeURIComponent(event.title)}`}
                                    className="bg-black rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.03] duration-300 overflow-hidden"
                                >
                                    <div className="w-full h-48 sm:h-50 md:h-45 overflow-hidden">
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title || "Event image"}
                                            className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-200"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold text-yellow-300">{event.title}</h3>
                                        <p className="text-sm text-gray-300 mt-2 line-clamp-3">{event.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    ) : (
                        <p className="text-center text-gray-400">No events available yet.</p>
                    )}
                </div>
            </main>
        </div>
    );
}
