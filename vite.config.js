import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
// Single-file build: dist/index.html opens directly from disk (double-click)
export default defineConfig({ plugins: [react(), tailwindcss(), viteSingleFile()] })
