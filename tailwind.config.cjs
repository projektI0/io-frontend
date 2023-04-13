/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#423bc8",
                secondary: "#9ea4d7",
                secondary_dark: "#3730a3",
                bright: "#f1f1f2",
            },
            fontFamily: {
                body: ["Poppins"],
            },
        },
    },
    plugins: [],
};
