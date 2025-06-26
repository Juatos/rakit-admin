import { resolve } from "node:path"
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
                from: "@rakit/admin",
              }
            }
          },
        },
      ],
      dts: resolve(__dirname, "src/types/components.d.ts"),
    }),
    UnoCSS(),
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
      formats: ["es"],
      fileName: () => "index.mjs",
    },
    rollupOptions: {
      external: ["vue", "naive-ui"],
      output: {
        globals: {
          "vue": "Vue",
          "naive-ui": "naive",
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
})
