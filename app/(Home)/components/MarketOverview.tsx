"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

const marketData = [
  { symbol: "BTC", name: "Bitcoin", price: "67,234.50", change: "+2.34", isUp: true, volume: "24.5B" },
  { symbol: "ETH", name: "Ethereum", price: "3,456.78", change: "+1.87", isUp: true, volume: "12.3B" },
  { symbol: "SOL", name: "Solana", price: "178.92", change: "-0.54", isUp: false, volume: "3.2B" },
  { symbol: "XRP", name: "Ripple", price: "0.6234", change: "+4.21", isUp: true, volume: "2.1B" },
  { symbol: "ADA", name: "Cardano", price: "0.4512", change: "-1.23", isUp: false, volume: "890M" },
  { symbol: "DOT", name: "Polkadot", price: "7.234", change: "+0.89", isUp: true, volume: "456M" },
];

const cryptoColors: Record<string, string> = {
  BTC: "from-amber-400 to-orange-500",
  ETH: "from-blue-400 to-purple-500",
  SOL: "from-purple-400 to-pink-500",
  XRP: "from-slate-400 to-slate-600",
  ADA: "from-blue-500 to-cyan-400",
  DOT: "from-pink-400 to-rose-500",
};

const MarketOverview = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Live Market Prices</h2>
            <p className="text-muted-foreground">Real-time cryptocurrency market data</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Live updates</span>
          </div>
        </div>

        {/* Market Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Asset</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Price (USD)</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">24h Change</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground hidden md:table-cell">Volume</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>

              <tbody>
                {marketData.map((coin) => (
                  <tr
                    key={coin.symbol}
                    className="border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${cryptoColors[coin.symbol]} flex items-center justify-center text-sm font-bold text-background`}
                        >
                          {coin.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{coin.name}</div>
                          <div className="text-sm text-muted-foreground">{coin.symbol}</div>
                        </div>
                      </div>
                    </td>

                    <td className="text-right py-4 px-6">
                      <span className="font-mono text-foreground">${coin.price}</span>
                    </td>

                    <td className="text-right py-4 px-6">
                      <div
                        className={`inline-flex items-center gap-1 font-mono ${
                          coin.isUp ? "text-success" : "text-destructive"
                        }`}
                      >
                        {coin.isUp ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {coin.change}%
                      </div>
                    </td>

                    <td className="text-right py-4 px-6 hidden md:table-cell">
                      <span className="font-mono text-muted-foreground">${coin.volume}</span>
                    </td>

                    <td className="text-right py-4 px-6">
                      <button className="px-4 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;
