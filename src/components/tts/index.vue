<template>
  <div>
    <Form @finish="handleFinish" :model="formState">
      <Form.Item label="文本" name="text" :rules="{ required: true }">
        <Textarea :rows="8" v-model:value="formState.text" />
      </Form.Item>
      <Form.Item label="音色" name="voice" :rules="{ required: true }">
        <Select v-model:value="formState.voice" :options="voiceOptions" />
      </Form.Item>
      <div class="flex justify-center my-[20px]">
        <audio ref="audioRef" controls :src="audioUrl" />
      </div>
      <div class="flex justify-center">
        <Button
          class="w-[200px]"
          type="primary"
          html-type="submit"
          :loading="loading"
          >生成</Button
        >
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Textarea, Form, Select, Button, message } from "ant-design-vue";

import { nextTick, onMounted, reactive, ref } from "vue";
const audioRef = ref<HTMLAudioElement>();
const voiceOptions = ref([]);
const audioUrl = ref("");
const loading = ref(false);
const formState = reactive({
  text: "",
  voice: "zh-CN-XiaoxiaoNeural",
});
onMounted(async () => {
  const res = await fetch("https://tts.li-yao.me/api/tts/voice").then((res) =>
    res.json()
  );
  voiceOptions.value = res.map((item: any) => {
    return {
      label: item.FriendlyName,
      value: item.ShortName,
    };
  });
});
const handleFinish = async (data: any) => {
  console.log(data);
  audioUrl.value = "";
  loading.value = true;
  const res = await fetch("https://tts.li-yao.me/api/tts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.blob())
    .catch((e) => {
      console.log(e);
      message.error("生成失败");
    })
    .finally(() => {
      loading.value = false;
    });
  if (res) {
    const url = URL.createObjectURL(res);
    audioUrl.value = url;
    nextTick(() => {
      audioRef.value?.play();
    });
  }
};
</script>

<style scoped></style>
