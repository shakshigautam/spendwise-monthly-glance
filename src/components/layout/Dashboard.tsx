
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MonthlySummary } from '@/components/MonthlySummary';
import { ExpenseList } from '@/components/ExpenseList';
import { MonthComparison } from '@/components/MonthComparison';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MonthlyBarChart } from '@/components/charts/MonthlyBarChart';
import { CategoryPieChart } from '@/components/charts/CategoryPieChart';
import { DailyLineChart } from '@/components/charts/DailyLineChart';

export function Dashboard() {
  return (
    <div className="container py-6 space-y-8">
      {/* Monthly Summary */}
      <MonthlySummary />
      
      {/* Tabs for different views */}
      <Tabs defaultValue="expenses" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>
        
        {/* Expenses Tab */}
        <TabsContent value="expenses" className="pt-6">
          <ExpenseList />
        </TabsContent>
        
        {/* Charts Tab */}
        <TabsContent value="charts" className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Totals</CardTitle>
                <CardDescription>Total expenses for the past 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <MonthlyBarChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Spending by category for the current month</CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryPieChart />
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Daily Spending Trend</CardTitle>
                <CardDescription>Spending pattern within the current month</CardDescription>
              </CardHeader>
              <CardContent>
                <DailyLineChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Comparison Tab */}
        <TabsContent value="comparison" className="pt-6">
          <MonthComparison />
        </TabsContent>
      </Tabs>
    </div>
  );
}
