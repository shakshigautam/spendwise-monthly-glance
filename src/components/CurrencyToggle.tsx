
import { useExpense } from '@/contexts/ExpenseContext';
import { Button } from './ui/button';
import { DollarSign, IndianRupee } from 'lucide-react';

export function CurrencyToggle() {
  const { currency, setCurrency } = useExpense();

  const toggleCurrency = () => {
    setCurrency(currency === 'USD' ? 'INR' : 'USD');
  };

  return (
    <Button 
      variant="outline"
      size="sm"
      onClick={toggleCurrency}
      className="flex items-center gap-2"
      aria-label={`Switch to ${currency === 'USD' ? 'Indian Rupees' : 'US Dollars'}`}
    >
      {currency === 'USD' ? (
        <>
          <DollarSign className="h-4 w-4" />
          <span>USD</span>
        </>
      ) : (
        <>
          <IndianRupee className="h-4 w-4" />
          <span>INR</span>
        </>
      )}
    </Button>
  );
}
