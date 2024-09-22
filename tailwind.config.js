/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "var(--dark)",
        darkt: "var(--darkt)",
        light: "var(--light)",
        yellow: "var(--yellow)",
        error: "var(--error)",
        science: "var(--science)",
        health: "var(--health)",
        communication: "var(--communication)",
        education: "var(--education)",
        political: "var(--political)",
        lettres: "var(--lettres)",
        business: "var(--business)",
      },
    },
  },
  plugins: [],
};
