// Paso 3 refactorizado. Ritmo 4-4-6 con reloj maestro para transiciones ultra suaves, conteo visible y boton de salto.

import React, { useState, useEffect } from 'react';
import { useCrisisStore } from '../store/useCrisisStore';
import { Wind, Activity, AlertTriangle } from 'lucide-react';

type BreathPhase = 'inhale' | 'hold' | 'exhale';

export const Step3Breathing: React.FC = () => {
    const { nextStep, setStep, setAnxietyLevel } = useCrisisStore();
    const [timeLeft, setTimeLeft] = useState<number>(60);

    // Reloj maestro del ciclo (14 segundos en total: 4 + 4 + 6)
    const [cycleTick, setCycleTick] = useState<number>(0);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            setCycleTick((prev) => (prev + 1) % 14);
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    // Derivamos la fase actual y los segundos restantes de esa fase basados en el reloj maestro
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
        nextStep(); // Avanza al Paso 4
    };

    // Boton de saltar (fuerza el fin del temporizador para mostrar el triage)
    const handleSkip = () => {
        setTimeLeft(0);
    };

    const getInstruction = () => {
        switch (phase) {
            case 'inhale': return `Inhala lentamente... (${phaseSeconds}s)`;
            case 'hold': return `Sostén el aire... (${phaseSeconds}s)`;
            case 'exhale': return `Exhala muy despacio... (${phaseSeconds}s)`;
        }
    };

    // Estilos dinamicos para forzar una transicion CSS perfecta sin saltos
    const getCircleStyle = (): React.CSSProperties => {
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
                        {/* Circulo animado por React Styles en lugar de Tailwind classes */}
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
                        <button
                            onClick={handleModerateRouting}
                            className="w-full bg-dbt-surface hover:bg-dbt-surface/80 border-2 border-dbt-success/50 p-5 rounded-2xl text-left transition-colors flex items-start gap-4 active:scale-95"
                        >
                            <Activity className="text-dbt-success mt-1 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-dbt-text text-lg mb-1">Ansiedad Moderada</h3>
                                <p className="text-sm text-dbt-muted leading-relaxed">
                                    Preocupación frecuente, tensión física, problemas de concentración y aumento de la irritabilidad.
                                </p>
                            </div>
                        </button>

                        <button
                            onClick={handleHighRouting}
                            className="w-full bg-dbt-surface hover:bg-dbt-surface/80 border-2 border-dbt-danger/50 p-5 rounded-2xl text-left transition-colors flex items-start gap-4 active:scale-95"
                        >
                            <AlertTriangle className="text-dbt-danger mt-1 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-dbt-text text-lg mb-1">Ansiedad Alta</h3>
                                <p className="text-sm text-dbt-muted leading-relaxed">
                                    Preocupación intensa, constante y difícil de controlar, sensación de peligro inminente y bloqueo mental.
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};