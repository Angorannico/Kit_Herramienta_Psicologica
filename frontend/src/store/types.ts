// Agregamos 'moderate_exit' como un paso valido en el enrutamiento
export type ProtocolStep = 1 | 2 | 3 | 4 | 5 | 6 | 'moderate_exit';
export type SudsLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | null;
export type AnxietyLevel = 'moderate' | 'high' | null;

export interface CrisisState {
    currentStep: ProtocolStep;
    preCrisisSuds: SudsLevel;
    postCrisisSuds: SudsLevel;
    crisisReason: string;
    aiValidationResponse: string;
    isLoadingAi: boolean;
    anxietyLevel: AnxietyLevel; // Nuevo campo

    nextStep: () => void;
    prevStep: () => void;
    resetProtocol: () => void;
    setStep: (step: ProtocolStep) => void; // Nueva funcion para saltos personalizados

    setPreCrisisSuds: (level: SudsLevel) => void;
    setPostCrisisSuds: (level: SudsLevel) => void;
    setCrisisReason: (reason: string) => void;
    setAiValidationResponse: (response: string) => void;
    setIsLoadingAi: (isLoading: boolean) => void;
    setAnxietyLevel: (level: AnxietyLevel) => void; // Nuevo mutador
}