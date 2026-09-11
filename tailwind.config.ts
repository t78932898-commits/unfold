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
      colors: {
        background: "#09090b",
        foreground: "#fafafa",
        card: "#121215",
        "card-hover": "#18181b",
        muted: "#27272a",
        "muted-foreground": "#a1a1aa",
        border: "#27272a",
        accent: {
          DEFAULT: "#e4e4e7",
          volt: "#d4ff00",
          flame: "#ff461e",
          cyan: "#00f0ff",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: ".2em",
        tightest: "-.04em",
      },
    },
  },
  plugins: [],
};
export default config;
