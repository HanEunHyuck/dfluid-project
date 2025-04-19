import { create } from "zustand";

interface filterState {
  activeTab: string;
  activeRange: number;
  setActiveTab: (tab: string) => void;
  setActiveRange: (range: number) => void;
}

export const useFilterStore = create<filterState>((set) => ({
  activeTab: "",
  activeRange: 0,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setActiveRange: (range) => set({ activeRange: range }),
}));
