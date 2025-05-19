
import { useExpense } from '@/contexts/ExpenseContext';
import { getMonthlyStats } from '@/utils/expenseUtils';
import { getMonthDisplayName } from '@/utils/dateUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ChartBarIcon, ChartLineUp, TrendingDown, TrendingUp } from 'lucide-react';

export function MonthlySummary() {
  const { expenses, selectedMonth, currency } = useExpense();
  const stats = getMonthlyStats(expenses, selectedMonth);
  const monthName = getMonthDisplayName(selectedMonth);
  
  const currencySymbol = currency === 'INR' ? '₹' : '$';

  // Format the stats for display
  const formattedTotal = `${currencySymbol}${stats.totalAmount.toFixed(2)}`;
  const formattedDifference = `${stats.difference >= 0 ? '+' : ''}${currencySymbol}${stats.difference.toFixed(2)}`;
  const formattedPercentChange = `${stats.percentChange >= 0 ? '+' : ''}${stats.percentChange.toFixed(1)}%`;
  const formattedTopCategoryAmount = `${currencySymbol}${stats.topCategoryAmount.toFixed(2)}`;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Spent</CardDescription>
          <CardTitle className="text-2xl">{formattedTotal}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            In {monthName}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Change vs Last Month</CardDescription>
          <CardTitle className="flex items-center text-2xl gap-2">
            {stats.difference >= 0 ? (
              <TrendingUp className="text-danger h-5 w-5" />
            ) : (
              <TrendingDown className="text-success h-5 w-5" />
            )}
            {formattedDifference}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-sm ${stats.difference >= 0 ? 'text-danger' : 'text-success'}`}>
            {formattedPercentChange} from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Top Category</CardDescription>
          <CardTitle className="text-2xl">{stats.topCategory || 'N/A'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {stats.topCategoryAmount > 0 ? `${formattedTopCategoryAmount} spent` : 'No expenses yet'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Daily Average</CardDescription>
          <CardTitle className="text-2xl">
            {stats.totalAmount > 0 
              ? `${currencySymbol}${(stats.totalAmount / 30).toFixed(2)}`
              : `${currencySymbol}0.00`
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Based on monthly total
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
