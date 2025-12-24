"use client";

import {
  TrendingUp,
  Wallet as WalletIcon,
  BarChart3,
  ArrowUpRight,
  ArrowLeftRight,
  Loader2,
  AlertCircle,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useWallet } from "../Hooks/useWallet";
import { useMe } from "../Hooks/useMe";

// Custom Stat Card matching the image's compact style
const StatCard = ({ icon: Icon, label, value, subtext, colorClass }: any) => (
  <div className="bg-[#1a1f2e] border border-white/5 p-4 rounded-2xl flex items-center gap-4 transition-all hover:border-[#D4AF37]/30 group">
    <div
      className={`p-2.5 rounded-xl ${colorClass} bg-opacity-20 group-hover:scale-110 transition-transform`}
    >
      <Icon size={18} />
    </div>
    <div className="overflow-hidden">
      <p className="text-slate-400 text-xs font-medium truncate uppercase tracking-wider">
        {label}
      </p>
      <p className="text-white text-lg font-bold">{value}</p>
      {subtext && (
        <p className="text-emerald-500 text-[10px] mt-0.5 font-bold">
          {subtext}
        </p>
      )}
    </div>
  </div>
);

export default function InvestmentDashboard() {
  const { wallet, isLoading, error } = useWallet();
  const { user } = useMe();

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#0B1210] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#D4AF37]" size={48} />
        <p className="text-slate-400 animate-pulse font-medium">
          Syncing Portfolio...
        </p>
      </div>
    );

  if (error || !wallet)
    return (
      <div className="min-h-screen bg-[#0B1210] p-8 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center max-w-md">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">
            Account Not Initialized
          </h3>
          <Button className="bg-[#D4AF37] text-[#0B1210] font-bold mt-4 px-8">
            Initialize Wallet
          </Button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0B1210] p-4 md:p-8 text-white font-sans max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* 1. Top Section: Total Portfolio & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#1a1f2e] border border-white/5 p-6 rounded-[2.5rem] relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest opacity-70">
              Total Portfolio Value
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-5xl font-black tracking-tighter text-white">
                {user?.fullName}{" "}
                <span className="text-[#D4AF37]">Portfolio</span>
              </span>
            </div>

            {/* Action Buttons Integrated into Top Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              <StatCard
                icon={WalletIcon}
                label="Balance"
                value={`$${(wallet.fiatBalance || 0).toLocaleString()}`}
                colorClass="text-blue-400"
              />
              <StatCard
                icon={BarChart3}
                label="Invested"
                value={`$${(wallet.totalInvested || 0).toLocaleString()}`}
                colorClass="text-blue-500"
              />
              <StatCard
                icon={TrendingUp}
                label="Value"
                value={`$0`}
                colorClass="text-emerald-400"
              />
              <StatCard
                icon={ArrowLeftRight}
                label="Trades"
                value={`+0%`}
                colorClass="text-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Right Action Card */}
        <div className="bg-[#1a1f2e] border border-white/5 p-6 rounded-[2.5rem] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-bold">Cash Balance</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="bg-[#D4AF37]/20 p-2 rounded-lg text-[#D4AF37]">
                  <WalletIcon size={16} />
                </div>
                <span className="text-xl font-bold">${wallet.fiatBalance}</span>
              </div>
            </div>
            <Share2 className="text-slate-500 cursor-pointer" size={20} />
          </div>
          <div className="flex gap-2 mt-6">
            <Button className="flex-1 bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-black rounded-md cursor-pointer">
              Deposit
            </Button>
            <Button className="flex-1 bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-black rounded-md cursor-pointer">
              Withdraw
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Bar Chart */}
        <div className="lg:col-span-2 bg-[#1a1f2e] border border-white/5 p-6 md:p-10 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-black text-white">
                  Portfolio Performance
                </h2>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-emerald-400/20 text-emerald-400 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-bold">
                  <TrendingUp size={14} /> Trending Up
                </span>
                <span className="text-slate-400 text-xs font-medium">
                  +$0 today
                </span>
              </div>
            </div>
            <MoreHorizontal className="text-slate-500" />
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={wallet.performanceHistory || []}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                />
                <YAxis
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  cursor={{ fill: "rgba(212, 175, 55, 0.05)" }}
                  contentStyle={{
                    backgroundColor: "#0B1210",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                  itemStyle={{ color: "#D4AF37" }}
                />
                <Bar
                  dataKey="value"
                  fill="#D4AF37"
                  radius={[6, 6, 0, 0]}
                  barSize={24}
                  animationDuration={1500}
                  animationBegin={200}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation Column */}
        <div className="space-y-6">
          <div className="bg-[#1a1f2e] border border-white/5 p-8 rounded-[2.5rem]">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold text-[#D4AF37]">
                Asset Allocation
              </h2>
              <MoreHorizontal className="text-slate-500" size={18} />
            </div>
            <div className="h-[200px] w-full relative">
              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-white text-xl font-black">Cash</span>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wallet.assetAllocation || []}
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {(wallet.assetAllocation || []).map(
                      (entry: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.color || (index === 0 ? "#4ade80" : "#3b82f6")
                          }
                        />
                      )
                    )}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#1a1f2e] border border-white/5 p-8 rounded-[2.5rem]">
            <div className="h-[150px] w-full relative">
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-slate-500 text-[10px] uppercase font-bold">
                  Profit Value
                </span>
                <span className="text-white text-lg font-black">$0</span>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ value: 70 }, { value: 30 }]}
                    innerRadius={50}
                    outerRadius={65}
                    startAngle={90}
                    endAngle={450}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="#4ade80" />
                    <Cell fill="#D4AF37" opacity={0.3} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
