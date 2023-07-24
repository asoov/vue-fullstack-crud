import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [vue()],
    server: {
      host: "localhost",
      port: 3000,
      proxy: {
        "/api": "http://localhost:8080"
      }
    },
    resolve: {
      alias: {
        "@": "/src",
        components: "/src/components"
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/style.scss";`
        }
      }
    }
  });
};
