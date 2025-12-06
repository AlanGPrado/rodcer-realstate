import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    green: '#2d5016',
                    'green-light': '#3d6b1f',
                    'green-dark': '#1d3a0f',
                },
                secondary: {
                    green: '#4a7c2c',
                    'green-light': '#5a9438',
                    'green-dark': '#3a6322',
                },
                accent: {
                    green: '#6fb33f',
                    light: '#8bc653',
                    gold: '#d4af37',
                },
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;
