/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      architectsDaughter: ["Architects Daughter", "cursive"],
    },
    fontSize: {
      poppins_90: [
        "5.625rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_60: [
        "3.75rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_50: [
        "3.125rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_40: [
        "2.5rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_38: [
        "2.375rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_36: [
        "2.25rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_32: [
        "2.0rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_30: [
        "1.875rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_28: [
        "1.75rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_26: [
        "1.625rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_25: [
        "1.563rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_22: [
        "1.375rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_20: [
        "1.25rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_18: [
        "1.125rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_16: [
        "1rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_14: [
        "0.875rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_12: [
        "0.75rem",
        {
          fontWeight: "500",
        },
      ],
    },
    extend: {
      screens: {
        sm: "640px",
        lg: "1280px",
        xl: "1980px",
      },
      colors: {
        black_75: "#1f1e1e",
      },
    },
  },
  plugins: [],
};
