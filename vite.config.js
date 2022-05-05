import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //   路径别名选项
    alias: [
      {
        find: "@", // 当在你的路径中找到@ 就用下面replacement路径替换
        replacement: path.resolve(__dirname, "src"), // 拼接根路径
      },
    ],
  },
  plugins: [vue()],
});
