
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CostData } from '../types/costData';
import ExportButton from './ExportButton';

interface DataTableProps {
  data: CostData[];
  title?: string;
}

const DataTable = ({ data, title = "Cost Data" }: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof CostData>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const itemsPerPage = 10;

  // Filter data based on search term
  const filteredData = data.filter(item => 
    item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.includes(searchTerm)
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    const aStr = String(aValue);
    const bStr = String(bValue);
    return sortDirection === 'asc' 
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });

  // Paginate data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (field: keyof CostData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
            {title}
          </CardTitle>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="Search by service or region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            />
            <ExportButton data={sortedData} filename="cost-report" type="csv" />
            <ExportButton data={sortedData} filename="cost-report" type="pdf" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
                  onClick={() => handleSort('date')}
                >
                  Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
                  onClick={() => handleSort('service')}
                >
                  Service {sortField === 'service' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
                  onClick={() => handleSort('region')}
                >
                  Region {sortField === 'region' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 text-right"
                  onClick={() => handleSort('cost')}
                >
                  Cost {sortField === 'cost' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell>{item.service}</TableCell>
                  <TableCell>{item.region}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${item.cost.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
