
export interface Expense {
  id: string;
  date: Date;
  amount: number;
  category: string;
  notes?: string;
}

export interface MonthData {
  month: string; // e.g. "2023-05" (YYYY-MM format)
  totalAmount: number;
}

export interface CategoryData {
  category: string;
  amount: number;
  percentage: number;
}

export interface DailyData {
  date: string;
  amount: number;
}

export interface MonthlyStats {
  totalAmount: number;
  previousMonthAmount: number;
  difference: number;
  percentChange: number;
  topCategory: string;
  topCategoryAmount: number;
}

export type Currency = "INR" | "USD";
