const svgToDataUri = require("mini-svg-data-uri");
 
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
 

/** @type {import('tailwindcss').Config} */


module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./ui/**/*.{ts,tsx,js,jsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "moveHorizontal": {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        "moveInCircle": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "moveVertical": {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
          "accordion-down": {
            from: {
              height: "0"
            },
            to: {
              height: "var(--radix-accordion-content-height)"
            },
          },
          "accordion-up": {
            from: {
              height: "var(--radix-accordion-content-height)"
            },
            to: {
              height: "0"
            },
          },
          spotlight: {
            "0%": {
              opacity: 0,
              transform: "translate(-72%, -62%) scale(0.5)",
            },
            "100%": {
              opacity: 1,
              transform: "translate(-50%,-40%) scale(1)",
            },
          },
        },
      },
      gridTemplateColumns: {
        "auto-fill-250": "repeat(auto-fill, minmax(250px, 1fr))",
        "auto-fill-350": "repeat(auto-fill, minmax(350px, 1fr))",
        "auto-fill-110": "repeat(auto-fill, minmax(110px, 1fr))",
        "auto-fill-32": "repeat(auto-fill, minmax(32px, 1fr))",
      },
      colors: {
        "border-primary": "#242424",
        "border-secondary": "#7F7F7F",
        "background-secondary": "#0a0a0a",
        "background-alert": "rgba(0, 0, 0, 0.9)",
        "color-secondary": "#1A1A1A",
        "color-tertiary": "#888",
        999: "#999",
      },
      height: {
        "60vh": "60vh",
        "80vh": "80vh",
        260: "260px",
      },
      minWidth: {
        "grid-img": "560px",
        250: "250px",
      },
      maxWidth: {
        img: "850px",
        350: "350px",
        90: "90%",
        180: "180px",
      },
      flexBasis: {
        600: "600px",
        800: "800px",
      },
      translate: {
        hide: "-100%",
      },
      screens: {
        xs: "350px",
      },
      flexGrow: {
        999: "999",
      },
      inset: {
        selected: "-7px",
      },
      fontSize: {
        13: "13px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}