/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "Satoshi", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#e5f1ff",
        muted: "#91a4b8",
        night: "#04070d",
        panel: "rgba(255, 255, 255, 0.07)",
        line: "rgba(255, 255, 255, 0.12)",
      },
      boxShadow: {
        glow: "0 24px 90px rgba(34, 211, 238, 0.18)",
        premium: "0 30px 100px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};
