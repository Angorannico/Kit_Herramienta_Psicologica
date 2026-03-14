// Archivo: src/views/Step1Stop.tsx
// Descripcion: Paso 1 responsivo. Tipografia y margenes dinamicos para evitar desbordamientos.

import React, { useState, useRef, useEffect } from 'react';
import { useCrisisStore } from '../store/useCrisisStore';
import { Hand } from 'lucide-react';

export const Step1Stop: React.FC = () => {
    const nextStep = useCrisisStore((state) => state.nextStep);
    const [progress, setProgress] = useState<number>(0);
    const [isHolding, setIsHolding] = useState<boolean>(false);

    const animationRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    const durationMs = 3000;

    const updateProgress = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const currentProgress = Math.min((elapsed / durationMs) * 100, 100);

        setProgress(currentProgress);

        if (currentProgress < 100) {
            animationRef.current = requestAnimationFrame(updateProgress);
        } else {
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

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full animate-fade-in px-4">
            {/* Ajuste de tamano del icono en movil */}
            <div className="bg-dbt-surface p-5 sm:p-6 rounded-full mb-6 sm:mb-8 shadow-lg shadow-dbt-bg/50">
                <Hand size={56} className="text-dbt-primary sm:w-16 sm:h-16" />
            </div>

            {/* text-3xl en movil, text-4xl en PC */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 sm:mb-4 text-dbt-text">
                Detente.
            </h1>

            {/* mb-8 en movil, mb-12 en PC */}
            <p className="text-base sm:text-lg text-dbt-muted mb-8 sm:mb-12 max-w-sm">
                No reacciones. Tu cuerpo está en una falsa alarma. Mantén presionado el botón para anclarte.
            </p>

            {/* Boton: w-full con max-width para adaptarse a pantallas estrechas sin desbordarse */}
            <div className="relative w-full max-w-[16rem] sm:w-64 h-14 sm:h-16 rounded-2xl overflow-hidden bg-dbt-surface border border-dbt-muted/20">
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
                    className="absolute inset-0 w-full h-full flex items-center justify-center text-base sm:text-lg font-semibold text-dbt-text transition-transform active:scale-95"
                >
                    {isHolding ? 'Mantén presionado...' : 'Mantener presionado'}
                </button>
            </div>
        </div>
    );
};