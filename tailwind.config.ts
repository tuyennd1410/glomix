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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Glomix brand palette
        "deep-navy": "#0D1B2E",
        "deep-blue": "#0A1628",
        "electric-blue": "#2563EB",
        "brand-blue": "#4A9EE8",
        "brand-purple": "#7B4FD4",
        "brand-indigo": "#6C3FC8",
        "brand-tagline": "#6B9FD4",
      },
    },
  },
  plugins: [],
};
export default config;
