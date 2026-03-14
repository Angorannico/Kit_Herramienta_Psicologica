
// Implementacion del store de Zustand para manejar la sesion de crisis.

import { create } from 'zustand';
import type { CrisisState, ProtocolStep } from './types';

export const useCrisisStore = create<CrisisState>((set) => ({
  // Estado Inicial
  currentStep: 1,
  preCrisisSuds: null,
  postCrisisSuds: null,
  crisisReason: '',
  aiValidationResponse: '',
  isLoadingAi: false,

  // Logica de Navegacion Segura
  nextStep: () => set((state) => {
    if (state.currentStep < 6) {
      return { currentStep: (state.currentStep + 1) as ProtocolStep };
    }
    return state;
  }),

  prevStep: () => set((state) => {
    if (state.currentStep > 1) {
      return { currentStep: (state.currentStep - 1) as ProtocolStep };
    }
    return state;
  }),

  // Reinicio total en caso de finalizar o abortar (Clean Slate)
  resetProtocol: () => set({
    currentStep: 1,
    preCrisisSuds: null,
    postCrisisSuds: null,
    crisisReason: '',
    aiValidationResponse: '',
    isLoadingAi: false,
  }),

  // Mutadores de Datos Clinicos
  setPreCrisisSuds: (level) => set({ preCrisisSuds: level }),
  setPostCrisisSuds: (level) => set({ postCrisisSuds: level }),
  setCrisisReason: (reason) => set({ crisisReason: reason }),
  setAiValidationResponse: (response) => set({ aiValidationResponse: response }),
  setIsLoadingAi: (isLoading) => set({ isLoadingAi: isLoading }),
}));