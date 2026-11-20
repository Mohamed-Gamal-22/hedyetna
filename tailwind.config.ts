import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        palm: "var(--color-palm)",
        cream: "var(--color-cream)",
        copper: "var(--color-copper)",
        rose: "var(--color-rose)",
      },
      fontFamily: { heading: ["var(--font-cairo)"], body: ["var(--font-tajawal)"] },
    },
  },
  plugins: [],
};

export default config;
