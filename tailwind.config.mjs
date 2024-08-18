/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily:{
				"Montserrat": ["Montserrat", "sans-serif"],
				"Poppins": ["Poppins", "sans-serif"]
			}
		},
	},
	plugins: [],
}
