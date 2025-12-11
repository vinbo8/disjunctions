import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['Hoefler Text', 'Material', ...defaultTheme.fontFamily.serif],
				sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				'p-red': 
				{
					'light': '#D98E73',
					DEFAULT: '#d9583b',
					'dark': '#D94423'
				},
				'p-cream': '#FFFCEB',
				'p-blue': '#3B3F59',
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
