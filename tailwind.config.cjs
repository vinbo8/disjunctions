import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['Hoefler Text', 'Material', ...defaultTheme.fontFamily.serif],
				sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
			},
			aspectRatio: {
				'box': '3 / 2'
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
