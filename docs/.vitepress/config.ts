import { fileURLToPath } from "url";
import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LY",
  description: "文档、工具",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [],

    sidebar: [],

    socialLinks: [{ icon: "github", link: "https://github.com/liyao1520" }],
  },
  vite: {
    publicDir: fileURLToPath(new URL("../../public", import.meta.url)),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
      },
    },
    plugins: [
      UnoCSS({
        configFile: fileURLToPath(
          new URL("../../uno.config.ts", import.meta.url)
        ),
      }),
    ],
  },
});
