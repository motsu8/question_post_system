/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        tall: { raw: "(max-height: 650px)" },
      },
      width: {
        800: "48rem",
        600: "37rem",
      },
      height: {
        "1/10": "10%",
        "9/10": "90%",
      },
      colors: {
        discord: "#2E3035",
        "discord-code": "#2B2D31",
        recursion: "#1976d2",
        mention: "#5865F2",
      },
      animation: {
        "jello-horizontal": "jello-horizontal 0.8s ease   both",
      },
      keyframes: {
        "jello-horizontal": {
          "0%,to": {
            transform: "scale3d(1, 1, 1)",
          },
          "30%": {
            transform: "scale3d(1.25, .75, 1)",
          },
          "40%": {
            transform: "scale3d(.75, 1.25, 1)",
          },
          "50%": {
            transform: "scale3d(1.15, .85, 1)",
          },
          "65%": {
            transform: "scale3d(.95, 1.05, 1)",
          },
          "75%": {
            transform: "scale3d(1.05, .95, 1)",
          },
        },
      },
    },
    plugins: [],
  },
};
