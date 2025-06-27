
export interface CostData {
  date: string;
  service: string;
  region: string;
  cost: number;
}

export interface ServiceCost {
  service: string;
  cost: number;
  percentage: number;
}

export interface MonthlyCost {
  month: string;
  cost: number;
}

export interface DailyCost {
  date: string;
  cost: number;
}

export interface CostSummary {
  totalCostThisMonth: number;
  percentageChange: number;
  topService: string;
  topServiceCost: number;
}
