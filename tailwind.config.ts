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
        primary: '#4f46e5',
        'primary-dark': '#4338ca',
        secondary: '#10b981',
        dark: '#1e293b',
        light: '#f8fafc',
        gray: '#64748b',
        'light-gray': '#e2e8f0',
        danger: '#ef4444',
        warning: '#f59e0b',
        success: '#10b981',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
