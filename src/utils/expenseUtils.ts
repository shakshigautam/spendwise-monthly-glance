
import { CategoryData, DailyData, Expense, MonthData, MonthlyStats } from '@/types';
import { format, isWithinInterval, parse } from 'date-fns';
import { getMonthRange, getPreviousMonth } from './dateUtils';

export const getExpensesForMonth = (expenses: Expense[], month: string): Expense[] => {
  const { start, end } = getMonthRange(month);
  
  return expenses.filter(expense => 
    isWithinInterval(new Date(expense.date), { start, end })
  );
};

export const getCategoryData = (expenses: Expense[]): CategoryData[] => {
  const categoryMap: Record<string, number> = {};
  let totalAmount = 0;
  
  expenses.forEach(expense => {
    categoryMap[expense.category] = (categoryMap[expense.category] || 0) + expense.amount;
    totalAmount += expense.amount;
  });
  
  return Object.entries(categoryMap).map(([category, amount]) => ({
    category,
    amount,
    percentage: totalAmount > 0 ? (amount / totalAmount) * 100 : 0
  })).sort((a, b) => b.amount - a.amount);
};

export const getMonthlyData = (expenses: Expense[], last12Months: string[]): MonthData[] => {
  return last12Months.map(month => {
    const monthExpenses = getExpensesForMonth(expenses, month);
    const totalAmount = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      month,
      totalAmount
    };
  });
};

export const getDailyData = (expenses: Expense[], month: string): DailyData[] => {
  const { start, end } = getMonthRange(month);
  const dailyData: Record<string, number> = {};
  
  // Initialize all days in the month with zero
  let currentDate = new Date(start);
  while (currentDate <= end) {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    dailyData[dateStr] = 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Sum expenses for each day
  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);
    if (isWithinInterval(expenseDate, { start, end })) {
      const dateStr = format(expenseDate, 'yyyy-MM-dd');
      dailyData[dateStr] = (dailyData[dateStr] || 0) + expense.amount;
    }
  });
  
  // Convert to array format for charts
  return Object.entries(dailyData).map(([date, amount]) => ({
    date,
    amount
  })).sort((a, b) => a.date.localeCompare(b.date));
};

export const getMonthlyStats = (expenses: Expense[], currentMonth: string): MonthlyStats => {
  const currentMonthExpenses = getExpensesForMonth(expenses, currentMonth);
  const totalAmount = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const previousMonth = getPreviousMonth(currentMonth);
  const prevMonthExpenses = getExpensesForMonth(expenses, previousMonth);
  const previousMonthAmount = prevMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const difference = totalAmount - previousMonthAmount;
  const percentChange = previousMonthAmount !== 0 
    ? (difference / previousMonthAmount) * 100 
    : totalAmount > 0 ? 100 : 0;
  
  const categoryData = getCategoryData(currentMonthExpenses);
  const topCategory = categoryData.length > 0 ? categoryData[0].category : 'N/A';
  const topCategoryAmount = categoryData.length > 0 ? categoryData[0].amount : 0;
  
  return {
    totalAmount,
    previousMonthAmount,
    difference,
    percentChange,
    topCategory,
    topCategoryAmount
  };
};

export const formatCurrency = (amount: number, currency: string): string => {
  if (currency === 'INR') {
    return `₹${amount.toFixed(2)}`;
  }
  return `$${amount.toFixed(2)}`;
};
