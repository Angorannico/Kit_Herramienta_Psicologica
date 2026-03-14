// Archivo: src/store/useCrisisStore.ts

import { create } from 'zustand';
import type { CrisisState, ProtocolStep } from './types';

export const useCrisisStore = create<CrisisState>((set) => ({
  currentStep: 1,
  preCrisisSuds: null,
  postCrisisSuds: null,
  crisisReason: '',
  aiValidationResponse: '',
  isLoadingAi: false,
  anxietyLevel: null,

  nextStep: () => set((state) => {
    if (typeof state.currentStep === 'number' && state.currentStep < 6) {
      return { currentStep: (state.currentStep + 1) as ProtocolStep };
    }
    return state;
  }),

  prevStep: () => set((state) => {
    if (typeof state.currentStep === 'number' && state.currentStep > 1) {
      return { currentStep: (state.currentStep - 1) as ProtocolStep };
    }
    return state;
  }),

  // Permite forzar la navegacion a una pantalla especifica (ej. moderate_exit)
  setStep: (step) => set({ currentStep: step }),

  resetProtocol: () => set({
    currentStep: 1,
    preCrisisSuds: null,
    postCrisisSuds: null,
    crisisReason: '',
    aiValidationResponse: '',
    isLoadingAi: false,
    anxietyLevel: null,
  }),

  setPreCrisisSuds: (level) => set({ preCrisisSuds: level }),
  setPostCrisisSuds: (level) => set({ postCrisisSuds: level }),
  setCrisisReason: (reason) => set({ crisisReason: reason }),
  setAiValidationResponse: (response) => set({ aiValidationResponse: response }),
  setIsLoadingAi: (isLoading) => set({ isLoadingAi: isLoading }),
  setAnxietyLevel: (level) => set({ anxietyLevel: level }),
}));