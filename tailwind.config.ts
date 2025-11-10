/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        readex: ["var(--font-readex-pro)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        smallcards: {
          DEFAULT: "rgba(40, 162, 101, 0.08)",
          orange: "rgba(255, 165, 0, 0.2)",
          green: "rgba(40, 162, 101, 0.2)",
        },
        line: {
          DEFAULT:
            "linear-gradient(90deg, #047857 0%, #047857 47.74%, #059669 100%)",
        },
        light: {
          DEFAULT: "#FFC300",
          grayish: "#F6F6F6",
        },
        cardBg: {
          DEFAULT: "var(--card-bg)",
        },
        "slate-10": {
          DEFAULT: "rgba(255, 255, 255, 0.30)",
        },
        shadow: {
          400: "rgba(112, 144, 176, 0.1)",
          500: "rgba(112, 144, 176, 0.08)",
        },
        blue: {
          custom: "#557EC5",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "auth-bg-signup":
          'url("/auth-bg.svg"), linear-gradient(357deg, #00D56B 0%, #28A265 78.62%)',
        "auth-bg-signin":
          'url("/auth-bg.svg"), linear-gradient(142deg, #00D56B 0%, #28A265 100%)',
        "auth-vector": "url('/auth-vector.svg')",
        "auth-bg-recover": "url('/auth-bg-recover.svg')",
        "logo-gradient":
          "linear-gradient(85deg, #28A265 10.01%, #00D56B 114.53%)",
        "analytics-card-bg": "url('/analytics-card-bg.svg')",
        "add-member-bg": "url('/add-member-bg.png')",
        "add-vehicle-bg": "url('/add-vehicle-bg.png')",
      },
      backgroundSize: {
        "auth-bg": "80rem",
        "analytics-card-size": "150%",
      },
      gridTemplateColumns: {
        otp: "repeat(4, minmax(0, 4rem))",
      },
      gridTemplateRows: {
        otp: "repeat(4, minmax(0, 4rem))",
      },
      boxShadow: {
        "3xl": "-21px 4px 74px 0px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
