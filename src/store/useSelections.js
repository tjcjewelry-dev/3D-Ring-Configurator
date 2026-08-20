import { create } from "zustand";

export const useSelections = create((set, get) => ({
    initialized: false,

    parentName: null,
    carat: null,
    shape: null,
    shankType: null,
    shankMetal: null,
    headType: null,
    headMetal: null,
    quiltMetal: null,
    viewMatchingBand: null,
    
    updateField: (key, value) => set({ [key] : value }),
    toggleMatchingBandView: () => set({ viewMatchingBand: !get().viewMatchingBand }),
    updateStack: (stack) => set({
        ...stack,
        initialized: true
    }),
}));