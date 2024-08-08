import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'firebase/app': path.resolve(__dirname, 'node_modules/firebase/app'),
      'firebase/auth': path.resolve(__dirname, 'node_modules/firebase/auth'),
      'firebase/firestore': path.resolve(__dirname, 'node_modules/firebase/firestore'),
    },
  },
});
