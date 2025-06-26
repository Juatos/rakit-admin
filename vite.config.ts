import { resolve } from "node:path"
import { defineConfig } from "@rakit/conf"

export default defineConfig({
  root: resolve(__dirname),

  resolve: {
    alias: {
      $rk: resolve(__dirname, "src"),
    },
  },

  plugins: {
    vue: true,
    autoImport: true,
    components: true,
    dts: true,
    unocss: true,
  },

  build: {
    mode: "LIB",
  },
})
