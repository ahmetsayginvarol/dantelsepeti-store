import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: "#fdf2f5",
          100: "#fce4eb",
          200: "#f9c9d6",
          300: "#f4a0b8",
          400: "#ec6f93",
          500: "#e04a77",
          600: "#cc2d5e",
          700: "#aa1f4d",
          800: "#8e1c44",
          900: "#771b3d",
        },
        blush: {
          50: "#fdf5f7",
          100: "#fceaef",
          200: "#f8d5df",
          300: "#f2b4c6",
          400: "#e88aa6",
          500: "#d4688a",
          600: "#c0496e",
          700: "#a33459",
          800: "#882e4d",
          900: "#722943",
        },
        rosegold: {
          50: "#fdf6f3",
          100: "#f9e8e2",
          200: "#f4d0c5",
          300: "#ecad9a",
          400: "#e08570",
          500: "#d4694f",
          600: "#c45040",
          700: "#a33e35",
          800: "#873531",
          900: "#70302e",
        },
        cream: {
          50: "#fdfaf8",
          100: "#f8f0ec",
          200: "#f2e4dc",
          300: "#e8d0c5",
          400: "#dbb8a8",
          500: "#cda090",
        },
        darkrose: {
          900: "#0f0809",
          800: "#180d10",
          700: "#221218",
          600: "#2e1820",
          500: "#3d2029",
          400: "#4f2a35",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-jost)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "shimmer": "shimmer 2s infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "rose-gradient": "linear-gradient(135deg, #d4688a 0%, #e88aa6 50%, #c0496e 100%)",
        "dark-gradient": "linear-gradient(180deg, #0f0809 0%, #221218 100%)",
        "luxury-gradient": "linear-gradient(135deg, #0f0809 0%, #221218 40%, #2e1820 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
