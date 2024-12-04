/**
 * 下载文件的工具函数
 * @param data - 文件的二进制数据，可以是 Uint8Array 或 ArrayBuffer
 * @param fileName - 下载的文件名
 * @param mimeType - 文件的 MIME 类型，默认为 "application/octet-stream"
 */
export function downloadFile(
  data: Uint8Array | ArrayBuffer,
  fileName: string,
  mimeType: string = "application/octet-stream"
): void {
  // 将数据转换为 Blob 对象
  const blob = new Blob([data], { type: mimeType });

  // 创建临时 URL
  const url = URL.createObjectURL(blob);

  // 创建隐藏的 <a> 元素用于下载
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;

  // 添加到 DOM 中并触发点击
  document.body.appendChild(anchor);
  anchor.click();

  // 移除 <a> 元素并释放 URL
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function fileToUint8Array(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // 当文件读取完成时调用
    reader.onload = (event) => {
      // event.target.result 是 ArrayBuffer 类型
      const arrayBuffer = event.target?.result as ArrayBuffer;
      resolve(new Uint8Array(arrayBuffer)); // 将 ArrayBuffer 转换为 Uint8Array
    };

    // 读取文件失败时调用
    reader.onerror = (error) => {
      reject(new Error("Error reading file: " + error));
    };

    // 读取文件内容为 ArrayBuffer
    reader.readAsArrayBuffer(file);
  });
}
