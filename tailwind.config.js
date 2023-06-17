/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        800: "48rem",
        600: "37rem",
      },
      colors: {
        "discord": "#2E3035",
        "discord-code": "#2B2D31",
        "recursion": "#1976d2"
      },
      animation: {
        "text-pop-up-tl":
          "text-pop-up-tl 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275)    forwards",
      },
      keyframes: {
        "text-pop-up-tl": {
          "0%": {
            transform: "translateY(0) translateX(0)",
            "transform-origin": "50% 50%",
            "text-shadow": "none",
          },
          to: {
            transform: "translateY(-50px) translateX(-50px)",
            "transform-origin": "50% 50%",
            "text-shadow":
              "0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc, 0 5px 0 #ccc, 0 6px 0 #ccc, 0 7px 0 #ccc, 0 8px 0 #ccc, 0 9px 0 #ccc, 0 50px 30px rgba(0, 0, 0, .3)",
          },
        },
      },
    },
    plugins: [],
  },
};
