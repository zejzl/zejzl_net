import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite alternate',
        'flicker': 'flicker 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-slow': {
          'from': { boxShadow: '0 0 30px rgba(0, 255, 0, 0.3)' },
          'to': { boxShadow: '0 0 50px rgba(0, 255, 0, 0.5)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' },
          '51%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
