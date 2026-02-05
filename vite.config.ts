import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const tsrConfig = JSON.parse(readFileSync(resolve(process.cwd(), "tsr.config.json"), "utf-8")) as {
  routesDirectory: string;
  generatedRouteTree: string;
};
const routesDir = tsrConfig.routesDirectory.replace(/^\.\/src\/?/, "") || "routes";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    contentCollections(),
    tailwindcss(),
    tsconfigPaths(),
    tanstackStart({
      srcDirectory: "src",
      router: {
        routesDirectory: routesDir,
      },
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        concurrency: 14,
        retryCount: 2,
        retryDelay: 1000,
        maxRedirects: 5,
        failOnError: true,
      },
      pages: [{ path: "/" }, { path: "/docs" }],
    }),
    react(),
  ],
});
