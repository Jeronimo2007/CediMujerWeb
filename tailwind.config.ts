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
          '"Morisawa Role Serif Text Pro"',
          '"Role Serif Text Pro"',
          '"Role Serif"',
          "Baskerville",
          '"Playfair Display"',
          '"Bodoni MT"',
          '"Didot"',
          "Georgia",
          "serif",
        ],
        serif: [
          '"Morisawa Role Serif Text Pro"',
          '"Role Serif Text Pro"',
          '"Role Serif"',
          "Baskerville",
          '"Playfair Display"',
          '"Bodoni MT"',
          '"Didot"',
          "Georgia",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
