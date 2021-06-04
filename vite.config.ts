import { defineConfig } from "vite";
import { resolve } from "path";

// Import plugins
import Vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  plugins: [
    Vue(),
    WindiCSS({
      config: resolve("./windi.config.js"),
    }),
  ],
});