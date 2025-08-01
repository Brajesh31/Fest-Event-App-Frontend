'use client';

import { useState } from "react";
import { FaUser, FaCalendarAlt, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  return (
    <div>
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/home.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo (optional) */}
        <div className="text-white text-xl font-bold"></div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          <li>
            <Link href="#about" className="flex items-center gap-2 hover:text-gray-300">
              <FaUser /> About
            </Link>
          </li>
          <li>
            <Link href="#event-management" className="flex items-center gap-2 hover:text-gray-300">
              <FaCalendarAlt /> Events
            </Link>
          </li>
          <li>
            <Link href="#contact" className="flex items-center gap-2 hover:text-gray-300">
              <FaEnvelope /> Contact
            </Link>
          </li>
        </ul>

        {/* User Button / Login */}
        <div className="text-white">

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black bg-opacity-70 px-6 py-4 text-white text-center space-y-4">
          <Link href="#about" className="flex items-center justify-center gap-2 hover:text-gray-300">
            <FaUser /> About
          </Link>
          <Link href="#event-management" className="flex items-center justify-center gap-2 hover:text-gray-300">
            <FaCalendarAlt /> Events
          </Link>
          <Link href="#contact" className="flex items-center justify-center gap-2 hover:text-gray-300">
            <FaEnvelope /> Contact
          </Link>
          {!isSignedIn && (
            <Link href="/customer/sign-in" className="block text-white text-bold hover:underline">
              Login 
            </Link>
          )}
        </div>
      )}
    </nav>
       {/* Hero Section with Full-Page Background */}
      <section
        className="flex flex-col justify-center items-center text-center min-h-screen text-white px-10 w-screen"
        style={{
          backgroundImage: "url('/home.jpg')", // Use WebP for better quality
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed" // Ensures smooth scrolling effect
        }}
      >
        <div className="text-center bg-gradient-to-b">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Plan & Manage Your Events Seamlessly
          </h1>

          <p className="mt-4 text-lg text-gray-300">
            From corporate gatherings to weddings, we make every event unforgettable.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block px-6 py-3 bg-white text-blue-500 font-bold rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            Explore Events
          </Link>

        </div>
      </section>

      <section
        className="relative py-30 bg-cover bg-center"
        style={{ backgroundImage: "url('/login.jpg')" }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center max-w-lg mx-auto text-white">
          <h1 className="text-5xl font-semibold">Login</h1>
          <p className="mt-4 text-lg">
            Please choose your role to log in and access the appropriate platform.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { href: "/customer/sign-in", text: "Customer Login", bg: "bg-yellow-300", hover: "hover:bg-yellow-200" },
              { href: "/organiser/login", text: "Organizer Login", bg: "bg-teal-500", hover: "hover:bg-teal-600" },
            ].map((btn, index) => (
              <a
                key={index}
                href={btn.href}
                className={`inline-block rounded-full ${btn.bg} px-8 py-3 text-lg font-medium text-black transition duration-300 transform shadow-lg ${btn.hover} hover:scale-105 hover:shadow-2xl`}
              >
                {btn.text}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (Black Background) */}
      <section id="about" className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center text-white">About Us</h2>
          <p className="mt-4 text-center text-lg text-gray-300">
            Organizing a festival is no small feat, but with Fest Book, event management becomes smarter, faster, and more efficient.
            Our platform empowers event organizers, venue managers, and vendors with cutting-edge tools to streamline planning, enhance engagement, and deliver unforgettable experiences.
          </p>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-white">Why Choose Us?</h3>
            <p className="mt-4 text-lg text-gray-300">
              We take pride in delivering exceptional results for our clients. Here’s why you should choose us:
            </p>
            <ul className="mt-8 space-y-4 text-lg text-gray-300">
              <li>Our cutting-edge platform integrates event discovery, social networking, and real-time updates to enhance the festival experience.</li>
              <li>Organizers gain valuable analytics to optimize events, improve audience engagement, and enhance future planning.</li>
              <li>Whether it's a local cultural fest or an international music festival, Fest Book adapts to events of any scale.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="event-management" className="bg-gradient-to-br from-black via-gray-800 to-black text-white py-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center">Event Management</h2>
          <p className="mt-4 text-center text-lg text-gray-300">
            Our event management services offer everything you need to make your next event a success. From
            planning and coordination to execution, we handle every detail with care and professionalism.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Event Type */}
            {[
              { title: "Wedding Music Artists", image: "/wedding.jpg", desc: "We arrange mela vaaithiyam, chenda melam for weddings." },
              { title: "Photo & Video Shoot", image: "/Photo & Video Shoot.jpg", desc: "Make your event memorable with stunning photos & videos." },
              { title: "Food Supply", image: "/Food Supply.jpg", desc: "We provide multi-cuisine catering services." },
              { title: "Invitation Cards", image: "/Invitation Cards.jpg", desc: "Custom-designed invitation cards with unique styles." },
              { title: "Stage Decorations", image: "/Stage Decorations.jpg", desc: "We decorate stages with themes or floral designs." },
              { title: "Vehicle Arrangement", image: "/vehicle.jpg", desc: "Wedding car decoration & transport facilities available." },
            ].map((event, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-center h-48 md:h-60 lg:h-60 bg-cover bg-center text-white p-6 shadow-lg rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-black/60 to-gray-800/80"
                style={{ backgroundImage: `url('${event.image}')` }}
              >
                <div className="relative z-10 px-4">
                  <h3 className="text-2xl font-semibold">{event.title}</h3>
                  <p className="mt-3 text-lg text-gray-200 leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact"
        className="relative py-16 bg-cover bg-center"
        style={{ backgroundImage: "url('/sign.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center max-w-lg mx-auto text-white">
          <h3 className="text-2xl font-semibold">Contact Us</h3>
          <p className="mt-4 text-lg">
            If you have any questions or would like to inquire about our event management services, don't hesitate to reach out.
          </p>

          <form className="mt-8 max-w-lg mx-auto space-y-4">
            <input
              className="w-full rounded-full border border-gray-400 px-6 py-3 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
              type="text"
              placeholder="Your Name"
              required
            />
            <input
              className="w-full rounded-full border border-gray-400 px-6 py-3 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
              type="email"
              placeholder="Your Email"
              required
            />
            <textarea
              className="w-full rounded-lg border border-gray-400 px-6 py-3 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
              placeholder="Your Message"
              rows={4}
              required
            ></textarea>
            <button
              className="block w-full rounded-full bg-indigo-800 px-8 py-3 font-medium text-white transition hover:bg-indigo-600"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>

      </section>
      <footer className="bg-black dark:bg-grey-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Fest-book</h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Organizing a festival is no small feat, but with Fest-book, event management becomes smarter, faster, and more efficient.
                Our platform empowers event organizers, venue managers, and vendors with cutting-edge tools to streamline planning, enhance engagement, and deliver unforgettable experiences.
              </p>
              <br></br>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Quick Links</h2>
              <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-teal-700 transition hover:text-teal-700/75 dark:text-teal-500 dark:hover:text-teal-500/75"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-teal-700 transition hover:text-teal-700/75 dark:text-teal-500 dark:hover:text-teal-500/75"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-teal-700 transition hover:text-teal-700/75 dark:text-teal-500 dark:hover:text-teal-500/75"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-teal-700 transition hover:text-teal-700/75 dark:text-teal-500 dark:hover:text-teal-500/75"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-teal-700 transition hover:text-teal-700/75 dark:text-teal-500 dark:hover:text-teal-500/75"
                  >
                    <span className="sr-only">Dribbble</span>
                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Event Categories</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" href="#">Concerts & Music Festivals</a>
                  </li>
                  <li>
                    <a className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" href="#">Corporate Events</a>
                  </li>
                  <li>
                    <a className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" href="#">Weddings & Celebrations</a>
                  </li>
                  <li>
                    <a className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" href="#">Sports & Competitions</a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Our Services</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" href="#">Event Planning</a>
                  </li>
                  <li>
                    <a className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" href="#">Venue Booking</a>
                  </li>
                  <li>
                    <a className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" href="#">Catering & Decor</a>
                  </li>
                  <li>
                    <a className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" href="#">Ticketing & Registration</a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Useful Links</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" href="#">FAQs</a>
                  </li>
                  <li>
                    <a className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75" href="#">Support & Help</a>
                  </li>
                  <li>
                    <a className="group flex justify-center gap-1.5 sm:justify-start" href="#">
                      <span className="text-gray-700 transition group-hover:text-gray-700/75 dark:text-white dark:hover:text-white/75">Live Chat</span>
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-teal-500"></span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Contact Us</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a className="flex items-center justify-center gap-1.5 sm:justify-start" href="mailto:support@festbook.com">
                      <span className="flex-1 text-gray-700 dark:text-gray-300"> support@festbook.com </span>
                    </a>
                  </li>
                  <li>
                    <a className="flex items-center justify-center gap-1.5 sm:justify-start" href="tel:+1234567890">
                      <span className="flex-1 text-gray-700 dark:text-gray-300"> +918925425514</span>
                    </a>
                  </li>
                  <li className="flex items-start justify-center gap-1.5 sm:justify-start">
                    <address className="-mt-0.5 flex-1 text-gray-700 not-italic dark:text-gray-300"> 500 Event St, Los Angeles, USA </address>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-100 pt-6 dark:border-gray-800">
            <div className="text-center sm:flex sm:justify-between sm:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="block sm:inline">© {new Date().getFullYear()} FestBook. All rights reserved.</span>

                <a
                  className="inline-block text-teal-600 underline transition hover:text-teal-600/75 dark:text-teal-500 dark:hover:text-teal-500/75"
                  href="#"
                >
                  Terms of Service
                </a>

                <span>&middot;</span>

                <a
                  className="inline-block text-teal-600 underline transition hover:text-teal-600/75 dark:text-teal-500 dark:hover:text-teal-500/75"
                  href="#"
                >
                  Privacy Policy
                </a>
              </p>

              <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0 dark:text-gray-400">
                Crafted with ❤️ for Fest Enthusiasts
              </p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
