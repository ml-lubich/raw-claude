import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-dim": "var(--accent-dim)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "marquee": "marquee 20s linear infinite",
        "beam": "beam 2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        beam: {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(0.8)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
        glow: {
          from: { boxShadow: "0 0 10px var(--accent), 0 0 20px var(--accent-dim)" },
          to: { boxShadow: "0 0 20px var(--accent), 0 0 40px var(--accent-dim)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
