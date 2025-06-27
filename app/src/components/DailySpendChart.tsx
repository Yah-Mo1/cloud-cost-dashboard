
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LineChart from './charts/LineChart';
import { getDailyDataForMonth } from '../utils/mockData';

const DailySpendChart = () => {
  const [selectedMonth, setSelectedMonth] = useState('June');
  const [selectedYear, setSelectedYear] = useState('2024');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = ['2023', '2024', '2025'];

  const dailyData = getDailyDataForMonth(selectedMonth, selectedYear);

  return (
    <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
            Daily Spend - {selectedMonth} {selectedYear}
          </CardTitle>
          <div className="flex gap-2">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <LineChart data={dailyData} />
      </CardContent>
    </Card>
  );
};

export default DailySpendChart;
