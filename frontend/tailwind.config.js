/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dbt: {
          bg: '#0F172A',
          surface: '#1E293B',
          primary: '#3B82F6',
          primaryHover: '#2563EB',
          text: '#F8FAFC',
          muted: '#94A3B8',
          success: '#10B981',
          accent: '#8B5CF6',
          danger: '#EF4444', // Nuevo color rojo de emergencia (Red 500)
          dangerHover: '#DC2626', // Red 600
        }
      },
      animation: {
        'breathe-in': 'expand 4s ease-in-out forwards',
        'breathe-hold': 'hold 4s linear forwards',
        'breathe-out': 'contract 6s ease-in-out forwards',
      },
      keyframes: {
        expand: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(1.5)', opacity: '1' },
        },
        hold: {
          '0%': { transform: 'scale(1.5)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '1' },
        },
        contract: {
          '0%': { transform: 'scale(1.5)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
}