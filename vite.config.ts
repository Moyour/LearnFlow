import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async ({ command, mode }) => {
  // Array to hold plugins
  const plugins = [react()];

  // Only try to load Replit plugins if running in Replit
  if (mode !== "production" && process.env.REPL_ID !== undefined) {
    // Import dynamically inside the function scope
    try {
      const { default: runtimeErrorOverlay } = await import(
        "@replit/vite-plugin-runtime-error-modal"
      );
      const { cartographer } = await import("@replit/vite-plugin-cartographer");

      plugins.push(runtimeErrorOverlay(), cartographer());
    } catch (err) {
      console.warn("Replit plugins not found, skipping them");
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve("client/src"),
        "@shared": path.resolve("shared"),
        "@assets": path.resolve("attached_assets"),
      },
    },
    root: path.resolve("client"),
    build: {
      outDir: path.resolve("dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
