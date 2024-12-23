import { fileURLToPath } from "url";
import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import { withSidebar } from 'vitepress-sidebar';
// https://vitepress.dev/reference/site-config
export default defineConfig(withSidebar({
  title: "LY",
  description: "文档、工具",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Vue',
        link: '/vue',
      },
      {
        text: 'React',
        link: '/react'
      },
      {
        text: 'Node',
        link: '/node'
      },
      {
        text: 'Typescript',
        link: '/typescript'
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/liyao1520" }],
  },
  vite: {
    publicDir: fileURLToPath(new URL("../../public", import.meta.url)),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
      },
    },
    optimizeDeps: {
      include: ["dayjs"],
    },
    plugins: [
      UnoCSS({
        configFile: fileURLToPath(
          new URL("../../uno.config.ts", import.meta.url)
        ),
      }),
    ],
  },
}, [
  {
    documentRootPath: "docs",
    useTitleFromFileHeading: true,
    scanStartPath: 'vue',
    basePath: "/vue/",
    resolvePath: "/vue/"
  },
  {
    documentRootPath: "docs",
    useTitleFromFileHeading: true,
    scanStartPath: 'react',
    basePath: "/react/",
    resolvePath: "/react/"
  },
  {
    documentRootPath: "docs",
    useTitleFromFileHeading: true,
    scanStartPath: 'node',
    basePath: "/node/",
    resolvePath: "/node/",
  },
  {
    documentRootPath: "docs",
    useTitleFromFileHeading: true,
    scanStartPath: 'typescript',
    basePath: "/typescript/",
    resolvePath: "/typescript/"
  },
  {
    documentRootPath: "docs",
    useTitleFromFileHeading: true,
    scanStartPath: 'utils',
    basePath: "/utils/",
    resolvePath: "/utils/"
  }
]))
