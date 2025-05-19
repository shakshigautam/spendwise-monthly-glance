
import { useExpense } from '@/contexts/ExpenseContext';
import { getMonthlyData } from '@/utils/expenseUtils';
import { getLast12Months, getMonthDisplayName } from '@/utils/dateUtils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function MonthlyBarChart() {
  const { expenses, currency } = useExpense();
  const last12Months = getLast12Months();
  const monthlyData = getMonthlyData(expenses, last12Months);

  // Format the data for display
  const formattedData = monthlyData.map(item => ({
    ...item,
    month: getMonthDisplayName(item.month).substring(0, 3),
  }));

  const currencySymbol = currency === 'INR' ? '₹' : '$';

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            dataKey="month" 
            tick={{ fontSize: 12 }}
            tickMargin={8}
          />
          <YAxis 
            tickFormatter={(value) => `${currencySymbol}${value}`}
            tick={{ fontSize: 12 }}
            width={60}
          />
          <Tooltip 
            formatter={(value: number) => [`${currencySymbol}${value.toFixed(2)}`, 'Total']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar 
            dataKey="totalAmount" 
            name="Total Amount" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
