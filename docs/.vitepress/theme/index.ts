// https://vitepress.dev/guide/custom-theme
import { defineComponent, h } from "vue";
import { useData, type Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import "uno.css";
import Live2d from "@/components/live2d/index.vue";
import ClientOnly from "@/components/client-only";
import { ConfigProvider } from "ant-design-vue";
import { theme } from "ant-design-vue";
const Wrapper = defineComponent(() => {
  const { isDark } = useData();
  return () =>
    h(
      ConfigProvider,
      {
        theme: {
          algorithm: isDark.value
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        },
      },
      () =>
        h(DefaultTheme.Layout, null, {
          // https://vitepress.dev/guide/extending-default-theme#layout-slots
          "layout-bottom": () => h(ClientOnly, {}, h(Live2d)),
        })
    );
});
export default {
  extends: DefaultTheme,
  Layout: () => h(Wrapper),
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme;
