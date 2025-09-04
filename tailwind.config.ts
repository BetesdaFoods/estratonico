import type { Config } from "tailwindcss";
import tailwindScrollbar from "tailwind-scrollbar";
import { PluginAPI } from "tailwindcss/types/config";

export default {
	darkMode: ["class", "dark"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				estratonicosnavbar: "url('/estratonicosnavbar.png')",
				hero: "url('https://www.viberse.co/assets/estratonicos-home.png)",
				background:
					"url('https://www.viberse.co/assets/estratonicos-fondo-1.png')",
				contact: "url(/assets/estratonicos-news.png)",
			},
			colors: {
				grayBackground: "#0a0a0a",

				foreground: "var(--foreground)",
			},
			fontFamily: {
				orbitron: ["var(--font-orbitron)"],
				roboto: ["var(--font-roboto)"],
			},
		},
	},
	plugins: [
		function ({ addUtilities }: PluginAPI) {
			const newUtilities = {
				".text-shadow-sm": {
					"text-shadow": "0 1px 1px rgba(0, 0, 0, 0.7)",
				},
				".text-shadow-md": {
					"text-shadow": "0 2px 2px rgba(0, 0, 0, 0.8)",
				},
				".text-shadow-lg": {
					"text-shadow": "0 4px 4px rgba(0, 0, 0, 0.9)",
				},
				".text-shadow-glow": {
					"text-shadow":
						"0 0 5px rgba(59, 243, 255, 0.7), 0 0 10px rgba(59, 243, 255, 0.5), 0 0 15px rgba(0, 0, 0, 0.9)",
				},
			};
			addUtilities(newUtilities);
		},
		tailwindScrollbar,
	],
} satisfies Config;
