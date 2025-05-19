
import { Expense } from '@/types';

const STORAGE_KEY = 'expense-tracker-data';

export const saveExpenses = (expenses: Expense[]): void => {
  try {
    const serializedExpenses = JSON.stringify(expenses);
    localStorage.setItem(STORAGE_KEY, serializedExpenses);
  } catch (error) {
    console.error('Error saving expenses to localStorage:', error);
  }
};

export const loadExpenses = (): Expense[] => {
  try {
    const serializedExpenses = localStorage.getItem(STORAGE_KEY);
    if (!serializedExpenses) return [];
    
    const expenses = JSON.parse(serializedExpenses);
    
    // Convert string dates back to Date objects
    return expenses.map((expense: any) => ({
      ...expense,
      date: new Date(expense.date)
    }));
  } catch (error) {
    console.error('Error loading expenses from localStorage:', error);
    return [];
  }
};
