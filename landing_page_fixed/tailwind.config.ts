import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        red: { DEFAULT: "#C41220", bright: "#E01E2D", deep: "#7E0B13", wine: "#5C0810", soft: "#FDEEF0", tint: "#FAD9DD" },
        rose: "#F2637A",
        gold: { DEFAULT: "#C49A48", light: "#E7C67A" },
        off: "#FFFAF9",
        sand: "#FFF4EC",
        ink: { DEFAULT: "#181818", 2: "#666666" },
        line: "#EADCDD",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: { shell: "72rem" },
      boxShadow: {
        soft: "0 14px 34px -18px rgba(196,18,32,.42)",
        card: "0 1px 2px rgba(92,8,16,.05), 0 18px 44px -30px rgba(126,11,19,.3)",
        glow: "0 20px 50px -22px rgba(224,30,45,.55)",
      },
    },
  },
  plugins: [],
};
export default config;
