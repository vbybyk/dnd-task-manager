import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    root: "./src/",
    plugins: [react(), tsconfigPaths(), nodePolyfills()],
    build: {
      outDir: "../dist",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      setupFilesAfterEnv: ["./src/setupTests.ts"],
      css: true,
    },
    server: {
      port: process.env.PORT || 3005,
      open: false,
    },
  };
});
