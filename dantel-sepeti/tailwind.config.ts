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
        gold: {
          50: "#fdf8f0",
          100: "#f8edda",
          200: "#f0d9b0",
          300: "#e4be7e",
          400: "#d4a254",
          500: "#c9a96e",
          600: "#b8883a",
          700: "#9a6e2e",
          800: "#7d5928",
          900: "#664922",
        },
        ivory: {
          50: "#fdfcf9",
          100: "#f8f4ed",
          200: "#f2ebe0",
          300: "#e8ddd0",
          400: "#dccebe",
          500: "#cebba8",
        },
        obsidian: {
          900: "#0a0a0a",
          800: "#111111",
          700: "#1a1a1a",
          600: "#222222",
          500: "#2d2d2d",
          400: "#3d3d3d",
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
        "gold-gradient": "linear-gradient(135deg, #c9a96e 0%, #e4be7e 50%, #b8883a 100%)",
        "dark-gradient": "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
        "luxury-gradient": "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #2d2d2d 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
