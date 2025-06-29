import { defineConfig, presetWind4, transformerDirectives } from "unocss"

export default defineConfig({
  theme: {
    //
  },
  presets: [
    presetWind4(),
  ],
  transformers: [
    transformerDirectives({
      applyVariable: ["--at-apply"],
    }),
  ],
  shortcuts: {
    "flex-center": "flex justify-center items-center",
  },
  rules: [

  ],
})
