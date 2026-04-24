import { create } from "zustand";

export const useSelections = create((set) => ({
    carat: 1,
    shape: "R",
    shankType: 120,
    shankMetal: "W",
    headType: "4P",
    headMetal: "W",
    
    updateField: (key, value) => set({ [key] : value }),
}));