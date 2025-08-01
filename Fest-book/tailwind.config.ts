import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // 🌐 Custom Breakpoints
      screens: {
        xs: "480px",
        "3xl": "1600px",
      },

      // 🎨 Custom Colors
      colors: {
        primary: "#1E40AF",   // Tailwind blue-900
        secondary: "#FBBF24", // Tailwind amber-400
        accent: "#10B981",    // Tailwind emerald-500
        dark: "#111827",      // Tailwind gray-900
      },

      // 🖋️ Custom Fonts
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
      },

      // 🎚️ Custom Spacing / Sizes (optional)
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },

      // 💡 Example Custom Animation
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
