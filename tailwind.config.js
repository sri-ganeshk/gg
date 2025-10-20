/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cream palette - warmest tone, perfect for backgrounds and light elements
        cream: {
          50: '#FEFCF8',   // Lightest cream - almost white but warmer
          100: '#F9F5ED',  // Very light cream
          200: '#F5EFE6',  // Base cream color
          300: '#F0E7DB',  // Slightly darker cream
          400: '#E9DDCC',  // Medium cream
          500: '#E0D0B8',  // Darker cream
          600: '#D4C1A4',  // Deep cream
          700: '#C5AD8F',  // Rich cream
          800: '#B3967A',  // Dark cream
          900: '#9E8066',  // Darkest cream
        },
        
        // Beige palette - sophisticated neutral, great for text and secondary backgrounds
        beige: {
          50: '#F5F1EA',   // Lightest beige
          100: '#F0E9DC',  // Very light beige
          200: '#E8DFCA',  // Base beige color
          300: '#E0D5B8',  // Light beige
          400: '#D6C9A6',  // Medium beige
          500: '#CBBC94',  // Darker beige
          600: '#BEAE82',  // Deep beige
          700: '#AF9E70',  // Rich beige
          800: '#9E8D5E',  // Dark beige
          900: '#8A7A4C',  // Darkest beige
        },
        
        // Blue palette - primary brand color, excellent for CTAs and emphasis
        blue: {
          50: '#F0F5FB',   // Very light blue
          100: '#E1EBF7',  // Light blue
          200: '#D2E1F3',  // Lighter blue
          300: '#B8D0E8',  // Medium light blue
          400: '#9DC0DD',  // Medium blue
          500: '#6D94C5',  // Base blue color
          600: '#5B7FB5',  // Darker blue
          700: '#4A6BA5',  // Deep blue
          800: '#3A5794',  // Dark blue
          900: '#2B4382',  // Darkest blue
        },
        
        // Sky palette - lightest and most airy, perfect for subtle accents and hover states
        sky: {
          50: '#F8FBFD',   // Almost white sky
          100: '#F1F7FB',  // Very light sky
          200: '#CBDCEB',  // Base sky color
          300: '#B8D0E3',  // Light sky
          400: '#A5C4DB',  // Medium sky
          500: '#92B8D3',  // Darker sky
          600: '#7FACCB',  // Deep sky
          700: '#6CA0C3',  // Rich sky
          800: '#5994BB',  // Dark sky
          900: '#4688B3',  // Darkest sky
        },
      },
      
      // Optional: Add some custom text colors for better semantic usage
      textColor: {
        primary: '#2B4382',     // blue-900 - for headings and important text
        secondary: '#8A7A4C',   // beige-900 - for body text
        muted: '#9E8D5E',       // beige-800 - for secondary text
        accent: '#5B7FB5',      // blue-600 - for links and highlights
      },
      
      // Optional: Add custom background colors for semantic usage
      backgroundColor: {
        primary: '#F5EFE6',     // cream-200 - main background
        secondary: '#E8DFCA',   // beige-200 - secondary background
        accent: '#CBDCEB',      // sky-200 - accent background
        highlight: '#6D94C5',   // blue-500 - for highlights and CTAs
      },
      
      // Optional: Add custom border colors
      borderColor: {
        light: '#D6C9A6',       // beige-400 - subtle borders
        medium: '#92B8D3',      // sky-500 - medium borders
        strong: '#5B7FB5',      // blue-600 - prominent borders
      }
    },
  },
  plugins: [],
}