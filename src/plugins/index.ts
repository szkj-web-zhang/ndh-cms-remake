import { PluginOption } from "vite";
import viteCompression from "vite-plugin-compression";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import eslintPlugin from "vite-plugin-eslint";
import NextDevTools from "vite-plugin-vue-devtools";
import { visualizer } from "rollup-plugin-visualizer";

/**
 * vite 插件
 */
export const createVitePlugins = (
  viteEnv: ViteEnv
): (PluginOption | PluginOption[])[] => {
  const { VITE_REPORT, VITE_DEVTOOLS } = viteEnv;
  return [
    vue(),
    vueJsx(),
    eslintPlugin(),
    createCompression(viteEnv),
    VITE_DEVTOOLS && NextDevTools({ launchEditor: "code" }),
    VITE_REPORT &&
      (visualizer({
        filename: "stats.html",
        gzipSize: true,
        brotliSize: true
      }) as PluginOption)
  ];
};

/**
 * 根据 compress 配置，生成不同的压缩规则
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } =
    viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugins: PluginOption[] = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      viteCompression({
        ext: ".gz",
        algorithm: "gzip",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      viteCompression({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  return plugins;
};
