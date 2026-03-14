
// Definicion de tipos estrictos para el estado global de la crisis DBT.

// Definimos los pasos exactos permitidos para evitar estados invalidos.
export type ProtocolStep = 1 | 2 | 3 | 4 | 5 | 6;

// Nivel de ansiedad medido en la escala Subjective Units of Distress Scale (SUDS) de 1 a 10.
export type SudsLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null;

export interface CrisisState {
    // Variables de Estado Clinico
    currentStep: ProtocolStep;
    preCrisisSuds: SudsLevel;
    postCrisisSuds: SudsLevel;
    crisisReason: string;
    aiValidationResponse: string;
    isLoadingAi: boolean;

    // Acciones de Navegacion
    nextStep: () => void;
    prevStep: () => void;
    resetProtocol: () => void;

    // Acciones de Mutacion de Datos
    setPreCrisisSuds: (level: SudsLevel) => void;
    setPostCrisisSuds: (level: SudsLevel) => void;
    setCrisisReason: (reason: string) => void;
    setAiValidationResponse: (response: string) => void;
    setIsLoadingAi: (isLoading: boolean) => void;
}