// PostCSS is needed to process Tailwind CSS
const tailwindcss = require("tailwindcss");
module.exports = {
    plugins: [tailwindcss("./tailwind.config.js"), require("autoprefixer")],
};
