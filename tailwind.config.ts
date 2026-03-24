import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#FDFCFB",
          100: "#FAF8F5",
          200: "#F0ECE5",
          300: "#E3DDD3",
          400: "#C9C2B6",
          500: "#A49C8E",
          600: "#7D766A",
          700: "#5C564D",
          800: "#3D3935",
          900: "#1F1D1A",
        },
        copper: {
          DEFAULT: "#B5694F",
          hover: "#A05A42",
          light: "#F7EDE8",
        },
        ink: {
          DEFAULT: "#1F1D1A",
          2: "#3D3935",
          3: "#5C564D",
          4: "#7D766A",
          5: "#A49C8E",
        },
        semantic: {
          "red-text": "#8B3A3A",
          "red-bg": "#F9EEEE",
          "amber-text": "#7A5B1F",
          "amber-bg": "#FCF5E5",
          "green-text": "#3A6B4A",
          "green-bg": "#EEF6F0",
        },
      },
      fontFamily: {
        pretendard: [
          "Pretendard Variable",
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(31,29,26,0.04)",
        md: "0 4px 16px rgba(31,29,26,0.06)",
        lg: "0 8px 32px rgba(31,29,26,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
