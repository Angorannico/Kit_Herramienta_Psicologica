
// Paso 4 del protocolo. Tecnica de aterrizaje (Grounding) 5-4-3-2-1 para reconectar con el entorno.

import React, { useState } from 'react';
import { useCrisisStore } from '../store/useCrisisStore';
import { Eye, Hand, Ear, Wind, Coffee, CheckCircle2 } from 'lucide-react';

// Estructura de los pasos de grounding
const groundingStages = [
    { target: 5, action: 'Puedes ver a tu alrededor', icon: Eye, instruction: 'Busca 5 cosas reales y concretas.' },
    { target: 4, action: 'Puedes tocar ahora mismo', icon: Hand, instruction: 'Siente la textura de 4 objetos cerca de ti.' },
    { target: 3, action: 'Puedes escuchar', icon: Ear, instruction: 'Identifica 3 sonidos distintos en tu entorno.' },
    { target: 2, action: 'Puedes oler', icon: Wind, instruction: 'Encuentra 2 olores a tu alrededor.' },
    { target: 1, action: 'Puedes saborear', icon: Coffee, instruction: 'Nota 1 sabor en tu boca, o toma un sorbo de agua.' },
];

export const Step4Grounding: React.FC = () => {
    const nextStep = useCrisisStore((state) => state.nextStep);
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [itemsFound, setItemsFound] = useState(0);

    const currentStage = groundingStages[currentStageIndex];
    const isLastStage = currentStageIndex === groundingStages.length - 1;

    const handleItemFound = () => {
        if (itemsFound + 1 < currentStage.target) {
            setItemsFound(prev => prev + 1);
        } else {
            // Avanzar de etapa o finalizar el paso
            if (!isLastStage) {
                setItemsFound(0);
                setCurrentStageIndex(prev => prev + 1);
            } else {
                nextStep();
            }
        }
    };

    const IconComponent = currentStage.icon;

    return (
        <div className="flex flex-col items-center justify-center w-full animate-fade-in">
            <div className="flex items-center gap-2 mb-8 text-dbt-accent">
                <span className="text-sm uppercase tracking-widest font-bold">Aterrizaje</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-dbt-text text-center">
                Encuentra {currentStage.target} {currentStage.target === 1 ? 'cosa' : 'cosas'} que...
            </h1>
            <p className="text-xl font-medium text-dbt-primary mb-8 text-center h-8">
                {currentStage.action}
            </p>

            <div className="bg-dbt-surface p-8 rounded-3xl mb-12 shadow-lg shadow-dbt-bg/50 w-full max-w-xs flex flex-col items-center border border-dbt-muted/10">
                <IconComponent size={56} className="text-dbt-muted mb-6" />
                <p className="text-sm text-dbt-text text-center mb-6 h-10">
                    {currentStage.instruction}
                </p>

                <div className="flex gap-2 mb-8">
                    {Array.from({ length: currentStage.target }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-4 h-4 rounded-full transition-colors duration-300 ${index < itemsFound ? 'bg-dbt-primary' : 'bg-dbt-bg border border-dbt-muted/30'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleItemFound}
                    className="w-full flex items-center justify-center gap-2 h-14 rounded-xl bg-dbt-surface border-2 border-dbt-primary text-dbt-text hover:bg-dbt-primary/10 font-bold text-lg transition-colors active:scale-95"
                >
                    <CheckCircle2 size={20} className="text-dbt-primary" />
                    ¡Lo encontré!
                </button>
            </div>
        </div>
    );
};