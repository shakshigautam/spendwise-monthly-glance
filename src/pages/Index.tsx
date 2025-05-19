
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ExpenseProvider } from '@/contexts/ExpenseContext';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/layout/Dashboard';

export default function Index() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Dashboard />
          </main>
        </div>
      </ExpenseProvider>
    </ThemeProvider>
  );
}
