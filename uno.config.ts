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
  rules: [
    ["flex-center", { "display": "flex", "justify-content": "center", "align-items": "center" }],
  ],
})
