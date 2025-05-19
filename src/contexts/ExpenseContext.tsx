
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Expense, Currency } from '@/types';
import { loadExpenses, saveExpenses } from '@/utils/storageUtils';
import { toast } from 'sonner';

interface ExpenseContextType {
  expenses: Expense[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  categories: string[];
}

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Travel',
  'Personal Care',
  'Gifts/Donations',
  'Other'
];

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
  );
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    const loadedExpenses = loadExpenses();
    setExpenses(loadedExpenses);
  }, []);

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: crypto.randomUUID()
    };
    
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    toast.success('Expense added successfully');
  };

  const updateExpense = (updatedExpense: Expense) => {
    const updatedExpenses = expenses.map(expense => 
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    toast.success('Expense updated successfully');
  };

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    toast.success('Expense deleted successfully');
  };

  const value = {
    expenses,
    selectedMonth,
    setSelectedMonth,
    currency,
    setCurrency,
    addExpense,
    updateExpense,
    deleteExpense,
    categories: EXPENSE_CATEGORIES
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}
