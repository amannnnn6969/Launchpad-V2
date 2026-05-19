import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        surface: "#030812",
        "surface-dim": "#030812",
        "surface-bright": "#39393a",
        "surface-container-lowest": "#0e0e0f",
        "surface-container-low": "#1b1b1c",
        "surface-container": "#201f20",
        "surface-container-high": "#2a2a2b",
        "surface-container-highest": "#353535",
        "on-surface": "#e5e2e2",
        "on-surface-variant": "#c5c6cc",
        "inverse-surface": "#e5e2e2",
        "inverse-on-surface": "#303031",
        outline: "#8f9096",
        "outline-variant": "#45474b",
        "surface-tint": "#c0c7d5",
        primary: "#c0c7d5",
        "on-primary": "#2a313c",
        "primary-container": "#030812",
        "on-primary-container": "#727986",
        "inverse-primary": "#585f6b",
        secondary: "#b7c4ff",
        "on-secondary": "#1b2c67",
        "secondary-container": "#354582",
        "on-secondary-container": "#a6b5fa",
        tertiary: "#e9bda7",
        "on-tertiary": "#452a1b",
        "tertiary-container": "#140400",
        "on-tertiary-container": "#95715d",
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        background: "#030812",
        "on-background": "#e5e2e2",
        "surface-variant": "#353535",
        seed: "#1567ff",
        copper: "#533626",
        cobalt: "#031855",
        space: {
          950: '#050814',
          900: '#0a0f24',
          800: '#121b38',
        }
      },
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "laser-flow": "flow 4s linear infinite",
      },
      keyframes: {
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        flow: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
