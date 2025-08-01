"use client";
import { useState } from "react";
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { FiHome, FiCalendar, FiBook, FiUser, FiX, FiSettings } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Events() {
  const router = useRouter();
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
       {/* Left: Hamburger Menu */}
       <button onClick={() => setIsOpen(true)}>
         <FaBars size={32} className="text-white hover:text-purple-400 transition" />
       </button>
     
       {/* Center: Title */}
       <h2 className="text-4xl font-bold text-center absolute left-1/2 transform -translate-x-1/2">Baby Showers</h2>
     
       {/* Right: Back Button */}
       <button onClick={() => router.back()}>
         <FaArrowLeft size={28} className="text-white hover:text-purple-400 transition" />
       </button>
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
          {[{ name: "Home", icon: <FiHome size={24} />, href: "home" },
            { name: "Dashboard", icon: <FiHome size={24} />, href: "/dashboard" },
            { name: "Events", icon: <FiCalendar size={24} />, href: "/events" },
            { name: "Bookings", icon: <FiBook size={24} />, href: "/bookings" },
            { name: "Settings", icon: <FiSettings size={24} />, href: "/settings" },
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
           {title: "Balloon Decoration",img: "/Balloon Decoration.jpg",desc: "Creative balloon setups for parties & events.",link: "/services/balloon-decoration"},
          { title: "Photography & Videography", img: "/Photo & Video Shoot.jpg", desc: "Capture your event's best moments." },
          { title: "DJ & Sound Systems", img: "/DJ & Sound.jpg", desc: "Professional DJ services for all events." },
          {title: "Beautician",img: "/beautician.jpg",desc: "Bridal makeup, hairstyling & grooming services."},
          { title: "Floral Decorations", img: "/floral.jpg", desc: "Beautiful floral arrangements for your event." },
          { title: "Invitation Cards", img: "/Invitation Cards.jpg", desc: "Design custom invitation cards." },
          { title: "Food Supply", img: "/Food Supply.jpg", desc: "Multi-cuisine catering services available." },
          { title: "Stage Decorations", img: "/Stage Decorations.jpg", desc: "Stage decoration with floral & themes." },
          { title: "Vehicle Arrangement", img: "/vehicle.jpg", desc: "Wedding car decoration & transport services." }
          
        ].map((event, index) => (
          <div key={index} className="relative overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
            <img src={event.img} alt={event.title} className="w-full h-48 object-cover rounded-xl" />
            <div className="absolute bottom-0 p-4">
              <h3 className="text-2xl font-semibold">{event.title}</h3>
              <p className="text-white text-sm">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    
      {/* About & Contact Section */}
<div className="mt-20 px-8">
  {/* About */}
  <section className="mb-16">
  <div className="w-full max-w-6xl mx-auto">
    <div className="h-1 bg-white mx-auto mb-6 rounded-full"></div>
    <h2 className="text-4xl font-bold text-center mb-10 text-white">About</h2>
    <p className="text-gray-300 text-lg leading-relaxed text-center max-w-6xl mx-auto">
    A baby shower is a heartwarming celebration held in anticipation of a new life entering the world. It is a joyous occasion where family and friends come together to honor and support the expectant parents, especially the mother-to-be, as they prepare for the arrival of their baby. Traditionally, baby showers involve giving thoughtful gifts that help the parents with baby essentials such as clothes, diapers, toys, and nursery items. These gestures symbolize care, love, and the shared excitement of welcoming a new member into the family.

The event often includes fun games, themed decorations, delicious food, and heartfelt moments, creating lasting memories for everyone involved. In some cultures, baby showers also incorporate blessings, prayers, or rituals to ensure a healthy and safe delivery. While the format and traditions may vary, the core purpose remains the same — to celebrate the upcoming birth and offer emotional and practical support to the parents.

Baby showers not only strengthen bonds among loved ones but also provide reassurance and encouragement to first-time parents. It’s a beautiful way to surround the growing family with love, positivity, and good wishes, making it a cherished milestone on the journey to parenthood.</p>
  </div>
  </section>
</div> 
  
    </div>
  );
}
