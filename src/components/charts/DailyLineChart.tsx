
import { useExpense } from '@/contexts/ExpenseContext';
import { getExpensesForMonth, getDailyData } from '@/utils/expenseUtils';
import { format, parse } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DailyLineChart() {
  const { expenses, selectedMonth, currency } = useExpense();
  const monthlyExpenses = getExpensesForMonth(expenses, selectedMonth);
  const dailyData = getDailyData(monthlyExpenses, selectedMonth);

  const currencySymbol = currency === 'INR' ? '₹' : '$';

  // Format dates for display
  const formattedData = dailyData.map(item => ({
    ...item,
    formattedDate: format(parse(item.date, 'yyyy-MM-dd', new Date()), 'dd')
  }));

  if (dailyData.length === 0 || !dailyData.some(day => day.amount > 0)) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">No daily expenses to display</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="formattedDate" 
            tick={{ fontSize: 12 }}
            tickMargin={8}
            interval="preserveStartEnd"
          />
          <YAxis 
            tickFormatter={(value) => `${currencySymbol}${value}`}
            tick={{ fontSize: 12 }}
            width={60}
          />
          <Tooltip 
            formatter={(value: number) => [`${currencySymbol}${value.toFixed(2)}`, 'Amount']}
            labelFormatter={(value) => {
              const day = dailyData.find(d => format(parse(d.date, 'yyyy-MM-dd', new Date()), 'dd') === value);
              return day ? format(parse(day.date, 'yyyy-MM-dd', new Date()), 'MMM dd, yyyy') : '';
            }}
          />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
