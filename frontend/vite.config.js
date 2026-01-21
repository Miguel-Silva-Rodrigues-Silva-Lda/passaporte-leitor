import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: parseInt(process.env.PORT || '5175'),
        host: true,
        allowedHosts: [
            'localhost',
            'passaporte-leitor-frontend-production.up.railway.app'
        ],
        proxy: {
            '/api': {
                target: process.env.VITE_API_URL,
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
    },
});
