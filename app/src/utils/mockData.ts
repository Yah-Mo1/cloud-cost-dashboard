import {
  CostData,
  ServiceCost,
  MonthlyCost,
  DailyCost,
  CostSummary,
} from "../types/costData";

export const mockCostData: CostData[] = [
  // 2023 Data
  { date: "2023-01-15", service: "EC2", region: "us-east-1", cost: 950.5 },
  { date: "2023-01-20", service: "S3", region: "us-east-1", cost: 280.75 },
  { date: "2023-02-18", service: "Lambda", region: "us-west-2", cost: 65.25 },
  { date: "2023-02-25", service: "RDS", region: "eu-west-1", cost: 720.0 },
  { date: "2023-03-10", service: "CloudFront", region: "global", cost: 105.75 },
  { date: "2023-03-22", service: "EKS", region: "us-east-1", cost: 356.8 },
  {
    date: "2023-04-05",
    service: "ElastiCache",
    region: "us-west-2",
    cost: 184.5,
  },
  {
    date: "2023-04-18",
    service: "API Gateway",
    region: "us-east-1",
    cost: 47.3,
  },
  { date: "2023-05-12", service: "DynamoDB", region: "us-west-2", cost: 128.9 },
  { date: "2023-05-28", service: "CloudWatch", region: "global", cost: 75.4 },
  { date: "2023-06-08", service: "SNS", region: "eu-west-1", cost: 35.2 },
  { date: "2023-06-25", service: "SQS", region: "ap-southeast-1", cost: 22.15 },
  { date: "2023-07-14", service: "ECS", region: "us-east-1", cost: 245.8 },
  { date: "2023-07-30", service: "Route 53", region: "global", cost: 58.25 },
  { date: "2023-08-16", service: "Redshift", region: "us-east-1", cost: 467.3 },
  {
    date: "2023-08-29",
    service: "Elasticsearch",
    region: "eu-west-1",
    cost: 323.6,
  },
  { date: "2023-09-11", service: "EMR", region: "us-west-2", cost: 189.4 },
  { date: "2023-09-26", service: "Kinesis", region: "us-east-1", cost: 116.75 },
  {
    date: "2023-10-08",
    service: "CodePipeline",
    region: "us-west-2",
    cost: 69.9,
  },
  { date: "2023-10-24", service: "ELB", region: "us-east-1", cost: 194.15 },
  { date: "2023-11-13", service: "VPC", region: "global", cost: 115.8 },
  {
    date: "2023-11-27",
    service: "CloudFormation",
    region: "us-east-1",
    cost: 47.5,
  },
  { date: "2023-12-09", service: "IAM", region: "global", cost: 18.4 },
  {
    date: "2023-12-22",
    service: "Secrets Manager",
    region: "us-west-2",
    cost: 58.9,
  },

  // 2024 Data
  { date: "2024-01-15", service: "EC2", region: "us-east-1", cost: 1250.5 },
  { date: "2024-01-16", service: "S3", region: "us-east-1", cost: 320.75 },
  { date: "2024-01-18", service: "Lambda", region: "us-west-2", cost: 89.25 },
  { date: "2024-01-20", service: "RDS", region: "eu-west-1", cost: 890.0 },
  { date: "2024-01-22", service: "CloudFront", region: "global", cost: 125.75 },
  { date: "2024-01-25", service: "EKS", region: "us-east-1", cost: 456.8 },
  {
    date: "2024-01-28",
    service: "ElastiCache",
    region: "us-west-2",
    cost: 234.5,
  },

  { date: "2024-02-02", service: "EC2", region: "us-east-1", cost: 1180.25 },
  { date: "2024-02-05", service: "S3", region: "us-east-1", cost: 285.5 },
  {
    date: "2024-02-08",
    service: "API Gateway",
    region: "us-east-1",
    cost: 67.3,
  },
  { date: "2024-02-12", service: "DynamoDB", region: "us-west-2", cost: 178.9 },
  { date: "2024-02-15", service: "CloudWatch", region: "global", cost: 95.4 },
  { date: "2024-02-18", service: "SNS", region: "eu-west-1", cost: 45.2 },
  { date: "2024-02-22", service: "SQS", region: "ap-southeast-1", cost: 32.15 },

  { date: "2024-03-03", service: "EC2", region: "us-east-1", cost: 1350.0 },
  { date: "2024-03-07", service: "Lambda", region: "us-west-2", cost: 95.5 },
  { date: "2024-03-10", service: "ECS", region: "us-east-1", cost: 345.8 },
  { date: "2024-03-14", service: "Route 53", region: "global", cost: 78.25 },
  { date: "2024-03-18", service: "Redshift", region: "us-east-1", cost: 567.3 },
  {
    date: "2024-03-21",
    service: "Elasticsearch",
    region: "eu-west-1",
    cost: 423.6,
  },
  { date: "2024-03-25", service: "EMR", region: "us-west-2", cost: 289.4 },

  { date: "2024-04-02", service: "RDS", region: "eu-west-1", cost: 920.25 },
  { date: "2024-04-06", service: "EC2", region: "ap-southeast-1", cost: 780.5 },
  { date: "2024-04-09", service: "S3", region: "us-east-1", cost: 310.25 },
  { date: "2024-04-13", service: "Kinesis", region: "us-east-1", cost: 156.75 },
  {
    date: "2024-04-16",
    service: "CodePipeline",
    region: "us-west-2",
    cost: 89.9,
  },
  { date: "2024-04-20", service: "ELB", region: "us-east-1", cost: 234.15 },
  { date: "2024-04-24", service: "VPC", region: "global", cost: 145.8 },

  { date: "2024-05-01", service: "EC2", region: "us-east-1", cost: 1420.75 },
  {
    date: "2024-05-05",
    service: "CloudFormation",
    region: "us-east-1",
    cost: 67.5,
  },
  { date: "2024-05-08", service: "IAM", region: "global", cost: 23.4 },
  {
    date: "2024-05-12",
    service: "Secrets Manager",
    region: "us-west-2",
    cost: 78.9,
  },
  {
    date: "2024-05-15",
    service: "Systems Manager",
    region: "eu-west-1",
    cost: 45.6,
  },
  {
    date: "2024-05-19",
    service: "GuardDuty",
    region: "us-east-1",
    cost: 123.45,
  },
  { date: "2024-05-23", service: "CloudTrail", region: "global", cost: 89.7 },

  { date: "2024-06-01", service: "EC2", region: "us-east-1", cost: 1250.5 },
  { date: "2024-06-03", service: "S3", region: "us-east-1", cost: 320.75 },
  { date: "2024-06-05", service: "Lambda", region: "us-west-2", cost: 89.25 },
  { date: "2024-06-08", service: "RDS", region: "eu-west-1", cost: 890.0 },
  { date: "2024-06-10", service: "Glue", region: "us-east-1", cost: 234.8 },
  { date: "2024-06-12", service: "Athena", region: "us-west-2", cost: 167.3 },
  {
    date: "2024-06-15",
    service: "Step Functions",
    region: "us-east-1",
    cost: 89.6,
  },
  {
    date: "2024-06-18",
    service: "EventBridge",
    region: "eu-west-1",
    cost: 56.4,
  },
  { date: "2024-06-20", service: "MSK", region: "us-east-1", cost: 345.9 },
  {
    date: "2024-06-23",
    service: "DocumentDB",
    region: "ap-southeast-1",
    cost: 456.7,
  },

  // 2025 Data
  { date: "2025-01-10", service: "EC2", region: "us-east-1", cost: 1450.5 },
  { date: "2025-01-15", service: "S3", region: "us-east-1", cost: 380.75 },
  { date: "2025-01-20", service: "Lambda", region: "us-west-2", cost: 105.25 },
  { date: "2025-01-25", service: "RDS", region: "eu-west-1", cost: 950.0 },
  { date: "2025-02-05", service: "CloudFront", region: "global", cost: 145.75 },
  { date: "2025-02-10", service: "EKS", region: "us-east-1", cost: 520.8 },
  {
    date: "2025-02-15",
    service: "ElastiCache",
    region: "us-west-2",
    cost: 280.5,
  },
  {
    date: "2025-02-20",
    service: "API Gateway",
    region: "us-east-1",
    cost: 85.3,
  },
  { date: "2025-03-03", service: "DynamoDB", region: "us-west-2", cost: 210.9 },
  { date: "2025-03-08", service: "CloudWatch", region: "global", cost: 115.4 },
  { date: "2025-03-12", service: "SNS", region: "eu-west-1", cost: 55.2 },
  { date: "2025-03-18", service: "SQS", region: "ap-southeast-1", cost: 42.15 },
  { date: "2025-04-05", service: "ECS", region: "us-east-1", cost: 390.8 },
  { date: "2025-04-12", service: "Route 53", region: "global", cost: 88.25 },
  { date: "2025-04-18", service: "Redshift", region: "us-east-1", cost: 650.3 },
  {
    date: "2025-04-25",
    service: "Elasticsearch",
    region: "eu-west-1",
    cost: 480.6,
  },
  { date: "2025-05-08", service: "EMR", region: "us-west-2", cost: 340.4 },
  { date: "2025-05-15", service: "Kinesis", region: "us-east-1", cost: 185.75 },
  {
    date: "2025-05-22",
    service: "CodePipeline",
    region: "us-west-2",
    cost: 110.9,
  },
  { date: "2025-05-28", service: "ELB", region: "us-east-1", cost: 275.15 },
  { date: "2025-06-05", service: "VPC", region: "global", cost: 165.8 },
  {
    date: "2025-06-12",
    service: "CloudFormation",
    region: "us-east-1",
    cost: 85.5,
  },
  {
    date: "2025-06-18",
    service: "DocumentDB",
    region: "ap-southeast-1",
    cost: 520.7,
  },
  { date: "2025-06-25", service: "Glue", region: "us-east-1", cost: 290.8 },
];

export const serviceBreakdown: ServiceCost[] = [
  { service: "EC2", cost: 7561.25, percentage: 35.2 },
  { service: "RDS", cost: 3210.25, percentage: 15.0 },
  { service: "S3", cost: 2416.5, percentage: 11.3 },
  { service: "Lambda", cost: 1584.75, percentage: 7.4 },
  { service: "CloudFront", cost: 1251.25, percentage: 5.8 },
  { service: "EKS", cost: 1156.8, percentage: 5.4 },
  { service: "Redshift", cost: 967.3, percentage: 4.5 },
  { service: "ECS", cost: 845.8, percentage: 3.9 },
  { service: "Elasticsearch", cost: 723.6, percentage: 3.4 },
  { service: "DocumentDB", cost: 656.7, percentage: 3.1 },
  { service: "Others", cost: 1965.8, percentage: 9.0 },
];

// Extended monthly trend from January 2023 to June 2025
export const monthlyTrend: MonthlyCost[] = [
  { month: "Jan 2023", cost: 5200 },
  { month: "Feb 2023", cost: 5850 },
  { month: "Mar 2023", cost: 6100 },
  { month: "Apr 2023", cost: 6650 },
  { month: "May 2023", cost: 7200 },
  { month: "Jun 2023", cost: 7950 },
  { month: "Jul 2023", cost: 6200 },
  { month: "Aug 2023", cost: 6850 },
  { month: "Sep 2023", cost: 7100 },
  { month: "Oct 2023", cost: 7650 },
  { month: "Nov 2023", cost: 8200 },
  { month: "Dec 2023", cost: 8950 },
  { month: "Jan 2024", cost: 9150 },
  { month: "Feb 2024", cost: 8750 },
  { month: "Mar 2024", cost: 9250 },
  { month: "Apr 2024", cost: 9650 },
  { month: "May 2024", cost: 8420 },
  { month: "Jun 2024", cost: 8724 },
  { month: "Jul 2024", cost: 9200 },
  { month: "Aug 2024", cost: 9850 },
  { month: "Sep 2024", cost: 10100 },
  { month: "Oct 2024", cost: 10650 },
  { month: "Nov 2024", cost: 11200 },
  { month: "Dec 2024", cost: 11950 },
  { month: "Jan 2025", cost: 12150 },
  { month: "Feb 2025", cost: 11750 },
  { month: "Mar 2025", cost: 12250 },
  { month: "Apr 2025", cost: 12650 },
  { month: "May 2025", cost: 11420 },
  { month: "Jun 2025", cost: 11724 },
];

// Function to generate daily data for a specific month/year
export const getDailyDataForMonth = (month: string, year: string) => {
  const monthIndex = new Date(Date.parse(month + " 1, 2024")).getMonth();
  const daysInMonth = new Date(parseInt(year), monthIndex + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => ({
    date: `${month.substring(0, 3)} ${i + 1}`,
    cost: Math.floor(Math.random() * 500) + 200,
  }));
};

export const dailySpend: DailyCost[] = getDailyDataForMonth("June", "2024");

export const costSummary: CostSummary = {
  totalCostThisMonth: 8724.5,
  percentageChange: 3.6,
  topService: "EC2",
  topServiceCost: 4561.25,
};

// Function to generate filtered data based on filters
export const getFilteredData = (filters: {
  selectedMonth?: string;
  selectedYear?: string;
  selectedService?: string;
  selectedRegion?: string;
}) => {
  return mockCostData.filter((item) => {
    // Service filter
    if (
      filters.selectedService &&
      filters.selectedService !== "all" &&
      item.service !== filters.selectedService
    ) {
      return false;
    }
    // Region filter
    if (
      filters.selectedRegion &&
      filters.selectedRegion !== "all" &&
      item.region !== filters.selectedRegion
    ) {
      return false;
    }
    // Year filter
    if (filters.selectedYear && filters.selectedYear !== "all") {
      const itemYear = new Date(item.date).getFullYear();
      if (itemYear !== parseInt(filters.selectedYear)) {
        return false;
      }
    }
    // Month filter (must check year too if both are set)
    if (filters.selectedMonth && filters.selectedMonth !== "all") {
      const itemDate = new Date(item.date);
      const filterMonthIndex = new Date(
        Date.parse(filters.selectedMonth + " 1, 2024")
      ).getMonth();
      if (itemDate.getMonth() !== filterMonthIndex) {
        return false;
      }
    }
    return true;
  });
};

// Function to get service breakdown for filtered data
export const getServiceBreakdownForFilters = (filteredData: CostData[]) => {
  const serviceMap = new Map<string, number>();
  let totalCost = 0;

  filteredData.forEach((item) => {
    const currentCost = serviceMap.get(item.service) || 0;
    serviceMap.set(item.service, currentCost + item.cost);
    totalCost += item.cost;
  });

  const breakdown = Array.from(serviceMap.entries()).map(([service, cost]) => ({
    service,
    cost,
    percentage: Number(((cost / totalCost) * 100).toFixed(1)),
  }));

  return breakdown.sort((a, b) => b.cost - a.cost);
};

// Function to generate weekly cost summary for email reports
export const getWeeklyCostSummary = () => {
  const currentDate = new Date();
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay()); // Start of current week (Sunday)

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6); // End of current week (Saturday)

  // Filter data for current week
  const weekData = mockCostData.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= weekStart && itemDate <= weekEnd;
  });

  // Calculate total cost for the week
  const totalCost = weekData.reduce((sum, item) => sum + item.cost, 0);

  // Calculate cost change from previous week
  const prevWeekStart = new Date(weekStart);
  prevWeekStart.setDate(weekStart.getDate() - 7);
  const prevWeekEnd = new Date(prevWeekStart);
  prevWeekEnd.setDate(prevWeekStart.getDate() + 6);

  const prevWeekData = mockCostData.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= prevWeekStart && itemDate <= prevWeekEnd;
  });

  const prevWeekCost = prevWeekData.reduce((sum, item) => sum + item.cost, 0);
  const costChange = totalCost - prevWeekCost;
  const costChangePercent =
    prevWeekCost > 0 ? ((costChange / prevWeekCost) * 100).toFixed(1) : 0;

  // Get service breakdown for the week
  const serviceBreakdown = getServiceBreakdownForFilters(weekData);

  // Format dates
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const weekPeriod = `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;

  return {
    weekPeriod,
    totalCost: `$${totalCost.toFixed(2)}`,
    costChange:
      costChange >= 0
        ? `+$${costChange.toFixed(2)} (${costChangePercent}%)`
        : `-$${Math.abs(costChange).toFixed(2)} (${Math.abs(
            Number(costChangePercent)
          )}%)`,
    costChangeDirection: costChange >= 0 ? "increase" : "decrease",
    serviceBreakdown: serviceBreakdown.slice(0, 5), // Top 5 services
    reportDate: currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    dashboardUrl: window.location.origin,
    reportsUrl: `${window.location.origin}/reports`,
  };
};
