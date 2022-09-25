import Unocss from "unocss/vite";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Modules from "vite-plugin-use-modules";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    Vue(),
    Pages(),
    Unocss(),
    Components({
      dts: true,
      resolvers: [ElementPlusResolver()],
    }),
    Modules({
      auto: true,
    }),
    AutoImport({
      dts: true,
      imports: ["vue", "vue-router"],
    }),
  ],
});
