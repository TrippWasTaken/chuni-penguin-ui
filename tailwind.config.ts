import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        chuniSilver: { 200: "#d2c6d5", 100: "#e0d7e5", 300: "#4b3b4d" },
        chuniBronze: { 100: "#ff8300", 200: "#ffda6e", 300: "#7c4228" },
        chuniBlue: {
          100: "#60f7ff",
          200: "#06b5ff",
          300: "#112a71",
        },
        chuniS: {
          1: "#ffff61",
          2: "#06b5ff",
          3: "#2fffef",
          4: "#5bb9f5",
        },
        chuniGold: {
          100: "#ffff00",
          200: "#ffaf00",
          300: "#c07b00",
        },
      },
    },
  },
  safelist: [
    {
      pattern: /(green|orange|red|purple)/,
    },
  ],

  plugins: [daisyui],

  daisyui: {
    themes: ["sunset"],
  },
};
export default config;
