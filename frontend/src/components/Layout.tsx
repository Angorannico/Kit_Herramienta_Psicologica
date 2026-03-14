// Archivo: src/components/Layout.tsx
// Descripcion: Contenedor principal responsivo. Protege la vista PC y ajusta colisiones en movil.

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
        <div className="min-h-screen bg-dbt-bg text-dbt-text flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-500 select-none overflow-hidden relative">

            {/* Cabecera: Ajuste de padding en moviles (p-4) vs PC (sm:p-6) */}
            <header className="absolute top-0 left-0 w-full p-4 sm:p-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-2 text-dbt-muted">
                    <ShieldAlert size={20} />
                    <span className="text-xs font-semibold tracking-widest uppercase">
                        Kit de Emergencia
                    </span>
                </div>
                {typeof currentStep === 'number' && currentStep > 1 && (
                    <button
                        onClick={resetProtocol}
                        className="text-sm font-medium text-dbt-muted hover:text-dbt-text transition-colors"
                        aria-label="Abortar protocolo y volver al inicio"
                    >
                        Abortar
                    </button>
                )}
            </header>

            {/* Area Central: pt-20 y pb-24 evitan que el header/footer aplasten el contenido en telefonos */}
            <main className="w-full max-w-md flex flex-col items-center justify-center flex-grow text-center pt-20 pb-24 sm:pt-0 sm:pb-0 z-0">
                {children}
            </main>

            {/* Footer: Ajuste de padding en moviles (p-4) vs PC (sm:p-8) */}
            <footer className="absolute bottom-0 left-0 w-full p-4 sm:p-8 flex justify-center gap-2 sm:gap-3 z-10">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                    <div
                        key={step}
                        className={`h-2 rounded-full transition-all duration-500 ${step === currentStep
                            ? 'w-6 sm:w-8 bg-dbt-primary'
                            : step < (currentStep as number)
                                ? 'w-2 bg-dbt-success'
                                : 'w-2 bg-dbt-surface'
                            }`}
                    />
                ))}
            </footer>
        </div>
    );
};