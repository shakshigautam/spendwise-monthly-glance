
import { useExpense } from '@/contexts/ExpenseContext';
import { getExpensesForMonth, getCategoryData } from '@/utils/expenseUtils';
import { getMonthDisplayName, getPreviousMonth } from '@/utils/dateUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';

export function MonthComparison() {
  const { expenses, selectedMonth, currency } = useExpense();
  const previousMonth = getPreviousMonth(selectedMonth);
  
  const currentMonthExpenses = getExpensesForMonth(expenses, selectedMonth);
  const previousMonthExpenses = getExpensesForMonth(expenses, previousMonth);
  
  const currentTotal = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const previousTotal = previousMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const currentCategories = getCategoryData(currentMonthExpenses);
  const previousCategories = getCategoryData(previousMonthExpenses);
  
  // Find the category with the biggest change
  let biggestChange = { category: 'N/A', amount: 0 };
  
  if (currentCategories.length > 0 && previousCategories.length > 0) {
    const categoryChanges = currentCategories.map(current => {
      const previous = previousCategories.find(p => p.category === current.category);
      const previousAmount = previous ? previous.amount : 0;
      const change = current.amount - previousAmount;
      
      return {
        category: current.category,
        amount: change
      };
    });
    
    // Also check categories that existed before but not now
    previousCategories.forEach(previous => {
      const exists = currentCategories.some(c => c.category === previous.category);
      if (!exists) {
        categoryChanges.push({
          category: previous.category,
          amount: -previous.amount
        });
      }
    });
    
    // Find the biggest absolute change
    biggestChange = categoryChanges.reduce((biggest, current) => 
      Math.abs(current.amount) > Math.abs(biggest.amount) ? current : biggest, 
      { category: 'N/A', amount: 0 }
    );
  }
  
  const currencySymbol = currency === 'INR' ? '₹' : '$';
  
  const currentMonthName = getMonthDisplayName(selectedMonth);
  const previousMonthName = getMonthDisplayName(previousMonth);
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Month-to-Month Comparison</CardTitle>
          <CardDescription>
            Compare spending between {currentMonthName} and {previousMonthName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Current Month */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Current Month</h4>
                <p className="text-2xl font-bold">{currentMonthName}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Spent</h4>
                <p className="text-2xl font-bold">{`${currencySymbol}${currentTotal.toFixed(2)}`}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Top Category</h4>
                <p className="text-xl font-bold">
                  {currentCategories.length > 0 
                    ? `${currentCategories[0].category} (${currencySymbol}${currentCategories[0].amount.toFixed(2)})`
                    : 'No expenses'
                  }
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Expense Count</h4>
                <p className="text-xl font-bold">{currentMonthExpenses.length} expenses</p>
              </div>
            </div>
            
            {/* Previous Month */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Previous Month</h4>
                <p className="text-2xl font-bold">{previousMonthName}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Spent</h4>
                <p className="text-2xl font-bold">{`${currencySymbol}${previousTotal.toFixed(2)}`}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Top Category</h4>
                <p className="text-xl font-bold">
                  {previousCategories.length > 0 
                    ? `${previousCategories[0].category} (${currencySymbol}${previousCategories[0].amount.toFixed(2)})`
                    : 'No expenses'
                  }
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Expense Count</h4>
                <p className="text-xl font-bold">{previousMonthExpenses.length} expenses</p>
              </div>
            </div>
          </div>
          
          {/* Biggest Change */}
          <div className="mt-6 p-4 border rounded-md">
            <h4 className="text-sm font-medium mb-2">Biggest Category Change</h4>
            {biggestChange.category !== 'N/A' ? (
              <div className="flex items-center">
                <div className="mr-2">
                  {biggestChange.amount > 0 ? (
                    <TrendingUp className="text-danger h-5 w-5" />
                  ) : (
                    <TrendingDown className="text-success h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{biggestChange.category}</p>
                  <p className={biggestChange.amount > 0 ? 'text-danger' : 'text-success'}>
                    {biggestChange.amount > 0 ? '+' : ''}
                    {`${currencySymbol}${biggestChange.amount.toFixed(2)}`}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Not enough data to compare</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
