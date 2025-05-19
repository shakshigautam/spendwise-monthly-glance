
import { ThemeToggle } from '@/components/ThemeToggle';
import { CurrencyToggle } from '@/components/CurrencyToggle';
import { MonthSelector } from '@/components/MonthSelector';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExpenseForm } from '@/components/ExpenseForm';
import { useState } from 'react';

export function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Expense Tracker</h1>
        </div>
        <div className="hidden md:flex items-center justify-center flex-1">
          <MonthSelector />
        </div>
        <div className="flex items-center gap-4">
          <CurrencyToggle />
          <ThemeToggle />
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Expense</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <ExpenseForm onComplete={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="md:hidden container pb-4">
        <MonthSelector />
      </div>
    </header>
  );
}
