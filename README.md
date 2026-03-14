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
├── frontend/                 # Aplicacion React + Vite
│   ├── src/ 
│   │   ├── components/       # Componentes UI reutilizables
│   │   ├── store/            # Estado global (Zustand)
│   │   ├── views/            # Vistas de los 6 pasos del protocolo
│   │   └── utils/            # Utilidades y tipado
│   └── package.json          # Dependencias NPM
│
└── backend/                  # API Python
    ├── main.py               # Servidor FastAPI y configuracion CORS
    ├── prompt_manager.py     # Gestor del System Prompt Clinico
    └── requirements.txt      # Dependencias Pip

# Kit de Emergencia Psicológica (Protocolo DBT)

**Seguridad y Privacidad:** En estricto cumplimiento normativo, esta aplicación NO utiliza bases de datos ni almacena información médica, personal o de uso.

---

## Arquitectura y Stack Tecnológico

El proyecto opera bajo un modelo de Monorepo, separando visualmente y lógicamente la interfaz del microservicio.

| Capa | Tecnología Principal | Entorno de Producción |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, TypeScript, Tailwind | Vercel |
| **Backend** | Python 3.10+, FastAPI, Uvicorn | Railway |
| **Motor IA** | Meta Llama 3.3 (70B Versatile) | API de Groq |

---

## PARTE 1: Guía de Instalación en Entorno Local

Sigue estos pasos para correr el proyecto en tu propia máquina para desarrollo o pruebas.
**Requisitos Previos:** `Node.js`, `Python 3.10+` y una clave API gratuita de [Groq Console](https://console.groq.com).

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd kit_herramienta_psicologica
```

2. Levantar el Backend (FastAPI + IA)
Abre una terminal y navega al directorio del servidor:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows usar: venv\Scripts\activate
pip install -r requirements.txt
```
Variables de Entorno:
Crea un archivo llamado .env dentro de la carpeta backend/ e inyecta tus claves:

Fragmento de código

GROQ_API_KEY=tu_clave_de_groq_aqui
FRONTEND_URL=http://localhost:5173

Ejecución:
```Bash
uvicorn main:app --reload
(El servidor de IA estará escuchando en http://localhost:8000)
```
3. Levantar el Frontend (React + Vite)
Abre una segunda terminal y navega a la interfaz:

```Bash
cd frontend
npm install
```
Variables de Entorno:
Crea un archivo llamado .env dentro de la carpeta frontend/:

Fragmento de código
VITE_API_URL=http://localhost:8000

Ejecución:
```Bash
npm run dev
```
(La aplicación interactiva estará disponible en http://localhost:5173)

PARTE 2: Guía de Despliegue en la Nube (Producción)
Esta arquitectura está diseñada para desplegarse de manera óptima y gratuita (o a muy bajo costo).

A. Despliegue del Backend en Railway
    1. Conecta tu repositorio de GitHub en Railway creando un nuevo proyecto.
    2. Ve a Settings y configura el Root Directory como /backend.
    3. En la sección Custom Start Command, ingresa:
    uvicorn main:app --host 0.0.0.0 --port $PORT
    4. En Variables, agrega la variable GROQ_API_KEY con tu clave de la API.
    5. En la sección Networking, haz clic en Generate Domain para obtener tu URL pública (Ej: https://tu-backend.up.railway.app).

B. Despliegue del Frontend en Vercel
    1. Importa el repositorio desde tu panel de Vercel.
    2. Configura el Root Directory seleccionando la carpeta /frontend.
    3. Ve a Environment Variables y agrega VITE_API_URL. Como valor, pega el dominio público que te dio Railway en el paso anterior (sin la barra / al final).
    4. Haz clic en Deploy y obtén tu dominio oficial (Ej: https://tu-app.vercel.app).

C. Enlace de Seguridad (Configuración CORS)
Para blindar el servidor y que solo tu frontend pueda usar la IA:
    1. Regresa a tu proyecto en Railway > Pestaña Variables.
    2. Agrega una nueva variable llamada FRONTEND_URL y pega el dominio exacto que te dio Vercel.
    3. Railway se reiniciará automáticamente. Finalmente, ve a Vercel y haz un Redeploy para aplicar la conexión final.
