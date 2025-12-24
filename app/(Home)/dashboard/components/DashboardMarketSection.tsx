"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, History, BarChart2, Star } from "lucide-react";

type Asset = {
  symbol: string;
  name: string;
  price: number;
  change: number;
};

export default function DashboardMarketSection() {
  const [watchlist, setWatchlist] = useState<Asset[]>([]);
  const [gainers, setGainers] = useState<Asset[]>([]);
  const [losers, setLosers] = useState<Asset[]>([]);

  const fetchMarketData = async () => {
    try {
      /* ------------------ CRYPTO ------------------ */
      const cryptoRes = await axios.get( "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            ids: "bitcoin,ethereum,solana",
          },
        }
      );

      const crypto = cryptoRes.data.map((c: any) => ({
        symbol: c.symbol.toUpperCase(),
        name: c.name,
        price: c.current_price,
        change: c.price_change_percentage_24h,
      }));

      /* ------------------ STOCKS & FOREX (Server-side) ------------------ */
      const marketRes = await axios.get("/api/market?type=all");
      const { stocks = [], forex = [] } = marketRes.data;

      /* ------------------ MERGE ------------------ */
      const allAssets = [...crypto, ...stocks, ...forex];

      setWatchlist(allAssets.slice(0, 5));

      setGainers(
        [...allAssets].sort((a, b) => b.change - a.change).slice(0, 4)
      );

      setLosers([...allAssets].sort((a, b) => a.change - b.change).slice(0, 4));
    } catch (err) {
      console.error("Market fetch failed", err);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
      {/* WATCHLIST */}
      <Card title="Watchlist" icon={<Star size={18} className="text-[#D4AF37]" />} >
        {watchlist.map((asset) => (
          <Row key={asset.symbol}>
            <div>
              <p className="font-bold text-white">{asset.symbol}</p>
              <p className="text-[10px] text-slate-500 uppercase">{asset.name} </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-white text-sm">${asset.price.toLocaleString()}</p>
              <Change value={asset.change} />
            </div>
          </Row>
        ))}
      </Card>

      {/* TOP MOVERS */}
      <Card title="Top Movers" icon={<BarChart2 size={18} className="text-[#D4AF37]" />} >
        <div className="grid grid-cols-2 gap-3">
          {gainers.map((asset) => ( <MiniCard key={asset.symbol} asset={asset} positive /> ))}
          {losers.map((asset) => ( <MiniCard key={asset.symbol} asset={asset} /> ))}
        </div>
      </Card>

      {/* ACTIVITY */}
      <Card title="Activity" icon={<History size={18} className="text-[#D4AF37]" />} >
        <Transaction title="Bought BTC" date="Dec 22, 2024" amount="- $6,420" />
        <Transaction title="Sold AAPL" date="Dec 21, 2024" amount="+ $1,765" positive />
      </Card>
    </section>
  );
}

/* ------------------ UI COMPONENTS (UNCHANGED) ------------------ */

const Card = ({ title, icon, children }: any) => (
  <div className="bg-[#0B1210] border border-white/5 rounded-[2.5rem] p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-white font-bold text-lg">{title}</h3>
      <div className="p-2 rounded-xl bg-white/5">{icon}</div>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const Row = ({ children }: any) => (
  <div className="flex justify-between bg-white/5 border border-white/5 rounded-2xl p-4">
    {children}
  </div>
);

const Change = ({ value }: { value: number }) => (
  <div
    className={`flex items-center gap-1 text-[11px] font-bold ${ value >= 0 ? "text-emerald-400" : "text-rose-400" }`} >
    {value >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
    {value.toFixed(2)}%
  </div>
);

const MiniCard = ({ asset, positive }: any) => (
  <div
    className={`rounded-2xl p-4 border ${
      positive
        ? "bg-emerald-500/5 border-emerald-500/10"
        : "bg-rose-500/5 border-rose-500/10"
    }`}
  >
    <div className="flex justify-between mb-1">
      <p className="font-bold text-white">{asset.symbol}</p>
      {positive ? (
        <ArrowUpRight size={14} className="text-emerald-400" />
      ) : (
        <ArrowDownRight size={14} className="text-rose-400" />
      )}
    </div>
    <p className="text-[10px] text-slate-500 uppercase">{asset.name}</p>
    <Change value={asset.change} />
  </div>
);

const Transaction = ({ title, date, amount, positive }: any) => (
  <div className="flex justify-between bg-white/5 rounded-2xl p-4">
    <div>
      <p className="text-white font-bold text-sm">{title}</p>
      <p className="text-[10px] text-slate-500">{date}</p>
    </div>
    <p className={positive ? "text-emerald-400" : "text-white"}>{amount}</p>
  </div>
);
