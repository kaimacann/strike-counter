import { terraErrorBoundaryIntegration as __terraErrorBoundaryIntegration } from '@terra-symposium/standards-error-boundaries/astro-integration';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

const src = fileURLToPath(new URL('.././src/', import.meta.url));

export default defineConfig({
	output: 'static',
	integrations: [__terraErrorBoundaryIntegration(), react()],
	vite: {
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
