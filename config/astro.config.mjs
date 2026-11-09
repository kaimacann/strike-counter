import { terraErrorBoundaryIntegration as __terraErrorBoundaryIntegration } from '@terra-symposium/standards-error-boundaries/astro-integration';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

const src = fileURLToPath(new URL('../src/', import.meta.url));

export default defineConfig({
	cacheDir: fileURLToPath(new URL('../.astro/', import.meta.url)),
	server: { port: 4030, strictPort: true },
	output: 'static',
	integrations: [__terraErrorBoundaryIntegration(), react()],
	vite: {
		css: { postcss: fileURLToPath(new URL('./', import.meta.url)) },
		ssr: { noExternal: ['@astrojs/react'] },
		environments: {
			ssr: { resolve: { noExternal: ['@astrojs/react'] } },
			prerender: { resolve: { noExternal: ['@astrojs/react'] } },
		},
		resolve: {
			alias: {
				'@utils': `${src}lib/utils.ts`,
				'@components': `${src}components`,
				'@ui': `${src}components/ui`,
				'@lib': `${src}lib`,
			},
		},
	},
});
