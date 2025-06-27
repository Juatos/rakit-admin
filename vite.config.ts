import { resolve } from "node:path"
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import vue from "@vitejs/plugin-vue"
import UnoCSS from "unocss/vite"
import AutoImport from "unplugin-auto-import/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
      dts: resolve(__dirname, "src/types/auto-imports.d.ts"),
    }),
    Components({
      resolvers: [
        NaiveUiResolver(),
        // 内联定义 RakitResolver 避免循环依赖
        {
          type: "component",
          resolve: (name: string) => {
            if (name.startsWith("Rk")) {
              return {
                name,
                from: "$rk/components",
              }
            }
          },
        },
      ],
      dts: resolve(__dirname, "src/types/components.d.ts"),
    }),
    dts({
      tsconfigPath: resolve(__dirname, "./tsconfig.json"),
      insertTypesEntry: true,
      copyDtsFiles: false,
      rollupTypes: true,
    }),
  ],

  resolve: {
    alias: {
      $rk: resolve(__dirname, "src"),
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "rakit-admin",
      fileName: () => "index.mjs",
      formats: ["es"],
    },
    cssCodeSplit: false,
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    cssMinify: "esbuild",
    rollupOptions: {
      external: ["vue", "naive-ui", "vue-router", "pinia", "@vueuse/core", "alova", "dayjs", "radash"],
      output: {
        format: "es",
        globals: {
          "vue": "Vue",
          "naive-ui": "naive",
          "vue-router": "VueRouter",
          "pinia": "Pinia",
          "@vueuse/core": "VueUse",
          "alova": "Alova",
          "dayjs": "dayjs",
          "radash": "radash",
        },
        assetFileNames: "admin.css",
      },
    },
    emptyOutDir: true,
  },
})
