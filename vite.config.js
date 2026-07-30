import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is set for GitHub Pages project-site hosting (https://<user>.github.io/keydrugsincardiology/).
// Change to '/' if hosting at a domain root.
export default defineConfig({
  plugins: [react()],
  base: './',
})
