import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async ({ command, mode }) => {
  // Only import Replit plugins in dev on Replit
  let replitPlugins: any[] = [];

  if (mode !== "production" && process.env.REPL_ID !== undefined) {
    const runtimeErrorOverlay = await import("@replit/vite-plugin-runtime-error-modal").then(
      (m) => m.default
    );
    const cartographer = await import("@replit/vite-plugin-cartographer").then(
      (m) => m.cartographer
    );

    replitPlugins = [runtimeErrorOverlay(), cartographer()];
  }

  return {
    plugins: [react(), ...replitPlugins],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.url, "../client/src"),
        "@shared": path.resolve(import.meta.url, "../shared"),
        "@assets": path.resolve(import.meta.url, "../attached_assets"),
      },
    },
    root: path.resolve(import.meta.url, "../client"),
    build: {
      outDir: path.resolve(import.meta.url, "../dist/public"),
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
