module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Ensure paths are correct
    theme: {
        extend: {
            // Add custom configurations here
        },
    },
    plugins: [require('daisyui')], // Ensure plugins are correctly listed
}
