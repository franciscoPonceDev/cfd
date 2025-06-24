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

// Investment Management Store
export interface UserInvestment {
  id: string;
  investmentId: number; // Reference to the investment opportunity
  name: string;
  amount: number;
  expectedReturn: number;
  dueDate: string;
  category: string;
  investmentDate: Date;
  status: 'active' | 'completed' | 'cancelled';
}

export interface InvestmentState {
  userInvestments: UserInvestment[];
  addInvestment: (investment: Omit<UserInvestment, 'id' | 'investmentDate' | 'status'>) => void;
  getUserInvestments: () => UserInvestment[];
  getTotalInvested: () => number;
  getWeightedAverageReturn: () => number;
  getInvestmentById: (id: string) => UserInvestment | undefined;
}

// Initialize with existing mock investments but with proper structure
const initialInvestments: UserInvestment[] = [
  {
    id: 'INV-1',
    investmentId: 1,
    name: 'Fundo Imobiliário Comercial',
    amount: 5000, // Updated to match the initial transaction
    expectedReturn: 12.5,
    dueDate: '2025-12-31',
    category: 'Imóveis',
    investmentDate: new Date('2024-03-13T09:15:00'), // Match the initial transaction
    status: 'active',
  },
];

export const useInvestmentStore = create<InvestmentState>((set, get) => ({
  userInvestments: initialInvestments,
  
  addInvestment: (investment) => {
    const newInvestment: UserInvestment = {
      ...investment,
      id: `INV-${Date.now()}`,
      investmentDate: new Date(),
      status: 'active',
    };
    set((state) => ({
      userInvestments: [...state.userInvestments, newInvestment],
    }));
  },
  
  getUserInvestments: () => get().userInvestments,
  
  getTotalInvested: () => {
    return get().userInvestments
      .filter(inv => inv.status === 'active')
      .reduce((sum, inv) => sum + inv.amount, 0);
  },
  
  getWeightedAverageReturn: () => {
    const investments = get().userInvestments.filter(inv => inv.status === 'active');
    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
    
    if (totalInvested === 0) return 0;
    
    return investments.reduce(
      (sum, inv) => sum + (inv.amount * inv.expectedReturn), 0
    ) / totalInvested;
  },
  
  getInvestmentById: (id: string) => {
    return get().userInvestments.find(inv => inv.id === id);
  },
}));

// Investment opportunities data (this could be moved to a separate file)
export interface InvestmentOpportunity {
  id: number;
  title: string;
  risk: 'A' | 'B' | 'C' | 'D';
  type: string;
  instrument: string;
  yield: string;
  projectedYield?: string;
  term: string;
  payment: string;
  openingDate?: string;
  status?: string;
  maxTarget: string;
  minInvestment: number;
  unitPrice: number;
  image: any;
}

export const investmentOpportunities: InvestmentOpportunity[] = [
  {
    id: 1,
    title: 'Mortgage - Renda Fixa Imobiliária (EUA) - Fluxo irregular',
    risk: 'A',
    type: 'Renda fixa',
    instrument: 'Debênture',
    yield: 'Dólar + 7% a.a.',
    term: '48 meses',
    payment: 'Fluxo irregular',
    openingDate: 'Abertura em 18/06 às 13:00',
    maxTarget: 'R$ 5.900.000,00',
    minInvestment: 500,
    unitPrice: 500,
    image: require('../assets/investments1.jpg'),
  },
  {
    id: 2,
    title: 'Liv Primavera e Seleto Primavera - Parcelas Amortizadas - 36 meses',
    risk: 'B',
    type: 'Renda fixa',
    instrument: 'CCB',
    yield: '100% CDI + 6% a.a.',
    projectedYield: '21.12% a.a. | 148% do CDI',
    term: '36 meses',
    payment: 'Parcelas amortizadas',
    status: 'Captação esgotada',
    maxTarget: 'R$ 1.000.000,00',
    minInvestment: 1000,
    unitPrice: 1000,
    image: require('../assets/investments2.jpg'),
  },
];
