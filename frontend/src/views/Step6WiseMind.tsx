// Paso 6 del protocolo. Mente Sabia e integracion con IA para validacion nivel 6.

import React from 'react';
import { useCrisisStore } from '../store/useCrisisStore';
import { Send, Sparkles, RefreshCcw } from 'lucide-react';

export const Step6WiseMind: React.FC = () => {
    const {
        crisisReason,
        setCrisisReason,
        aiValidationResponse,
        setAiValidationResponse,
        isLoadingAi,
        setIsLoadingAi,
        resetProtocol
    } = useCrisisStore();

    const handleValidationRequest = async () => {
        if (!crisisReason.trim()) return;

        setIsLoadingAi(true);
        setAiValidationResponse('');

        try {
            // Nota: Esta URL apuntara a nuestro microservicio FastAPI (Python)
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

            const response = await fetch(`${baseUrl}/api/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reason: crisisReason }),
            });

            if (!response.ok) {
                throw new Error('Error en la comunicación con el servidor');
            }

            const data = await response.json();
            setAiValidationResponse(data.validation);
        } catch (error) {
            console.error(error);
            setAiValidationResponse('Tu dolor es completamente válido, incluso si en este momento no puedo procesar mi respuesta. Has hecho un gran trabajo regulándote hoy.');
        } finally {
            setIsLoadingAi(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start w-full animate-fade-in pt-8">
            <h1 className="text-2xl font-bold tracking-tight mb-2 text-dbt-text">
                Mente Sabia
            </h1>

            {!aiValidationResponse ? (
                <>
                    <p className="text-md text-dbt-muted mb-8 max-w-sm text-center">
                        Ahora que tu fisiología está más calmada, descríbeme en una frase qué detonó esta crisis. No busco solucionarlo, solo escucharlo.
                    </p>

                    <textarea
                        value={crisisReason}
                        onChange={(e) => setCrisisReason(e.target.value)}
                        placeholder="Ej: Siento que voy a fracasar en mi examen y mi vida se arruinará..."
                        className="w-full max-w-sm h-32 bg-dbt-surface border border-dbt-muted/30 rounded-2xl p-4 text-dbt-text placeholder-dbt-muted/50 focus:outline-none focus:border-dbt-primary resize-none mb-6"
                        disabled={isLoadingAi}
                    />

                    <button
                        onClick={handleValidationRequest}
                        disabled={!crisisReason.trim() || isLoadingAi}
                        className="w-full max-w-sm h-14 rounded-2xl bg-dbt-primary text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-dbt-primaryHover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-dbt-primary/20"
                    >
                        {isLoadingAi ? (
                            <span className="animate-pulse">Validando...</span>
                        ) : (
                            <>
                                <Send size={20} />
                                Enviar
                            </>
                        )}
                    </button>
                </>
            ) : (
                <div className="flex flex-col items-center w-full max-w-sm animate-fade-in">
                    <div className="bg-dbt-surface border border-dbt-primary/30 p-6 rounded-2xl mb-8 relative">
                        <Sparkles size={24} className="text-dbt-primary absolute -top-3 -right-3 bg-dbt-bg rounded-full p-1" />
                        <p className="text-lg text-dbt-text leading-relaxed">
                            {aiValidationResponse}
                        </p>
                    </div>

                    <button
                        onClick={resetProtocol}
                        className="w-full h-14 rounded-2xl border-2 border-dbt-muted text-dbt-text font-bold text-lg flex items-center justify-center gap-2 hover:bg-dbt-surface transition-colors"
                    >
                        <RefreshCcw size={20} />
                        Finalizar y volver al inicio
                    </button>
                </div>
            )}
        </div>
    );

};