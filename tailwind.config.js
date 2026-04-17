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
          surface: "var(--vault-surface)",
          surfaceElevated: "var(--vault-surface-elevated)",
          text: "var(--vault-text)",
          textSecondary: "var(--vault-text-secondary)",
          border: "var(--vault-border)",
          muted: "var(--vault-muted)",
          accent: "var(--vault-accent)",
          accentHover: "var(--vault-accent-hover)",
          focusRing: "var(--vault-focus-ring)",
          cardBg: "var(--vault-card-bg)",
          success: "var(--vault-success)",
          warning: "var(--vault-warning)",
          danger: "var(--vault-danger)",
        }
      },
      fontFamily: {
        sans: ['"Segoe UI Semilight"', '"Segoe UI"', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        /* 8px grid per STYLE.md */
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
