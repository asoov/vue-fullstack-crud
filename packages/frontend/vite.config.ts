import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [vue()],
    test: {
      deps: {
        inline: ["vuetify"]
      },
      environment: "jsdom",
      // setupFiles: path.resolve(__dirname, "./src/test/setup.ts"),
      globals: true
    },
    server: {
      host: "localhost",
      port: 3000,
      proxy: {
        "/api": "http://localhost:8080"
      }
    },
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }]
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
