// tailwind.config.js
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./app/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#000000", // Negro para light mode
          secondary: "#F7DC6F", // Amarillo para light mode
          tertiary: "#FFFFFF", // Blanco para light mode
          gray: "#F2F2F2", // Gris claro para light mode
          primaryDark: "#333333", // Negro oscuro para dark mode
          secondaryDark: "#FFD700", // Amarillo oscuro para dark mode
          tertiaryDark: "#1A1A1A", // Blanco oscuro para dark mode
          grayDark: "#444444", // Gris oscuro para dark mode
        },
      },
    },
    darkMode: "class", // Enable dark mode via class
    plugins: [],
  };