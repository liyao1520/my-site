<template>
  <div class="p-[20px]">
    <template v-if="pandoc">
      <div class="text-[20px] my-[20px] text-center font-bold">输入文件</div>
      <UploadDragger
        v-model:file-list="fileList"
        ref="uploadRef"
        name="file"
        :multiple="false"
        :max-count="1"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">点击或拖拽文件至此区域即可上传</p>
        <p class="ant-upload-hint">支持单次或批量上传。</p>
      </UploadDragger>
      <div class="text-[20px] my-[20px] text-center font-bold">输出</div>
      <Form class="flex justify-center" layout="inline">
        <Form.Item label="输出格式">
          <Select
            v-model:value="formData.outputType"
            class="!w-[200px]"
            placeholder="选择输出格式"
            showSearch
            :options="outputOptions"
          />
        </Form.Item>
        <Form.Item label="[选项]">
          <Input
            class="!w-[200px]"
            v-model:value="formData.option"
            placeholder=""
          />
        </Form.Item>
      </Form>

      <div class="text-[20px] my-[20px] text-center font-bold">命令</div>
      <div class="my-[10px] flex justify-center">
        <Tag>{{ fullCmd }}</Tag>
      </div>
      <div class="text-[20px] my-[20px] text-center font-bold">结果</div>
      <div class="flex justify-center w-full">
        <Button type="primary" @click="handleClick" :disabled="!fileList.length"
          >下载</Button
        >
      </div>
    </template>
    <template v-else>
      <div>wasm初始化中...</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { InboxOutlined } from "@ant-design/icons-vue";
import {
  UploadDragger,
  Select,
  Form,
  Input,
  Tag,
  UploadProps,
  UploadFile,
  Button,
} from "ant-design-vue";
const uploadRef = ref();
import {
  inputExtToType,
  inputFormats,
  outputFormats,
  outputOptions,
} from "./options";
import { computed, onMounted, reactive, ref, shallowRef, unref } from "vue";
import { install } from "@/utils/pandoc";
import { downloadFile, fileToUint8Array } from "@/utils/donwload";
type PandocFn = (
  args_str: string,
  in_buffer: Uint8Array<ArrayBufferLike>
) => Uint8Array<ArrayBufferLike>;
const pandoc = shallowRef<null | PandocFn>(null);
const formData = reactive({
  outputType: "markdown",
  option: "",
});
const fileList = ref<UploadFile[]>([]);
onMounted(async () => {
  const res = await install();
  pandoc.value = res.pandoc;
});
const fullCmd = computed(() => {
  const { option, outputType } = formData;
  return `pandoc${
    option ? " " + option : ""
  } -t ${outputType} input_file -o output_file`;
});
const handleClick = async () => {
  if (!fileList.value[0]) return;
  const file = fileList.value[0];
  // 获取文件名（包含后缀）
  const fileName = file.name;
  // 获取文件扩展名（后缀）
  const inputFileExt = fileName.split(".").pop();
  const inputFileType = inputExtToType(`.${inputFileExt}`);
  if (!inputFileType) {
    return alert("不支持的文件类型");
  }
  const { option, outputType } = formData;
  const exec = unref(pandoc);
  if (exec) {
    const uint8Array = await fileToUint8Array(file.originFileObj!);
    const buffer = exec(
      `${option} -f ${inputFileType}  -t ${outputType}`,
      uint8Array
    );
    const format = outputFormats[
      outputType as keyof typeof outputFormats
    ] as any;
    downloadFile(buffer, `${fileName}${format?.ext ?? ""}`);
  }
};
</script>

<style scoped></style>
