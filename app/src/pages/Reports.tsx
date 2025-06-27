
import { useState } from 'react';
import DataTable from '../components/DataTable';
import FilterBar from '../components/FilterBar';
import { mockCostData, getFilteredData } from '../utils/mockData';
import { useSettings } from '../contexts/SettingsContext';

const Reports = () => {
  const { currency } = useSettings();
  const [filteredData, setFilteredData] = useState(mockCostData);

  const handleFiltersApply = (filters: any) => {
    const newFilteredData = getFilteredData(filters);
    setFilteredData(newFilteredData);
    console.log('Reports filters applied, data updated:', newFilteredData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Cost Reports
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Detailed breakdown of your cloud spending with export options
        </p>
      </div>

      <FilterBar onFiltersApply={handleFiltersApply} />

      <DataTable 
        data={filteredData} 
        title="Detailed Cost Breakdown"
      />
    </div>
  );
};

export default Reports;
