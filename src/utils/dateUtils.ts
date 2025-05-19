
import { format, subMonths, startOfMonth, endOfMonth, parse, isValid } from 'date-fns';

export const getCurrentMonth = (): string => {
  return format(new Date(), 'yyyy-MM');
};

export const getPreviousMonth = (currentMonth: string): string => {
  const currentDate = parse(currentMonth, 'yyyy-MM', new Date());
  if (!isValid(currentDate)) {
    return format(subMonths(new Date(), 1), 'yyyy-MM');
  }
  return format(subMonths(currentDate, 1), 'yyyy-MM');
};

export const getMonthDisplayName = (monthStr: string): string => {
  const date = parse(monthStr, 'yyyy-MM', new Date());
  if (!isValid(date)) return '';
  return format(date, 'MMMM yyyy');
};

export const getMonthRange = (monthStr: string): { start: Date, end: Date } => {
  const date = parse(monthStr, 'yyyy-MM', new Date());
  if (!isValid(date)) {
    const today = new Date();
    return {
      start: startOfMonth(today),
      end: endOfMonth(today)
    };
  }
  
  return {
    start: startOfMonth(date),
    end: endOfMonth(date)
  };
};

export const getLast12Months = (): string[] => {
  const months: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < 12; i++) {
    const date = subMonths(today, i);
    months.unshift(format(date, 'yyyy-MM'));
  }
  
  return months;
};

export const formatDateForDisplay = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const formatDateForInput = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};
