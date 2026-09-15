import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/skin-care-app/', // for GitHub Pages: https://<username>.github.io/skin-care-app/
})
