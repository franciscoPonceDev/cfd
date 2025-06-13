import { create } from 'zustand';

export interface FundsState {
  availableFunds: number;
  addFunds: (amount: number) => void;
  getFundsFormatted: () => string;
}

export const useFundsStore = create<FundsState>((set, get) => ({
  availableFunds: 12500.00, // Starting with R$ 12.500,00 as shown in the UI
  addFunds: (amount) => set((state) => ({ availableFunds: state.availableFunds + amount })),
  getFundsFormatted: () => {
    const funds = get().availableFunds;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(funds);
  },
}));

// Legacy bear store (keeping for compatibility if needed elsewhere)
export interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

export const useStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
