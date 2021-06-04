import { defineConfig } from "windicss/helpers";
import { resolve } from "path";

import colors from "windicss/colors";
import defaultTheme from "windicss/defaultTheme";

import LineChamp from "windicss/plugin/line-clamp";

export default defineConfig({
  darkMode: 'class',
  theme: {
    fontFamily: {
        sans: [
          "Roboto", ...defaultTheme.fontFamily.sans
        ]
    },
  },
  colors: {
    gray: colors.gray,
    cyan: colors.cyan,
    lb: colors.lightBlue,
    black: colors.black,
    blurple: "#7289da",
    light: "#ececec",
    dark: "#23272A",
  },
  extract: {
    include: ["index.html", resolve("./src/**/*.{vue,html,jsx,tsx}")],
    exclude: ["node_modules", ".git"],
  },
  plugins: [LineChamp],
})
