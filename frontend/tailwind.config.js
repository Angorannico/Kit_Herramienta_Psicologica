/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta clínica para reducción de ansiedad (Modo Oscuro por defecto)
        dbt: {
          bg: '#0F172A', // Slate 900 - Fondo principal profundo
          surface: '#1E293B', // Slate 800 - Tarjetas y contenedores
          primary: '#3B82F6', // Blue 500 - Botones de acción principal
          primaryHover: '#2563EB', // Blue 600
          text: '#F8FAFC', // Slate 50 - Texto principal
          muted: '#94A3B8', // Slate 400 - Texto secundario/instrucciones
          success: '#10B981', // Emerald 500 - Indicadores de éxito/avance
          accent: '#8B5CF6', // Violet 500 - Detalles para grounding
        }
      },
      animation: {
        // Animaciones suaves para la respiración (Paso 3)
        'breathe-in': 'expand 4s ease-in-out forwards',
        'breathe-out': 'contract 6s ease-in-out forwards',
      },
      keyframes: {
        expand: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
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