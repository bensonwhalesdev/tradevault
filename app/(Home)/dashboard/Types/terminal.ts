export interface Wallet {
  fiatBalance: number;
  frozenBalance: number;
  currency: string;
}

export interface Order {
  id: string;
  assetSymbol: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT';
  status: 'OPEN' | 'FILLED' | 'CANCELLED';
  quantity: number;
  price: number;
  createdAt: string;
}

export interface Asset {
  id: string;
  assetSymbol: string;
  quantity: number;
  avgCost: number;
}

export interface TradingData {
  wallet: Wallet;
  portfolio: Asset[];
  openOrders: Order[];
  tradeHistory: Order[];
}