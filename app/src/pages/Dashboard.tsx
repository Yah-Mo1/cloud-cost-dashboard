import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MetricCard from "../components/MetricCard";
import PieChart from "../components/charts/PieChart";
import BarChart from "../components/charts/BarChart";
import FilterBar from "../components/FilterBar";
import DailySpendChart from "../components/DailySpendChart";
import ExportButton from "../components/ExportButton";
import {
  costSummary,
  serviceBreakdown,
  monthlyTrend,
  getFilteredData,
  getServiceBreakdownForFilters,
} from "../utils/mockData";
import { useSettings } from "../contexts/SettingsContext";
import { formatCurrency } from "../utils/currencyUtils";
import { Download } from "lucide-react";
import { exportReport } from "../utils/exportUtils";

const Dashboard = () => {
  const { currency, defaultExportFormat } = useSettings();
  const [filteredData, setFilteredData] = useState(getFilteredData({}));
  const [filteredServiceBreakdown, setFilteredServiceBreakdown] =
    useState(serviceBreakdown);

  const handleFiltersApply = (filters: any) => {
    const newFilteredData = getFilteredData(filters);
    const newServiceBreakdown = getServiceBreakdownForFilters(newFilteredData);

    setFilteredData(newFilteredData);
    setFilteredServiceBreakdown(newServiceBreakdown);

    console.log("Filters applied, data updated:", newFilteredData);
    console.log("Service breakdown updated:", newServiceBreakdown);
  };

  const handleExportReport = () => {
    exportReport(defaultExportFormat);
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Cost This Month"
          value={formatCurrency(costSummary.totalCostThisMonth, currency)}
          change={costSummary.percentageChange}
        />
        <MetricCard
          title="Top Service"
          value={costSummary.topService}
          subtitle={formatCurrency(costSummary.topServiceCost, currency)}
        />
        <MetricCard
          title="Active Services"
          value="5"
          subtitle="EC2, S3, Lambda, RDS, CloudFront"
        />
        <MetricCard
          title="Average Daily Spend"
          value={formatCurrency(291, currency)}
          subtitle="Based on current month"
        />
      </div>

      {/* Filters */}
      <FilterBar onFiltersApply={handleFiltersApply} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Cost by Service
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={filteredServiceBreakdown} />
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Monthly Spend Trend (Jan 2023 - Jun 2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={monthlyTrend} />
          </CardContent>
        </Card>
      </div>

      {/* Daily Spend Chart with Month Filter */}
      <DailySpendChart />

      {/* Call to Action Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Ready to export your cost report?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Download your report in seconds as{" "}
                {defaultExportFormat.toUpperCase()} format.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6"
              onClick={handleExportReport}
            >
              <Download size={20} className="mr-2" />
              Export Report Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
