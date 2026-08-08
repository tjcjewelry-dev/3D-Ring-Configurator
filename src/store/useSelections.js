import { create } from "zustand";

export const useSelections = create((set, get) => ({
    styleNo: null,
    carat: 1,
    shape: "R",
    shankType: 150,
    shankMetal: "W",
    headType: "4P",
    headMetal: "W",
    quiltMetal: "W",
    viewMatchingBand: false,
    
    updateField: (key, value) => set({ [key] : value }),
    toggleMatchingBandView: () => set({ viewMatchingBand: !get().viewMatchingBand }),
    setStyleNo: (value) => set({ styleNo: value })
}));