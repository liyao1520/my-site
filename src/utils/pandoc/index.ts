import {
  ConsoleStdout,
  File,
  OpenFile,
  PreopenDirectory,
  WASI,
} from "@bjorn3/browser_wasi_shim";
import localforage from "localforage";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let instance: any;
export async function install() {
  const args = ["pandoc.wasm", "+RTS", "-H64m", "-RTS"];
  const env: string[] = []; // Specify the type for env
  const in_file = new File(new Uint8Array(), { readonly: true });
  const out_file = new File(new Uint8Array(), { readonly: false });

  const fds = [
    new OpenFile(new File(new Uint8Array(), { readonly: true })),
    ConsoleStdout.lineBuffered((msg) => console.log(`[WASI stdout] ${msg}`)),
    ConsoleStdout.lineBuffered((msg) => console.warn(`[WASI stderr] ${msg}`)),
    new PreopenDirectory(
      "/",
      new Map([
        ["in", in_file],
        ["out", out_file],
      ])
    ), // Specify the type for the array
  ];

  const options = { debug: false };
  const wasi = new WASI(args, env, fds, options);

  const res = await WebAssembly.instantiateStreaming(
    fetchWasm("/pandoc.wasm"),
    {
      wasi_snapshot_preview1: wasi.wasiImport,
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance = res.instance;
  wasi.initialize(instance);
  instance.exports.__wasm_call_ctors();

  function memory_data_view() {
    return new DataView(instance.exports.memory.buffer);
  }

  const argc_ptr = instance.exports.malloc(4);
  memory_data_view().setUint32(argc_ptr, args.length, true);
  const argv = instance.exports.malloc(4 * (args.length + 1));
  for (let i = 0; i < args.length; ++i) {
    const arg = instance.exports.malloc(args[i].length + 1);
    new TextEncoder().encodeInto(
      args[i],
      new Uint8Array(instance.exports.memory.buffer, arg, args[i].length)
    );
    memory_data_view().setUint8(arg + args[i].length, 0);
    memory_data_view().setUint32(argv + 4 * i, arg, true);
  }
  memory_data_view().setUint32(argv + 4 * args.length, 0, true);
  const argv_ptr = instance.exports.malloc(4);
  memory_data_view().setUint32(argv_ptr, argv, true);

  instance.exports.hs_init_with_rtsopts(argc_ptr, argv_ptr);
  function pandoc(
    args_str: string,
    in_buffer: Uint8Array<ArrayBufferLike>
  ): Uint8Array<ArrayBufferLike> {
    // Specify types for parameters
    const args_ptr = instance.exports.malloc(args_str.length + 1); // Allocate space for null terminator
    new TextEncoder().encodeInto(
      args_str,
      new Uint8Array(instance.exports.memory.buffer, args_ptr, args_str.length)
    );
    memory_data_view().setUint8(args_ptr + args_str.length, 0); // Set null terminator
    in_file.data = in_buffer;
    instance.exports.wasm_main(args_ptr, args_str.length);
    return out_file.data;
  }
  return { pandoc };
}

const PANDOC_CACHE_KEY = "pandoc_wasm";
async function fetchWasm(url: string): Promise<Response> {
  const cache: Blob | null = await localforage.getItem(PANDOC_CACHE_KEY);
  if (cache) {
    console.log("load from cache");
    return new Response(cache);
  }
  const response = await fetch(url);
  if (response.ok) {
    const blob = response.clone().blob();
    localforage.setItem(PANDOC_CACHE_KEY, blob);
  }
  return response;
}
