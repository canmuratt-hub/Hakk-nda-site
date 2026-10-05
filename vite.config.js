import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  build: {
    // 🛡️ SİBER GÜVENLİK: Üretim derlemesinde kaynak kod haritalarını kapat (Tersine mühendisliği engeller)
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Çıktı dosya adlarını hash'leyerek önbellek zehirlenmesini ve tahmin edilebilirliği engelle
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  esbuild: {
    // Üretimde debugger ve zararlı çağrıları temizle
    drop: process.env.NODE_ENV === 'production' ? ['debugger'] : [],
  },
})
