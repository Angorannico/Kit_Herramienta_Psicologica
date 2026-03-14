// Archivo: src/views/Step3Breathing.tsx
// Descripcion: Paso 3 refactorizado. Correccion de inicio de animacion (comienza en scale 1).

import React, { useState, useEffect } from 'react';
import { useCrisisStore } from '../store/useCrisisStore';
import { Wind, Activity, AlertTriangle } from 'lucide-react';

type BreathPhase = 'inhale' | 'hold' | 'exhale';

export const Step3Breathing: React.FC = () => {
    const { nextStep, setStep, setAnxietyLevel } = useCrisisStore();
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [cycleTick, setCycleTick] = useState<number>(0);

    // Nuevo estado para forzar que el circulo inicie pequeno antes de expandirse
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    useEffect(() => {
        // Permite que el componente se renderice en su tamano original (scale 1) 
        // y en el siguiente frame de animacion del navegador, arranca la expansion.
        const frame = requestAnimationFrame(() => setIsAnimating(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setCycleTick((prev) => (prev + 1) % 14);
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    let phase: BreathPhase = 'inhale';
    let phaseSeconds = 0;

    if (cycleTick < 4) {
        phase = 'inhale';
        phaseSeconds = 4 - cycleTick;
    } else if (cycleTick < 8) {
        phase = 'hold';
        phaseSeconds = 8 - (cycleTick - 4);
    } else {
        phase = 'exhale';
        phaseSeconds = 6 - (cycleTick - 8);
    }

    const handleModerateRouting = () => {
        setAnxietyLevel('moderate');
        setStep('moderate_exit');
    };

    const handleHighRouting = () => {
        setAnxietyLevel('high');
        nextStep();
    };

    const handleSkip = () => setTimeLeft(0);

    const getInstruction = () => {
        switch (phase) {
            case 'inhale': return `Inhala lentamente... (${phaseSeconds}s)`;
            case 'hold': return `Sostén el aire... (${phaseSeconds}s)`;
            case 'exhale': return `Exhala muy despacio... (${phaseSeconds}s)`;
        }
    };

    const getCircleStyle = (): React.CSSProperties => {
        // Si aun no ha empezado a animar, forzamos que el tamano sea pequeno.
        if (!isAnimating) {
            return { transform: 'scale(1)', opacity: 0.7 };
        }

        if (phase === 'inhale') {
            return { transform: 'scale(1.5)', transition: 'transform 4s ease-in-out', opacity: 1 };
        } else if (phase === 'hold') {
            return { transform: 'scale(1.5)', transition: 'none', opacity: 1 };
        } else {
            return { transform: 'scale(1)', transition: 'transform 6s ease-in-out', opacity: 0.7 };
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full animate-fade-in py-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-dbt-text">
                Respira conmigo
            </h1>

            {timeLeft > 0 ? (
                <>
                    <p className="text-lg font-medium text-dbt-primary mb-16 h-8">
                        {getInstruction()}
                    </p>

                    <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
                        <div
                            className="absolute inset-0 bg-dbt-primary/20 rounded-full"
                            style={getCircleStyle()}
                        />
                        <div className="relative z-10 bg-dbt-surface p-8 rounded-full shadow-lg border border-dbt-primary/30 transition-transform duration-700">
                            <Wind size={48} className="text-dbt-primary" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <p className="text-sm font-medium text-dbt-accent">
                            Continúa por {timeLeft} segundos más
                        </p>

                        <button
                            onClick={handleSkip}
                            className="mt-2 w-64 h-12 rounded-xl bg-transparent border-2 border-dbt-surface text-dbt-muted hover:text-dbt-text hover:border-dbt-muted transition-all font-bold"
                        >
                            Ya me calmé (Avanzar)
                        </button>
                    </div>
                </>
            ) : (
                <div className="w-full max-w-md animate-fade-in flex flex-col items-center mt-4">
                    <p className="text-xl font-bold text-dbt-success mb-6 text-center">
                        ¡Excelente trabajo! <br /> ¿Cómo te sientes ahora?
                    </p>
                    <div className="flex flex-col gap-4 w-full">
                        <button onClick={handleModerateRouting} className="w-full bg-dbt-surface hover:bg-dbt-surface/80 border-2 border-dbt-success/50 p-5 rounded-2xl text-left transition-colors flex items-start gap-4 active:scale-95">
                            <Activity className="text-dbt-success mt-1 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-dbt-text text-lg mb-1">Ansiedad Moderada</h3>
                                <p className="text-sm text-dbt-muted leading-relaxed">Preocupación frecuente, tensión física, problemas de concentración e irritabilidad.</p>
                            </div>
                        </button>
                        <button onClick={handleHighRouting} className="w-full bg-dbt-surface hover:bg-dbt-surface/80 border-2 border-dbt-danger/50 p-5 rounded-2xl text-left transition-colors flex items-start gap-4 active:scale-95">
                            <AlertTriangle className="text-dbt-danger mt-1 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-dbt-text text-lg mb-1">Ansiedad Alta</h3>
                                <p className="text-sm text-dbt-muted leading-relaxed">Preocupación intensa y constante, sensación de peligro inminente y bloqueo mental.</p>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};