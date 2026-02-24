import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      {
        nexchat: {
          primary: "#a855f7",
          secondary: "#ec4899",
          accent: "#d946ef",
          neutral: "#1e1b4b",
          "base-100": "#0f0c29",
          "base-200": "#1a1a40",
          "base-300": "#2a2a72",
          info: "#38bdf8",
          success: "#22c55e",
          warning: "#facc15",
          error: "#ef4444",
        },
      },
    ],
  },
};