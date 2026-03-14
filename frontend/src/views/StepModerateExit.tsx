// Ruta de salida para ansiedad moderada. Enlaces a actividades de distraccion.

import React from 'react';
import { useCrisisStore } from '../store/useCrisisStore';
import { Music, MessageCircle, Gamepad2, PlaySquare, RotateCcw } from 'lucide-react';

export const StepModerateExit: React.FC = () => {
    const resetProtocol = useCrisisStore((state) => state.resetProtocol);

    const distractionOptions = [
        {
            title: "Escuchar Música",
            description: "Sonidos relajantes (YouTube)",
            icon: Music,
            url: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
            color: "text-blue-400",
            borderColor: "border-blue-400/30"
        },
        {
            title: "Hablar con un amigo",
            description: "Abre WhatsApp para escribirle a alguien",
            icon: MessageCircle,
            // Enlace generico a WhatsApp Web (ideal para PC)
            url: "https://web.whatsapp.com/",
            color: "text-green-400",
            borderColor: "border-green-400/30"
        },
        {
            title: "Jugar un rato",
            description: "Jugar Tetris oficial",
            icon: Gamepad2,
            url: "https://tetris.com/play-tetris",
            color: "text-purple-400",
            borderColor: "border-purple-400/30"
        },
        {
            title: "Ver algo gracioso",
            description: "Videos de animales (YouTube)",
            icon: PlaySquare,
            url: "https://www.youtube.com/results?search_query=videos+de+animales+graciosos",
            color: "text-yellow-400",
            borderColor: "border-yellow-400/30"
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md animate-fade-in py-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4 text-dbt-text text-center">
                Técnicas de Distracción
            </h1>

            <p className="text-base text-dbt-muted mb-8 text-center px-4">
                Has logrado regular tu cuerpo. Tu nivel de ansiedad es manejable ahora. Elige una actividad para distraer tu mente:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-12 px-4">
                {distractionOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                        <a
                            key={index}
                            href={option.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex flex-col items-center justify-center p-6 bg-dbt-surface rounded-2xl border-2 ${option.borderColor} hover:bg-dbt-surface/80 transition-all hover:scale-105 active:scale-95`}
                        >
                            <Icon size={40} className={`${option.color} mb-3`} />
                            <h3 className="font-bold text-dbt-text text-center">{option.title}</h3>
                            <p className="text-xs text-dbt-muted text-center mt-1">{option.description}</p>
                        </a>
                    );
                })}
            </div>

            <button
                onClick={resetProtocol}
                className="flex items-center justify-center gap-2 text-dbt-muted hover:text-dbt-text transition-colors"
            >
                <RotateCcw size={18} />
                <span className="font-medium text-sm">Finalizar y volver al inicio</span>
            </button>
        </div>
    );
};