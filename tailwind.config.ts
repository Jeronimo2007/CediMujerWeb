import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-montserrat)",
          "Montserrat",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        title: [
          "var(--font-playfair)",
          '"Playfair Display"',
          "Georgia",
          "serif",
        ],
        serif: [
          "var(--font-playfair)",
          '"Playfair Display"',
          "Georgia",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
