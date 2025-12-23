export interface PerformancePoint {
  name: string;
  value: number;
}

export interface AssetAllocation {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

export interface WalletData {
  id: string;
  fiatBalance: number;
  totalValue: number;
  totalInvested: number;
  dailyChange: number;
  dailyChangePercent: number;
  monthlyProfit: number;
  tradesToday: number;
  currency: string;
  performanceHistory: PerformancePoint[];
  assetAllocation: AssetAllocation[];
}

export interface GetWalletResponse {
  wallet: WalletData;
}
