/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/js/**/*.js"],
  theme: {
    fontSize: {
      sm: "16px",
      base: "18px",
      xl: "20px",
      "2xl": "22px",
      "3xl": "40px",
      "4xl": "30px",
    },
    screens: {
			xl: { max: "1279px" },
			lg: { max: "1023px" },
			md: { max: "767px" },
			sm: { max: "639px" },
		},
    fontFamily: {
      primary: ["Roboto", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
