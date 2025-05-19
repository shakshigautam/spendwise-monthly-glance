
import { useExpense } from '@/contexts/ExpenseContext';
import { getMonthDisplayName, getLast12Months } from '@/utils/dateUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function MonthSelector() {
  const { selectedMonth, setSelectedMonth } = useExpense();
  const last12Months = getLast12Months();

  const currentMonthIndex = last12Months.indexOf(selectedMonth);

  const handlePreviousMonth = () => {
    if (currentMonthIndex > 0) {
      setSelectedMonth(last12Months[currentMonthIndex - 1]);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < last12Months.length - 1) {
      setSelectedMonth(last12Months[currentMonthIndex + 1]);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handlePreviousMonth}
        disabled={currentMonthIndex === 0}
        aria-label="Previous month"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Select
        value={selectedMonth}
        onValueChange={setSelectedMonth}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue>{getMonthDisplayName(selectedMonth)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {last12Months.map((month) => (
            <SelectItem key={month} value={month}>
              {getMonthDisplayName(month)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handleNextMonth}
        disabled={currentMonthIndex === last12Months.length - 1}
        aria-label="Next month"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
