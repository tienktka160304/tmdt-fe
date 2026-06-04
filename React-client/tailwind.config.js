/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
     primary: "#06b6d4",      // Xanh dương đậm (Thay cho #0a402b)
        secondary: "#3b82f6",    // Xanh dương sáng (Thay cho #1DAC6B)
        greenwhite: "#f8fafc",   // Trắng xám nhạt
        tertiary: "#facc15",    // Vàng hổ phách
        redTe: "#ef4444",       // Đỏ tươi
        yellcolor: "#fffbeb",    // Kem nhạt
        loading: "#f1f5f9",     // Màu xám loading
        textgreen: "#06b6d4",   // Xanh lơ (Cyan)
        TextPrimary: "#a5f3fc", // Xanh nhạt sáng
        price: "#2563eb",
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        swing: "swing 0.8s infinite both",
        jump: "jump 0.6s forwards",
      },
      keyframes: {
        swing: {
          "20%": { transform: "rotate(15deg)" },
          "40%": { transform: "rotate(-10deg)" },
          "60%": { transform: "rotate(5deg)" },
          "80%": { transform: "rotate(-5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        jump: {
          // "0%, 100%": { bottom: "0" },
          // "50%": { bottom: "50px" },
          from: { right: "-100px" },
          to: { right: "2" },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },

  plugins: [],
};
