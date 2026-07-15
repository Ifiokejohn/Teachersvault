import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          green: "#0F3D2E", // primary — deep ledger green
          "green-dark": "#0A2A20",
          gold: "#C89B3C", // brass accent — seals, CTAs
          "gold-light": "#E3C77A",
          paper: "#F7F5EF", // background — aged paper
          ink: "#1C1C1A", // primary text
          sage: "#DCE5DC", // card fills
          seal: "#8B2E2E", // sparing — alerts, admin
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(circle at 1px 1px, rgba(28,28,26,0.04) 1px, transparent 0)",
      },
      backgroundSize: {
        grain: "18px 18px",
      },
    },
  },
  plugins: [],
};

export default config;
