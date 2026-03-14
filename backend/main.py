# Archivo: backend/main.py
# Descripcion: Servidor FastAPI que conecta el Frontend con el modelo local de Ollama.

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from prompt_manager import get_dbt_system_prompt

app = FastAPI(title="DBT Emergency Kit API")

# Configuracion CORS obligatoria para permitir que el frontend de React (puerto 5173) 
# se comunique con este backend (puerto 8000).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ValidationRequest(BaseModel):
    reason: str

# URL por defecto donde Ollama levanta su servidor de API local
OLLAMA_URL = "http://localhost:11434/api/generate"
# Asegurate de que este nombre coincida con el modelo que descargaste (ej. llama3, phi3)
MODEL_NAME = "llama3" 

@app.post("/api/validate")
async def validate_emotion(request: ValidationRequest):
    if not request.reason.strip():
        raise HTTPException(status_code=400, detail="La razon de crisis no puede estar vacia")

    system_prompt = get_dbt_system_prompt()
    
    # Construccion del contexto: Instrucciones clinicas + Entrada del usuario
    full_prompt = f"{system_prompt}\n\nENTRADA DEL PACIENTE: {request.reason}\n\nRESPUESTA DEL TERAPEUTA:"

    payload = {
        "model": MODEL_NAME,
        "prompt": full_prompt,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=45)
        response.raise_for_status()
        data = response.json()
        
        return {"validation": data.get("response", "Lo siento, no pude generar una respuesta. Tu dolor es válido y tiene sentido.")}
    except requests.exceptions.RequestException as e:
        print(f"Error critico conectando con Ollama: {e}")
        raise HTTPException(status_code=503, detail="El motor de IA local (Ollama) no responde. Verifica que este en ejecucion.")

if __name__ == "__main__":
    import uvicorn
    # Levantamos el servidor en el puerto 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)