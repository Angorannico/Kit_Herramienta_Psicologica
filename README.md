# Kit de Emergencia Psicologica (Protocolo DBT)

Herramienta web de contencion psicologica basada en la Terapia Dialectico Conductual (DBT). Disenada para guiar a usuarios a traves de pasos de regulacion emocional y proporcionar "Validacion Nivel 6" mediante Inteligencia Artificial durante crisis agudas. 

Por diseno y cumplimiento estricto de privacidad, esta aplicacion NO utiliza bases de datos ni almacena informacion personal o medica.

## Arquitectura y Tecnologias

El proyecto utiliza una arquitectura de Monorepo, separando claramente la interfaz de usuario del microservicio de Inteligencia Artificial.

### Frontend (Interfaz de Usuario)
* Framework: React
* Compilador: Vite
* Lenguaje: TypeScript (Estricto)
* Estilos: Tailwind CSS
* Manejo de Estado: Zustand

### Backend (Microservicio IA)
* Framework: FastAPI (Python 3.10+)
* Servidor Web: Uvicorn
* Peticiones HTTP: Requests
* Seguridad: python-dotenv, CORSMiddleware

### Inteligencia Artificial
* Proveedor: Groq API (Hardware especializado para latencia ultra baja)
* Modelo: Meta Llama 3.3 (70B Versatile)
* Prompting: Ingenieria de prompts con restricciones clinicas de validacion radical.

## Estructura del Repositorio

/
├── frontend/                # Aplicacion React + Vite
│   ├── src/
│   │   ├── components/      # Componentes UI reutilizables
│   │   ├── store/           # Estado global (Zustand)
│   │   ├── views/           # Vistas de los 6 pasos del protocolo
│   │   └── utils/           # Utilidades y tipado
│   └── package.json         # Dependencias NPM
│
└── backend/                 # API Python
    ├── main.py              # Servidor FastAPI y configuracion CORS
    ├── prompt_manager.py    # Gestor del System Prompt Clinico
    └── requirements.txt     # Dependencias Pip


## Instalacion y Ejecucion Local

Para ejecutar este proyecto en tu maquina local, necesitaras tener instalados Node.js y Python 3.10+, ademas de una clave API gratuita de Groq.

### 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd kit_herramienta_psicologica

### 2. Configuracion del Backend (Servidor IA)
Abre una terminal y navega a la carpeta del backend:

cd backend

# Crear y activar entorno virtual (Opcional pero recomendado)
python -m venv venv
source venv/bin/activate  # En Windows usa: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
Crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:
GROQ_API_KEY=tu_clave_de_groq_aqui
FRONTEND_URL=http://localhost:5173

# Iniciar el servidor
uvicorn main:app --reload
# El servidor estara escuchando en http://localhost:8000

### 3. Configuracion del Frontend (Interfaz)
Abre una nueva terminal y navega a la carpeta del frontend:

cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
Crea un archivo `.env` en la carpeta `frontend/` con el siguiente contenido:
VITE_API_URL=http://localhost:8000

# Iniciar el servidor de desarrollo
npm run dev
# La aplicacion estara disponible en http://localhost:5173


## Guia de Despliegue en Produccion

Este proyecto esta optimizado para ser desplegado en plataformas en la nube de forma gratuita o a muy bajo costo.

1. Frontend (Vercel):
   * Importar el repositorio en Vercel.
   * Configurar el "Root Directory" como `frontend`.
   * Agregar la variable de entorno `VITE_API_URL` apuntando al dominio publico del backend.
   * Desplegar.

2. Backend (Railway o Render):
   * Importar el repositorio.
   * Configurar el "Root Directory" como `backend`.
   * Establecer el comando de inicio: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
   * Agregar las variables `GROQ_API_KEY` y `FRONTEND_URL` (esta ultima debe ser el dominio exacto de Vercel).
   * Desplegar.
