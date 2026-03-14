# Archivo: backend/main.py
# Descripcion: Servidor FastAPI que conecta el Frontend con el modelo Llama 3 70B via Groq API.

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from dotenv import load_dotenv
from prompt_manager import get_dbt_system_prompt

# Cargar variables de entorno desde un archivo .env localmente
load_dotenv()

app = FastAPI(title="DBT Emergency Kit API")

# VARIABLES DE ENTORNO ESTRICTAS PARA PRODUCCION
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173") 

if not GROQ_API_KEY:
    print("ADVERTENCIA: GROQ_API_KEY no detectada en el entorno.")

# Configuracion CORS restrictiva (Mejor practica de seguridad)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL], 
    allow_credentials=True,
    allow_methods=["POST", "OPTIONS"], 
    allow_headers=["*"],
)

class ValidationRequest(BaseModel):
    reason: str

# Configuracion de Groq
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

# ACTUALIZACION: Usamos el modelo optimizado Llama 3 70B de Groq para mayor razonamiento
MODEL_NAME = "llama-3.3-70b-versatile"

@app.post("/api/validate")
async def validate_emotion(request: ValidationRequest):
    if not request.reason.strip():
        raise HTTPException(status_code=400, detail="La razon de crisis no puede estar vacia")
    
    if not GROQ_API_KEY:
         raise HTTPException(status_code=500, detail="Error de configuracion del servidor (API Key faltante)")

    system_prompt = get_dbt_system_prompt()
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    # Estructura de mensajes formato OpenAI/Groq
    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.reason}
        ],
        "temperature": 0.3, 
        "max_tokens": 150,  
        "stream": False
    }

    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        # Extraer el texto de la respuesta de la estructura JSON
        ai_response = data['choices'][0]['message']['content']
        
        return {"validation": ai_response}
        
    except requests.exceptions.RequestException as e:
        print(f"Error critico conectando con Groq API: {e}")
        # Mensaje de fallback seguro segun directrices DBT
        fallback_msg = "Lo siento, mi conexion fallo por un segundo. Sin embargo, quiero que sepas que tu dolor es valido y tiene sentido que te sientas asi."
        return {"validation": fallback_msg}

if __name__ == "__main__":
    import uvicorn
    # Levantamos el servidor en el puerto 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)