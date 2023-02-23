import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ["dictionary.png"],
      manifest: {
        name: "Dictionary_web_api",
        short_name: "Dictionary",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "dictionary.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "dictionary.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
