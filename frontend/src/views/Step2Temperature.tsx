// Archivo: src/views/Step2Temperature.tsx
// Descripcion: Paso 2 del protocolo. Habilidad TIPP (Temperature) para activar reflejo parasimpatico.

import React from 'react';
import { useCrisisStore } from '../store/useCrisisStore';
import { Droplets } from 'lucide-react';

export const Step2Temperature: React.FC = () => {
    const nextStep = useCrisisStore((state) => state.nextStep);

    return (
        <div className="flex flex-col items-center justify-center w-full animate-fade-in">
            <div className="bg-dbt-surface p-6 rounded-full mb-8 shadow-lg shadow-dbt-bg/50">
                <Droplets size={64} className="text-dbt-primary" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-4 text-dbt-text">
                Cambia tu Temperatura
            </h1>

            <p className="text-lg text-dbt-text mb-6 max-w-sm">
                Ve al baño y salpica tu cara con agua muy fría, o sostén un cubo de hielo en tu mano.
            </p>

            <p className="text-sm text-dbt-muted mb-12 max-w-sm italic">
                Esto activará un reflejo físico que ralentizará tu ritmo cardíaco y reducirá la angustia.
            </p>

            {/* Boton de confirmacion de accion fisica */}
            <button
                onClick={nextStep}
                className="w-64 h-16 rounded-2xl bg-dbt-primary hover:bg-dbt-primaryHover text-white font-bold text-lg transition-colors shadow-lg shadow-dbt-primary/20 active:scale-95"
            >
                Ya lo hice
            </button>
        </div>
    );
};