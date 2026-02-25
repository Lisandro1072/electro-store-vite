/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'electric-blue': '#004aad',
                'tech-gray': '#1a1a1a',
                'voltage-yellow': '#ffde59',
            }
        },
    },
    plugins: [],
}