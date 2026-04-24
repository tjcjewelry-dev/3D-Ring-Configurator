import { create } from "zustand";

export const useSceneReady = create((set) => ({
    ready: false,
    loadedKeys: new Set(),
    setReady: (val) => set({ ready: val }),
    markLoaded: (key) => set((s) => ({
        loadedKeys: new Set([...s.loadedKeys, key])
    })),
    isLoaded: (key) => useSceneReady.getState().loadedKeys.has(key),
}));