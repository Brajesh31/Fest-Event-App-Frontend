"use client";
import { useState, useEffect } from "react";
import { FaBars } from 'react-icons/fa';
import { FiHome, FiCalendar, FiBook, FiUser, FiX, FiSettings, FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [settings, setSettings] = useState({
    username: "",
    email: "",
    password: "",
    notifications: true,
    language: "English",
    accountStatus: "Active"
  });

  useEffect(() => {
    document.body.className = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";
  }, [isDarkMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Settings Updated!');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-5`}>
      {/* Header */}
      <header className={`flex justify-between items-center px-8 py-6 h-24 w-full rounded-xl relative shadow-lg ${isDarkMode ? "bg-black/70 text-white" : "bg-gray-100 text-black"}`}>
        <button onClick={() => setIsOpen(true)}>
          <FaBars size={32} className={`${isDarkMode ? "text-white" : "text-black"} hover:text-blue-400 transition`} />
        </button>
        <h2 className="text-4xl font-bold text-center mx-auto my-10">Profile Settings</h2>
        <div className="flex items-center space-x-4">
          <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
        </div>
      </header>

      {/* Sidebar */}
           <nav
             className={`fixed top-0 left-0 h-full w-[240px] bg-gray-900 text-white z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
               } transition-transform duration-300 ease-in-out shadow-2xl`}
           >
             <div className="flex justify-between items-center p-6 border-b border-gray-700">
               <h1 className="text-3xl font-bold">FestBook</h1>
               <button onClick={() => setIsOpen(false)}>
                 <FiX size={28} className="text-white hover:text-red-500 transition" />
               </button>
             </div>
     
             {/* Sidebar Links */}
             <ul className="mt-6 px-8 space-y-6 text-lg">
               {[
                 { name: "Dashboard", icon: <FiHome size={24} />, href: "/customer/dashboard" },
                 { name: "Events", icon: <FiCalendar size={24} />, href: "/customer/events" },
                 { name: "Bookings", icon: <FiBook size={24} />, href: "/customer/dashboard/bookings" },
                 { name: "Profile", icon: <FiUser size={24} />, href: "/profile" },
                 { name: "Settings", icon: <FiSettings size={24} />, href: "/customer/settings" },
               ].map((link) => (
                 <li key={link.name}>
                   <Link href={link.href} className="flex items-center space-x-4 hover:text-blue-400 transition">
                     {link.icon}
                     <span>{link.name}</span>
                   </Link>
                 </li>
               ))}
             </ul>
     
             {/* Logout Button */}
             <div className="absolute bottom-10 left-10">
               <div className="ml-auto flex items-center gap-4">
                 <div className="hover:bg-gray-800 transition rounded-lg px-4 py-2">
                   <UserButton />
                 </div>
               </div>
             </div>
           </nav>
     
      {/* Settings Form */}
      <div className="flex justify-center items-center mt-12 px-4">
        <div className="p-8 rounded-xl shadow-xl w-full max-w-3xl bg-opacity-10 bg-black/20">
          <h2 className="text-3xl font-bold text-center mb-6">Update Your Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input name="username" type="text" value={settings.username} onChange={handleInputChange} placeholder="Enter username" className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input name="email" type="email" value={settings.email} onChange={handleInputChange} placeholder="Enter email" className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input name="password" type="password" value={settings.password} onChange={handleInputChange} placeholder="Enter password" className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Language</label>
              <select name="language" value={settings.language} onChange={handleInputChange} className="mt-2 p-3 w-full border border-gray-700 rounded-md bg-gray-800 text-white focus:border-blue-500">
                <option>English</option>
                <option>Tamil</option>
                <option>Hindi</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Enable Notifications</label>
              <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleCheckboxChange} />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Theme</label>
              <button type="button" onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </div>
            <button className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}
