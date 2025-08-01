"use client";
import { useState } from "react";
import { FaBars } from 'react-icons/fa';
import { FiHome, FiCalendar, FiBook, FiUser, FiX, FiSettings } from "react-icons/fi";
import Link from "next/link";

export default function Events() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<{ id: string; title: string; date: string; location: string; image: string; }[]>([]);
  const [eventDetails, setEventDetails] = useState({ title: "", date: "", location: "", image: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([...events, { ...eventDetails, id: Date.now().toString() }]);
    setEventDetails({ title: "", date: "", location: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-black to-gray-900 p-5 text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 text-gray-200 h-24 w-full bg-black/70 shadow-lg rounded-xl relative">
        <button onClick={() => setIsOpen(true)}>
          <FaBars size={32} className="text-white hover:text-purple-400 transition" />
        </button>
        <h2 className="text-4xl font-bold text-center mx-auto my-10">About All Types of Events</h2>
      </header>

      {/* Massive Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <h1 className="text-3xl font-bold">FestBook</h1>
                <button onClick={() => setIsOpen(false)}>
                  <FiX size={28} className="text-white hover:text-red-500 transition" />
                </button>
              </div>
        <ul className="mt-6 px-8 space-y-6 text-lg">
          {[
           { name: 'Dashboard', icon: <FiHome size={24} />, href: '/customer/dashboard' },
           { name: 'Events', icon: <FiCalendar size={24} />, href: '/customer/events' },
           { name: 'Bookings', icon: <FiBook size={24} />, href: '/customer/dashboard/bookings' },
           { name: 'Profile', icon: <FiUser size={24} />, href: '/profile' },
           { name: 'Settings', icon: <FiSettings size={24} />, href: '/customer/settings' },
          ].map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="flex items-center space-x-4 hover:text-purple-400 transition">
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

{/* Event Registration Section */}
      <h2 className="text-4xl font-bold text-center my-10"></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {/* Event Cards with Gradients */}
        {[
  { title: "Marriage & Wedding", img: "/wedding.jpg", desc: "Mela vaaithiyam, chenda melam for weddings.", link: "/customer/M&W" },
  { title: "House Warming", img: "/house warming.jpg", desc: "Multi-cuisine catering services available.", link: "/customer/H&W" },
  { title: "Birthday Party", img: "/birthday party.jpg", desc: "Multi-cuisine catering services available.", link: "/customer/B&P" },
  { title: "Puberty Function", img: "/Puberty Function.png", desc: "Wedding car decoration & transport services.", link: "/customer/P&F" },
  { title: "Anniversaries", img: "/Anniversary.jpg", desc: "Make your special day memorable.", link: "/customer/A&V" },
  { title: "Engagements", img: "/Engagement.jpg", desc: "Celebrate your love with a grand engagement.", link: "/customer/E&M" },
  { title: "Baby Showers", img: "/Baby Shower.jpg", desc: "Celebrate the arrival of your little one.", link: "/customer/B&S" },
  { title: "Graduation Parties", img: "/Graduation.jpg", desc: "  ", link: "/customer/G&P" },
  

  
  
].map((event, index) => (
  <Link href={event.link} key={index} passHref>
    <div className="relative overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
      <img src={event.img} alt={event.title} className="w-full h-48 object-cover rounded-xl" />
      <div className="absolute bottom-0 p-4">
        <h3 className="text-2xl font-semibold text-white">{event.title}</h3>
        <p className="text-white text-sm">{event.desc}</p>
      </div>
    </div>
  </Link>
))}
      </div>
    </div>
  );
}
