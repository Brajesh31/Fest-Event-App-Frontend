import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import img from "../../../../../public/signin.jpg"; // Use a festival-themed image here
import Link from "next/link";

export default function Page() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 via-pink-600 to-yellow-500">
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <Image
          src={img}
          alt="Festive background"
          className="w-full h-full object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-6 py-12">
        {/* Left Side - Text */}
        <div className="text-white max-w-xl text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Welcome to <span className="text-yellow-400">Fest Book Connect</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200">
            Discover and connect through festivals! Join a vibrant community of event lovers. Sign up to explore events, make friends, and celebrate life!
          </p>
          <Link
            href="/customer/sign-in"
            className="inline-block bg-yellow-400 text-black px-6 py-3 font-semibold rounded-md shadow-lg hover:bg-yellow-200 transition-all"
          >
            Login to Fest Book
          </Link>
        </div>

        {/* Right Side - SignUp form */}
        <div className="mt-10 lg:mt-0 lg:ml-10 bg-gray-400 rounded-xl shadow-xl p-0 sm:p-8 w-full max-w-md">
          <SignUp routing="hash" appearance={{ elements: { formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white" } }} />
        </div>
      </div>
    </section>
  );
}
