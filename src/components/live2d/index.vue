<template>
  <div ref="containerRef" :style="containerStyle">
    <canvas ref="canvasRef" @click="handleClick"></canvas>
  </div>
</template>

<script setup lang="ts">
import { computed, CSSProperties, onMounted, ref, toRefs, unref } from "vue";

import { useData } from "vitepress";

import { toggleTheme } from "./skills/theme";

import type { Live2DModelView } from "./assets/sdk/live2d-lip-sync.es";
const props = withDefaults(
  defineProps<{
    width: number;
    height: number;
  }>(),
  {
    width: 300,
    height: 500,
  }
);

const { isDark, frontmatter } = useData();
const hiddenLive2d = computed(() => !!frontmatter.value.hiddenLive2d);
const canvasRef = ref<HTMLCanvasElement>();
const containerRef = ref<HTMLElement>();
const live2dViewRef = ref<Live2DModelView>();
const { width, height } = toRefs(props);
const devicePixelRatio = window.devicePixelRatio ?? 1;
const containerStyle = computed<CSSProperties>(() => ({
  width: unref(width) + "px",
  height: unref(height) + "px",
  position: "fixed",
  zIndex: 999,
  right: 0,
  bottom: 0,
  display: hiddenLive2d.value ? "none" : "block",
}));

onMounted(async () => {
  const { Live2DModelLipSync } = await import(
    "./assets/sdk/live2d-lip-sync.es"
  );
  const { ColorReplaceFilter } = await import("pixi-filters");
  const canvas = canvasRef.value;
  const container = containerRef.value;
  if (!canvas || !container) return;
  const url = "/model/mao_pro/mao_pro.model3.json";
  live2dViewRef.value = await Live2DModelLipSync.render(canvas, {
    modelURL: url,
    backgroundAlpha: 0,
    resolution: devicePixelRatio,
    autoDensity: true,
  });
  const { model, app } = live2dViewRef.value;
  model.visible = true;

  // 获取模型横纵比;
  const modelRatio = model.width / model.height;

  // 模型居中
  const centerModel = () => {
    // 让模型height为画布一半
    model.height = app.view.height / devicePixelRatio;
    model.width = model.height * modelRatio;
    model.x = 0;
    model.y = 0;
  };
  centerModel();

  const replaceFilter = new ColorReplaceFilter(0x000000, 0xc231f9, 0);
  // model.filters = [replaceFilter]
  model.filters = [replaceFilter];
});

async function handleClick(e: MouseEvent) {
  if (!live2dViewRef.value) return;
  toggleTheme(live2dViewRef.value, isDark);
}
</script>

<style scoped></style>
