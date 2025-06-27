
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Filter } from 'lucide-react';

interface FilterBarProps {
  onFiltersApply?: (filters: {
    selectedMonth: string;
    selectedYear: string;
    selectedService: string;
    selectedRegion: string;
  }) => void;
}

const FilterBar = ({ onFiltersApply }: FilterBarProps) => {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const months = [
    'all', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = ['all'];
  for (let year = 2023; year <= 2025; year++) {
    years.push(year.toString());
  }

  const services = [
    'all', 'EC2', 'S3', 'Lambda', 'RDS', 'CloudFront', 'EKS', 'ElastiCache',
    'API Gateway', 'DynamoDB', 'CloudWatch', 'SNS', 'SQS', 'ECS', 'Route 53',
    'Redshift', 'Elasticsearch', 'EMR', 'Kinesis', 'CodePipeline', 'ELB', 'VPC',
    'CloudFormation', 'IAM', 'Secrets Manager', 'Systems Manager', 'GuardDuty',
    'CloudTrail', 'Glue', 'Athena', 'Step Functions', 'EventBridge', 'MSK', 'DocumentDB'
  ];
  
  const regions = ['all', 'us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1', 'global'];

  const handleApplyFilters = () => {
    if (onFiltersApply) {
      onFiltersApply({
        selectedMonth,
        selectedYear,
        selectedService,
        selectedRegion
      });
    }
    console.log('Filters applied:', { selectedMonth, selectedYear, selectedService, selectedRegion });
  };

  return (
    <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-slate-600 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filters:</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-slate-500" />
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              >
                {months.map(month => (
                  <option key={month} value={month}>
                    {month === 'all' ? 'All Months' : month}
                  </option>
                ))}
              </select>
              
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
            
            <select 
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              {services.map(service => (
                <option key={service} value={service}>
                  {service === 'all' ? 'All Services' : service}
                </option>
              ))}
            </select>
            
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="whitespace-nowrap"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterBar;
