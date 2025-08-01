import { SignIn } from "@clerk/nextjs";
import Image from 'next/image';
import img from "../../../../../public/signin.jpg";
import Link from "next/link";

export default function Page() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 via-pink-600 to-yellow-500">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={img}
          alt="Festive Vibes"
          className="w-full h-full object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-6 py-12">
        {/* Left: Text Content */}
        <div className="text-white max-w-xl text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Reconnect with the <span className="text-yellow-400">Festival Spirit</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200">
            Sign in to access your personalized festival dashboard. Keep track of your favorite events, friends, and ticket info all in one place.
          </p>
          <Link
            href="/"
            className="inline-block bg-yellow-400 text-black px-6 py-3 font-semibold rounded-md shadow-lg hover:bg-yellow-200 transition-all"
          >
            Explore Fest Book
          </Link>
        </div>

        {/* Right: Sign In Card */}
        <div className="mt-10 lg:mt-0 lg:ml-10 bg-white rounded-xl shadow-xl p-0 sm:p-8 w-full max-w-md">
          <SignIn routing="hash" appearance={{ elements: { formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white" } }} />
        </div>
      </div>
    </section>
  );
}
