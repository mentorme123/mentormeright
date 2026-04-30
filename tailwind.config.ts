import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        brand: {
          indigo: "hsl(var(--brand-indigo))",
          emerald: "hsl(var(--brand-emerald))",
          gold: "hsl(var(--brand-gold))",
          slate: "hsl(var(--brand-slate))",
          blue: "#1A6DD1", // Legacy fallback
          orange: "#F97316", // Legacy fallback
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px -10px hsl(var(--brand-indigo))' },
          'to': { boxShadow: '0 0 20px 5px hsl(var(--brand-indigo))' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
