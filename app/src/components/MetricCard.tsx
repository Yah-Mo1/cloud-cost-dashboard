
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  subtitle?: string;
}

const MetricCard = ({ title, value, change, subtitle }: MetricCardProps) => {
  return (
    <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {value}
        </div>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            {subtitle}
          </p>
        )}
        {change !== undefined && (
          <div className={`flex items-center text-sm ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change >= 0 ? (
              <ArrowUpIcon size={16} className="mr-1" />
            ) : (
              <ArrowDownIcon size={16} className="mr-1" />
            )}
            {Math.abs(change)}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
