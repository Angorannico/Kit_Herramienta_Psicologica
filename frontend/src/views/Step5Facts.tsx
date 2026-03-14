// Archivo: src/views/Step5Facts.tsx
// Descripcion: Paso 5 del protocolo con boton de emergencia rojo y animado.

import React from 'react';
import { useCrisisStore } from '../store/useCrisisStore';
import { BrainCircuit, ShieldCheck, PhoneCall } from 'lucide-react';

export const Step5Facts: React.FC = () => {
    const nextStep = useCrisisStore((state) => state.nextStep);

    return (
        <div className="flex flex-col items-center justify-center w-full animate-fade-in py-8">
            <div className="bg-dbt-surface p-6 rounded-full mb-8 shadow-lg shadow-dbt-bg/50">
                <BrainCircuit size={64} className="text-dbt-primary" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-4 text-dbt-text text-center">
                Revisemos los Hechos
            </h1>

            <p className="text-lg text-dbt-text mb-8 max-w-sm text-center px-4">
                Tu cuerpo reaccionó como si estuvieras frente a un depredador. Pero mira a tu alrededor.
            </p>

            <div className="bg-dbt-surface p-6 rounded-2xl border border-dbt-muted/20 w-full max-w-sm mb-12">
                <p className="text-base text-dbt-muted text-center font-medium">
                    Pregunta clave: <br />
                    <span className="text-dbt-text text-lg mt-2 block">
                        ¿Estás en peligro físico real e inmediato en este exacto momento?
                    </span>
                </p>
            </div>

            <div className="flex flex-col w-full max-w-xs gap-4">
                {/* Boton de Emergencia: Forzado a Rojo Puro (red-600) y con animacion de latido (animate-pulse) */}
                <a
                    href="https://wa.me/573007548933"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-16 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-3 transition-colors shadow-lg shadow-red-600/30 animate-pulse active:scale-95"
                >
                    <PhoneCall size={24} />
                    <span className="font-bold text-lg tracking-wide">
                        NO ME SIENTO A SALVO
                    </span>
                </a>

                {/* Boton de Anclaje Cognitivo */}
                <button
                    onClick={nextStep}
                    className="w-full h-16 rounded-2xl bg-transparent border-2 border-dbt-success flex items-center justify-center gap-3 hover:bg-dbt-success/10 transition-colors active:scale-95"
                >
                    <ShieldCheck size={24} className="text-dbt-success" />
                    <span className="font-bold text-lg text-dbt-success">
                        Estoy a salvo ahora
                    </span>
                </button>
            </div>

            <p className="text-xs text-dbt-muted mt-8 max-w-xs text-center">
                Si el peligro no es de vida o muerte inmediata, tu cerebro está dando una falsa alarma. Está bien.
            </p>
        </div>
    );
};  