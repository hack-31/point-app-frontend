import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  resolve: {
    alias: [{ find: "@", replacement: `${process.cwd()}/src` }],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "360度評価アプリ",
        short_name: "Point App",
        description: "ポイント送付ができるアプリです。",
        icons: [
          {
            src: "/icon-192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/icon-310.png",
            sizes: "310x310",
            type: "image/png",
          },
          {
            src: "/icon-310.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        lang: "ja",
      },
    }),
  ],
});
