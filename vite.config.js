import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/connexa-gdn/middleware",
  resolve: {
    alias: {
      "@": "/src", // Establece un alias para acceder a la carpeta src fácilmente
    },
  },
  build: {
    outDir: "./dist/connexa-gdn/middleware", // Directorio de salida personalizado
  },
});
