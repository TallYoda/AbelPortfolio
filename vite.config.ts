import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Expose EMAILJS_* (and VITE_*) so Vercel env vars without the Vite prefix work.
  envPrefix: ['VITE_', 'EMAILJS_'],
})

