// Paso 5 del protocolo. Habilidad "Check the Facts" para activar la corteza prefrontal.

import React from 'react';
import { useCrisisStore } from '../store/useCrisisStore';
import { BrainCircuit, ShieldCheck } from 'lucide-react';

export const Step5Facts: React.FC = () => {
    const nextStep = useCrisisStore((state) => state.nextStep);

    return (
        <div className="flex flex-col items-center justify-center w-full animate-fade-in">
            <div className="bg-dbt-surface p-6 rounded-full mb-8 shadow-lg shadow-dbt-bg/50">
                <BrainCircuit size={64} className="text-dbt-primary" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-4 text-dbt-text text-center">
                Revisemos los Hechos
            </h1>

            <p className="text-lg text-dbt-text mb-8 max-w-sm text-center">
                Tu cuerpo reaccionó como si estuvieras frente a un depredador. Pero mira a tu alrededor.
            </p>

            <div className="bg-dbt-surface p-6 rounded-2xl border border-dbt-muted/20 w-full max-w-sm mb-12">
                <p className="text-base text-dbt-muted text-center font-medium">
                    Pregunta clave: <br />
                    <span className="text-dbt-text text-lg">¿Estás en peligro físico real e inmediato en este exacto momento?</span>
                </p>
            </div>

            {/* Boton de anclaje cognitivo */}
            <button
                onClick={nextStep}
                className="w-full max-w-xs h-16 rounded-2xl bg-dbt-surface border-2 border-dbt-success flex items-center justify-center gap-3 hover:bg-dbt-success/10 transition-colors active:scale-95"
            >
                <ShieldCheck size={24} className="text-dbt-success" />
                <span className="font-bold text-lg text-dbt-success">
                    Estoy a salvo ahora
                </span>
            </button>

            <p className="text-xs text-dbt-muted mt-6 max-w-xs text-center">
                Si el peligro no es de vida o muerte inmediata, tu cerebro está dando una falsa alarma. Está bien.
            </p>
        </div>
    );
};