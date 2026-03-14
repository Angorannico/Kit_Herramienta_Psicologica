// Archivo: src/views/Step3Breathing.tsx
// Descripcion: Paso 3 del protocolo. Habilidad TIPP (Paced Breathing). Exhalacion mas larga que la inhalacion para activar el nervio vago.

import React, { useState, useEffect } from 'react';
import { useCrisisStore } from '../store/useCrisisStore';
import { Wind } from 'lucide-react';

export const Step3Breathing: React.FC = () => {
    const nextStep = useCrisisStore((state) => state.nextStep);
    const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
    const [timeLeft, setTimeLeft] = useState<number>(60); // Recomendacion clinica: 1 minuto

    // Gestor del ciclo de respiracion (4s inhalar, 6s exhalar)
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        if (phase === 'inhale') {
            timeoutId = setTimeout(() => setPhase('exhale'), 4000);
        } else {
            timeoutId = setTimeout(() => setPhase('inhale'), 6000);
        }

        return () => clearTimeout(timeoutId);
    }, [phase]);

    // Gestor del temporizador general
    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    return (
        <div className="flex flex-col items-center justify-center w-full animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-dbt-text">
                Respira conmigo
            </h1>
            <p className="text-lg text-dbt-muted mb-16 max-w-sm h-12">
                {phase === 'inhale'
                    ? 'Inhala lentamente por la nariz...'
                    : 'Exhala muy despacio por la boca...'}
            </p>

            {/* Circulo animado de respiracion */}
            <div className="relative w-48 h-48 mb-16 flex items-center justify-center">
                <div
                    className={`absolute inset-0 bg-dbt-primary/20 rounded-full ${phase === 'inhale' ? 'animate-breathe-in' : 'animate-breathe-out'
                        }`}
                />
                <div className="relative z-10 bg-dbt-surface p-8 rounded-full shadow-lg border border-dbt-primary/30">
                    <Wind size={48} className="text-dbt-primary" />
                </div>
            </div>

            <div className="flex flex-col items-center gap-4">
                {timeLeft > 0 ? (
                    <p className="text-sm font-medium text-dbt-accent">
                        Continúa por {timeLeft} segundos más
                    </p>
                ) : (
                    <p className="text-sm font-medium text-dbt-success">
                        ¡Excelente trabajo! Has completado el ciclo.
                    </p>
                )}

                <button
                    onClick={nextStep}
                    className={`w-64 h-14 rounded-2xl font-bold text-lg transition-all ${timeLeft === 0
                            ? 'bg-dbt-success hover:bg-emerald-600 text-white shadow-lg shadow-dbt-success/20'
                            : 'bg-transparent border-2 border-dbt-surface text-dbt-muted hover:text-dbt-text hover:border-dbt-muted'
                        }`}
                >
                    {timeLeft === 0 ? 'Avanzar al siguiente paso' : 'Avanzar de todos modos'}
                </button>
            </div>
        </div>
    );
};