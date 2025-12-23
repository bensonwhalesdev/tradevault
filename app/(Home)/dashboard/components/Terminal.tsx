"use client";

import { TrendingUp, Wallet as WalletIcon, BarChart3, ArrowUpRight, ArrowLeftRight,Loader2, AlertCircle,
} from "lucide-react";
import { AreaChart, Area, XAxis,YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, } from "recharts";
import { Button } from "@/components/ui/button";
import { useWallet } from "../Hooks/useWallet";

// Scoped Sub-component for stats
const StatCard = ({ icon: Icon, label, value, subtext, colorClass }: any) => (
  <div className="bg-[#0f172a] border border-white/5 p-5 rounded-2xl flex items-center gap-4 transition-all hover:border-[#D4AF37]/30">
    <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
      <Icon size={20} />
    </div>
    <div className="overflow-hidden">
      <p className="text-slate-400 text-sm font-medium truncate">{label}</p>
      <p className="text-white text-xl font-bold">{value}</p>
      {subtext && (
        <p className="text-emerald-500 text-xs mt-1 font-medium">{subtext}</p>
      )}
    </div>
  </div>
);

export default function InvestmentDashboard() {
  const { wallet, isLoading, error } = useWallet();

  // 1. Loading State
  if (isLoading)
    return (
      <div className="min-h-screen bg-[#0B1210] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#D4AF37]" size={48} />
        <p className="text-slate-400 animate-pulse font-medium">
          Syncing Portfolio...
        </p>
      </div>
    );

  // 2. Error or Null Wallet State (Fixes the "undefined" crash)
  if (error || !wallet)
    return (
      <div className="min-h-screen bg-[#0B1210] p-8 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center max-w-md">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">
            Account Not Initialized
          </h3>
          <p className="text-slate-400 mb-6">
            {error
              ? "We couldn't connect to the server."
              : "We couldn't find a wallet associated with your account."}
          </p>
          <Button className="bg-[#D4AF37] text-[#0B1210] font-bold px-8">
            Initialize Wallet
          </Button>
        </div>
      </div>
    );

  // 3. Main Render (Safely accessed)
  return (
    <div className="min-h-screen bg-[#0B1210] p-4 md:p-8 text-white font-sans max-w-[1600px] mx-auto">
      {/* 1. Hero Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/5 bg-[#0B1210] p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="z-10">
          <h1 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-widest">
            Total Portfolio Value
          </h1>
          <div className="flex items-baseline gap-4">
            <span className="text-4xl md:text-6xl font-black tracking-tighter">
              $
              {(wallet.totalValue || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-500 mt-4 font-bold">
            <TrendingUp size={20} />
            <span>
              +${(wallet.dailyChange || 0).toLocaleString()} (+
              {wallet.dailyChangePercent || 0}%)
              <span className="text-slate-500 font-normal ml-1">today</span>
            </span>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto z-10">
          <Button className="flex-1 md:flex-none bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-bold py-3 px-10 rounded-md transition-transform active:scale-95 cursor-pointer">
            Deposit
          </Button>
          <Button
            className="flex-1 md:flex-none bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-bold py-3 px-10 rounded-md cursor-pointer"
          >
            Withdraw
          </Button>
        </div>
      </div>

      {/* 2. Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard
          icon={WalletIcon}
          label="Cash Balance"
          value={`$${(wallet.fiatBalance || 0).toLocaleString()}`}
          colorClass="text-emerald-500"
        />
        <StatCard
          icon={BarChart3}
          label="Total Invested"
          value={`$${(wallet.totalInvested || 0).toLocaleString()}`}
          colorClass="text-blue-500"
        />
        <StatCard
          icon={ArrowUpRight}
          label="This Month"
          value={`+$${(wallet.monthlyProfit || 0).toLocaleString()}`}
          subtext="+7.4%"
          colorClass="text-[#D4AF37]"
        />
        <StatCard
          icon={ArrowLeftRight}
          label="Trades Today"
          value={wallet.tradesToday || 0}
          colorClass="text-purple-500"
        />
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-[#0B1210] border border-white/5 p-6 md:p-8 rounded-3xl">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            Portfolio Performance{" "}
            <span className="text-xs font-normal text-slate-500 px-2 py-1 bg-white/5 rounded-full">
              LIVE
            </span>
          </h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wallet.performanceHistory || []}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="#475569"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <YAxis
                  stroke="#475569"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0B1210",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                  }}
                  itemStyle={{ color: "#D4AF37" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#D4AF37"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation Chart */}
        <div className="bg-[#0B1210] border border-white/5 p-6 md:p-8 rounded-3xl flex flex-col">
          <h2 className="text-xl font-bold mb-8 text-[#D4AF37]">
            Asset Allocation
          </h2>
          <div className="flex-1 flex flex-col justify-around">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={(wallet.assetAllocation || []).map((item) => ({
                      ...item,
                    }))}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {(wallet.assetAllocation || []).map(
                      (entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      )
                    )}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3 mt-6">
              {(wallet.assetAllocation || []).map((item: any) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center text-sm group hover:bg-white/5 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-400 font-medium">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-bold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
