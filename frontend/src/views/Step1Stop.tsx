// Archivo: src/views/Step1Stop.tsx
// Descripcion: Paso 1 del protocolo. Implementa la habilidad STOP forzando una pausa fisica de 3 segundos.

import React, { useState, useRef, useEffect } from 'react';
import { useCrisisStore } from '../store/useCrisisStore';
import { Hand } from 'lucide-react';

export const Step1Stop: React.FC = () => {
    const nextStep = useCrisisStore((state) => state.nextStep);
    const [progress, setProgress] = useState<number>(0);
    const [isHolding, setIsHolding] = useState<boolean>(false);

    // Referencias para manejar la animacion fuera del ciclo de renderizado de React
    const animationRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    const durationMs = 3000; // 3 segundos clinicos de pausa obligatoria

    const updateProgress = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const currentProgress = Math.min((elapsed / durationMs) * 100, 100);

        setProgress(currentProgress);

        if (currentProgress < 100) {
            animationRef.current = requestAnimationFrame(updateProgress);
        } else {
            // Alcanzo el 100%, avanzamos al siguiente paso automaticamente
            nextStep();
        }
    };

    const startHold = () => {
        setIsHolding(true);
        setProgress(0);
        startTimeRef.current = 0;
        animationRef.current = requestAnimationFrame(updateProgress);
    };

    const stopHold = () => {
        setIsHolding(false);
        setProgress(0);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    // Limpieza del listener de animacion al desmontar el componente
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full animate-fade-in">
            <div className="bg-dbt-surface p-6 rounded-full mb-8 shadow-lg shadow-dbt-bg/50">
                <Hand size={64} className="text-dbt-primary" />
            </div>

            <h1 className="text-4xl font-bold tracking-tight mb-4 text-dbt-text">
                Detente.
            </h1>

            <p className="text-lg text-dbt-muted mb-12 max-w-sm">
                No reacciones. Tu cuerpo está en una falsa alarma. Mantén presionado el botón para anclarte.
            </p>

            {/* Boton de Interrupcion Fisica */}
            <div className="relative w-64 h-16 rounded-2xl overflow-hidden bg-dbt-surface border border-dbt-muted/20">
                {/* Barra de progreso de llenado */}
                <div
                    className="absolute top-0 left-0 h-full bg-dbt-primary/20 transition-none"
                    style={{ width: `${progress}%` }}
                />

                <button
                    onMouseDown={startHold}
                    onMouseUp={stopHold}
                    onMouseLeave={stopHold}
                    onTouchStart={startHold}
                    onTouchEnd={stopHold}
                    className="absolute inset-0 w-full h-full flex items-center justify-center text-lg font-semibold text-dbt-text transition-transform active:scale-95"
                >
                    {isHolding ? 'Mantén presionado...' : 'Mantener presionado'}
                </button>
            </div>
        </div>
    );
};