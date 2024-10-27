<template>
  <div ref="containerRef" :style="containerStyle">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { computed, CSSProperties, h, onMounted, ref, toRefs, unref } from "vue";
import { Live2DModelLipSync } from "./assets/sdk/live2d-lip-sync.es";
import { useResizeObserver } from "@vueuse/core";
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
const canvasRef = ref<HTMLCanvasElement>();
const containerRef = ref<HTMLElement>();

const { width, height } = toRefs(props);
useResizeObserver(containerRef, () => {});
const devicePixelRatio = window.devicePixelRatio ?? 1;
const containerStyle = computed<CSSProperties>(() => ({
  width: unref(width) + "px",
  height: unref(height) + "px",
  position: "fixed",
  zIndex: 999,
  right: 0,
  bottom: 0,
}));

onMounted(async () => {
  const canvas = canvasRef.value;
  const container = containerRef.value;
  if (!canvas || !container) return;
  const url = new URL(
    "./assets/model/mao_pro/mao_pro.model3.json",
    import.meta.url
  ).pathname;
  const { model, app } = await Live2DModelLipSync.render(canvas, {
    modelURL: url,
    backgroundAlpha: 0,
    resolution: devicePixelRatio,
    autoDensity: true,
  });
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
});
</script>

<style scoped></style>
