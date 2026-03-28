import { defineConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
    build: {
        emptyOutDir: false, // Don't clear the dist folder from the main build
        outDir: 'dist',
        rollupOptions: {
            input: {
                content: resolve(__dirname, 'src/scripts/content.ts'),
            },
            output: {
                entryFileNames: '[name].js',
                format: 'iife',
            },
        },
        sourcemap: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});
