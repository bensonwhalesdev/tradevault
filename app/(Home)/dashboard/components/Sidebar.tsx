"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, BarChart3, Wallet, ArrowLeftRight, 
  History, Settings, LogOut, ChevronLeft, ChevronRight, Menu, X 
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Terminal", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Markets", icon: BarChart3, href: "/dashboard/markets" },
  { name: "Assets", icon: Wallet, href: "/dashboard/assets" },
  { name: "Exchange", icon: ArrowLeftRight, href: "/dashboard/exchange" },
  { name: "History", icon: History, href: "/dashboard/history" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavContent = ({ mobile = false }) => (
    <>
      {/* Logo Section */}
      <div className={cn("h-20 flex items-center mb-4", mobile ? "px-2" : "px-6")}>
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          {(!isCollapsed || mobile) && (
            <span className="text-xl font-bold tracking-tighter text-white">
              NEXA<span className="text-[#D4AF37]">TRADE</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} onClick={() => setIsMobileOpen(false)}>
              <div className={cn(
                  "group relative flex items-center h-12 rounded-xl transition-all duration-200",
                  isActive ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-gray-500 hover:bg-white/5 hover:text-white"
                )}>
                <div className="min-w-[56px] flex items-center justify-center">
                  <item.icon size={20} />
                </div>
                {(!isCollapsed || mobile) && <span className="text-sm font-semibold">{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/5 space-y-2">
        <Link href="/dashboard/settings" onClick={() => setIsMobileOpen(false)}>
          <div className="flex items-center h-12 rounded-xl text-gray-500 hover:bg-white/5 hover:text-white transition-all">
            <div className="min-w-[56px] flex items-center justify-center">
              <Settings size={20} />
            </div>
            {(!isCollapsed || mobile) && <span className="text-sm font-semibold">Settings</span>}
          </div>
        </Link>
        <button className="w-full flex items-center h-12 rounded-xl text-red-500/70 hover:bg-red-500/10 hover:text-red-500 transition-all">
          <div className="min-w-[56px] flex items-center justify-center">
            <LogOut size={20} />
          </div>
          {(!isCollapsed || mobile) && <span className="text-sm font-semibold">Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* --- MOBILE HEADER (Visible only on small screens) --- */}
      <div className="lg:hidden flex items-center justify-between h-14 p-4 bg-[#0B1210] border-b border-white/5 w-full sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={24} height={24} />
          <span className="text-lg font-bold text-white tracking-tighter">NEXA<span className="text-[#D4AF37]">TRADE</span></span>
        </div>
        <button onClick={() => setIsMobileOpen(true)} className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors">
          <Menu size={24} />
        </button>
      </div>

      {/* --- MOBILE DRAWER OVERLAY --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#0B1210] z-[70] flex flex-col lg:hidden border-r border-white/5"
            >
              <button onClick={() => setIsMobileOpen(false)} className="absolute top-6 right-4 text-gray-500 hover:text-white">
                <X size={24} />
              </button>
              <NavContent mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- DESKTOP SIDEBAR --- */}
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        className="relative h-screen bg-[#0B1210] border-r border-white/5 flex-col transition-all duration-300 ease-in-out hidden lg:flex"
      >
        <NavContent />
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-[#D4AF37] text-[#0B1210] rounded-full flex items-center justify-center shadow-lg border border-[#0B1210] z-10 hover:scale-110 transition-transform"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </motion.div>
    </>
  );
}