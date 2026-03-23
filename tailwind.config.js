/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./dashboard-v2.html",
    "./dashboard.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          bg: "var(--vault-bg)",
          text: "var(--vault-text)",
          border: "var(--vault-border)",
          muted: "var(--vault-muted)",
          accent: "var(--vault-accent)",
          accentHover: "var(--vault-accent-hover)",
          cardBg: "var(--vault-card-bg)"
        }
      },
      fontFamily: {
        sans: ["var(--vault-font)", "Segoe UI", "sans-serif"],
      }
    },
  },
  plugins: [],
}
