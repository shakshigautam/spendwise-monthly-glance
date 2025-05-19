
import { useExpense } from '@/contexts/ExpenseContext';
import { getExpensesForMonth, getCategoryData } from '@/utils/expenseUtils';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Color array for pie chart segments
const COLORS = [
  '#7F56D9', // primary purple
  '#22C55E', // green
  '#3B82F6', // blue
  '#EF4444', // red
  '#F59E0B', // amber
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#10B981', // emerald
  '#6366F1', // indigo
  '#F97316', // orange
  '#A855F7', // purple
  '#14B8A6', // teal
];

export function CategoryPieChart() {
  const { expenses, selectedMonth, currency } = useExpense();
  const monthlyExpenses = getExpensesForMonth(expenses, selectedMonth);
  const categoryData = getCategoryData(monthlyExpenses);

  const currencySymbol = currency === 'INR' ? '₹' : '$';

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { category, amount, percentage } = payload[0].payload;
      return (
        <div className="bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border">
          <p className="font-medium">{category}</p>
          <p>{`${currencySymbol}${amount.toFixed(2)}`}</p>
          <p>{`${percentage.toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  if (categoryData.length === 0) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">No expenses to display</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={90}
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
