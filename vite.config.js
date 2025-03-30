import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "@svgr/rollup";
import { visualizer } from 'rollup-plugin-visualizer';

const VITE_API_BASE_URL = "http://localhost:5000";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {},
    }),
    visualizer({
      open: true, // Automatically open the report in the browser
      filename: 'bundle-analysis.html', // Output file name
    }),
  ],
  define: {
    "import.meta.env.VITE_API_BASE_URL": JSON.stringify(VITE_API_BASE_URL),
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          // Optionally, manually split chunks for better optimization
          react: ['react', 'react-dom'],
          vendor: ['lodash', 'axios'],
        },
      },
    },
  },
});
