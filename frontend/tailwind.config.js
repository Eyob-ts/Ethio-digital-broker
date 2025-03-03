/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      fontFamily: {
        oxygen: ['Oxygen', 'sans-serif'],
        robotoMono: ['Roboto Mono', 'monospace'],
        robotoSlab: ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [],
}