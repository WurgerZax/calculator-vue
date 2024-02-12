/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  prefix: "tw-",
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: "#42b782",
          secondary: "#e04ecb",
          accent: "#1d8bf8",
          neutral: "#1a1e1a",
          "base-100": "#27293d",
          info: "#00c0dc",
          success: "#00f1c3",
          warning: "#ff8c73",
          error: "#fd5c90",
        },
      },
      "nord"
    ],
  },
};
