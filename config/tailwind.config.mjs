import preset from './tailwind.preset.ts';
import vidstack from 'vidstack/tailwind.cjs';
import { fileURLToPath } from 'node:url';

const src = fileURLToPath(new URL('../src/', import.meta.url));

export default {
	content: [`${src}**/*.{astro,html,js,jsx,ts,tsx}`],
	presets: [preset],
	plugins: [vidstack],
	theme: { extend: { fontFamily: { cursive: ['Indie Flower', 'Chalkboard SE', 'Comic Sans MS', 'sans-serif'] } } },
};
