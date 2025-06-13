import { create } from 'zustand';

// Transaction types
export type TransactionType = 'deposit' | 'withdrawal' | 'investment' | 'return';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
  accountDetails?: {
    bank?: string;
    accountNumber?: string;
    agency?: string;
  };
}

export interface FundsState {
  availableFunds: number;
  addFunds: (amount: number) => void;
  withdrawFunds: (amount: number) => void;
  getFundsFormatted: () => string;
}

export interface TransactionsState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  getTransactions: () => Transaction[];
  getTransactionsByType: (type: TransactionType) => Transaction[];
  getTransactionsByDateRange: (startDate: Date, endDate: Date) => Transaction[];
}

// Initial transactions to match initial funds state
const initialTransactions: Transaction[] = [
  {
    id: 'TXN-1',
    type: 'deposit',
    amount: 15000,
    description: 'Depósito Inicial',
    date: new Date('2024-03-10T10:00:00'),
    status: 'completed',
    paymentMethod: 'Transferência Bancária',
  },
  {
    id: 'TXN-2',
    type: 'withdrawal',
    amount: 2500,
    description: 'Saque',
    date: new Date('2024-03-12T14:30:00'),
    status: 'completed',
    paymentMethod: 'Transferência Bancária',
    accountDetails: {
      bank: 'Nubank',
      accountNumber: '1234-5',
      agency: '0001',
    },
  },
  {
    id: 'TXN-3',
    type: 'investment',
    amount: 5000,
    description: 'Investimento em Fundo Imobiliário',
    date: new Date('2024-03-13T09:15:00'),
    status: 'completed',
    paymentMethod: 'Aplicação Direta',
  },
  {
    id: 'TXN-4',
    type: 'return',
    amount: 250,
    description: 'Retorno de Investimento',
    date: new Date('2024-03-14T16:45:00'),
    status: 'completed',
    paymentMethod: 'Rendimento',
  },
];

export const useFundsStore = create<FundsState>((set, get) => ({
  availableFunds: 12750.0,
  addFunds: (amount) => set((state) => ({ availableFunds: state.availableFunds + amount })),
  withdrawFunds: (amount) => set((state) => ({ availableFunds: state.availableFunds - amount })),
  getFundsFormatted: () => {
    const funds = get().availableFunds;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(funds);
  },
}));

export const useTransactionsStore = create<TransactionsState>((set, get) => ({
  transactions: initialTransactions,
  addTransaction: (transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `TXN-${Date.now()}`,
      date: new Date(),
    };
    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
    }));
  },
  getTransactions: () => get().transactions,
  getTransactionsByType: (type) => get().transactions.filter((t) => t.type === type),
  getTransactionsByDateRange: (startDate, endDate) =>
    get().transactions.filter((t) => t.date >= startDate && t.date <= endDate),
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

export interface BankAccount {
  id: string;
  bank: string;
  accountNumber: string;
  agency: string;
  type: string;
}

export interface BankAccountsState {
  accounts: BankAccount[];
  getAccounts: () => BankAccount[];
  getAccountById: (id: string) => BankAccount | undefined;
}

// Utility function for currency formatting
export const formatCurrency = (value: number | string): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericValue);
};

export const useBankAccountsStore = create<BankAccountsState>((set, get) => ({
  accounts: [
    {
      id: '1',
      bank: 'Nubank',
      accountNumber: '1234-5',
      agency: '0001',
      type: 'Conta Corrente',
    },
    {
      id: '2',
      bank: 'Itaú',
      accountNumber: '5678-9',
      agency: '0002',
      type: 'Conta Corrente',
    },
    {
      id: '3',
      bank: 'Bradesco',
      accountNumber: '9012-3',
      agency: '0003',
      type: 'Conta Poupança',
    },
  ],
  getAccounts: () => get().accounts,
  getAccountById: (id: string) => get().accounts.find((account) => account.id === id),
}));
