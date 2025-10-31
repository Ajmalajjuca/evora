import { type Config } from "tailwindcss";
import nativewind from "nativewind/preset";

const config: Config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [nativewind],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#F5EFE6",
          100: "#E8DCC8",
          200: "#D4C4B0",
        },
        brown: {
          50: "#8B6F47",
          100: "#6B563A",
          500: "#C17B3C",
          900: "#2C1810",
        },
        vintage: {
          orange: "#C17B3C",
          tan: "#A0522D",
        },
      },
      fontFamily: {
        serif: ["serif"],
      },
    },
  },
  plugins: [],
};

export default config;
