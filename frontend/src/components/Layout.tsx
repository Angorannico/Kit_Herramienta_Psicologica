// Archivo: src/components/Layout.tsx
// Descripcion: Contenedor principal a pantalla completa, disenado para minimizar la carga cognitiva.

import React from 'react';
import { useCrisisStore } from '../store/useCrisisStore';
import { ShieldAlert } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const resetProtocol = useCrisisStore((state) => state.resetProtocol);
    const currentStep = useCrisisStore((state) => state.currentStep);

    return (
        <div className="min-h-screen bg-dbt-bg text-dbt-text flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-500 select-none">
            {/* Cabecera minimalista: Da seguridad sin distraer */}
            <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
                <div className="flex items-center gap-2 text-dbt-muted">
                    <ShieldAlert size={20} />
                    <span className="text-xs font-semibold tracking-widest uppercase">
                        Kit de Emergencia
                    </span>
                </div>
                {currentStep !== 1 && (
                    <button
                        onClick={resetProtocol}
                        className="text-sm font-medium text-dbt-muted hover:text-dbt-text transition-colors"
                        aria-label="Abortar protocolo y volver al inicio"
                    >
                        Abortar
                    </button>
                )}
            </header>

            {/* Area central donde se renderiza el paso clinico */}
            <main className="w-full max-w-md flex flex-col items-center justify-center flex-grow text-center">
                {children}
            </main>

            {/* Footer: Indicador de progreso sutil (Puntos en lugar de numeros para reducir ansiedad) */}
            {typeof currentStep === 'number' && (
                <footer className="absolute bottom-0 left-0 w-full p-8 flex justify-center gap-3">
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                        <div
                            key={step}
                            className={`h-2 rounded-full transition-all duration-500 ${step === currentStep
                                ? 'w-8 bg-dbt-primary'
                                : step < currentStep
                                    ? 'w-2 bg-dbt-success'
                                    : 'w-2 bg-dbt-surface'
                                }`}
                        />
                    ))}
                </footer>
            )}
        </div>
    );
};