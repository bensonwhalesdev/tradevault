"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Wallet,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  CircleDollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMe } from "../Hooks/useMe";

const menuItems = [
  { name: "Terminal", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Markets", icon: BarChart3, href: "/dashboard/markets" },
  { name: "Assets", icon: Wallet, href: "/dashboard/assets" },
  { name: "Loan", icon: CircleDollarSign, href: "/dashboard/exchange" },
  { name: "History", icon: History, href: "/dashboard/history" },
];

export default function HeaderBar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useMe();

  // Common Nav Link Component
  const NavItem = ({
    item,
    isMobile = false,
  }: {
    item: any;
    isMobile?: boolean;
  }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        key={item.name}
        href={item.href}
        onClick={() => setIsMobileOpen(false)}
        className={cn(
          "flex items-center gap-3 rounded-xl transition-all duration-200",
          isMobile ? "h-12 px-4" : "h-10 px-3",
          isActive
            ? "bg-[#D4AF37]/10 text-[#D4AF37]"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        )}
      >
        <item.icon size={isMobile ? 20 : 18} />
        <span className="text-sm font-semibold">{item.name}</span>
      </Link>
    );
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0B1210] border-b border-white/5 z-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-3 shrink-0">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <span className="text-xl font-bold tracking-tighter text-white">
              NEXA<span className="text-[#D4AF37]">TRADE</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-4 border-l border-white/10 pl-4 ml-2">
            {user?.fullName && (
              <span className="text-sm text-gray-400 whitespace-nowrap">
                Hi,{" "}
                <span className="text-white font-semibold">
                  {user.fullName}
                </span>
              </span>
            )}

            <Link href="/dashboard/settings" title="Settings">
              <div className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings size={20} />
              </div>
            </Link>

            <button className="p-2 text-red-500/70 hover:bg-red-500/10 hover:text-red-500 rounded-md transition-colors">
              Logout
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" />

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#0B1210] z-[70] flex flex-col lg:hidden border-r border-white/5 p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Image src="/logo.png" alt="Logo" width={28} height={28} />
                  <span className="font-bold text-white">NEXATRADE</span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="text-gray-500 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile User Greeting */}
              {user?.fullName && (
                <div className="mb-6 pb-6 border-b border-white/5">
                  <span className="text-sm text-gray-400">
                    Hi,{" "}
                    <span className="text-white font-semibold">
                      {user.fullName}
                    </span>
                  </span>
                </div>
              )}

              {/* Mobile Links */}
              <nav className="flex-1">
                {menuItems.map((item) => (
                  <NavItem key={item.name} item={item} isMobile />
                ))}
              </nav>

              {/* Mobile Footer */}
              <div className="border-t border-white/5 space-y-2">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <div className="flex items-center h-12 px-4 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white">
                    <Settings size={20} className="mr-3" />
                    <span className="text-sm font-semibold">Settings</span>
                  </div>
                </Link>

                <button className="w-full flex items-center h-12 px-4 rounded-xl text-red-500/70 hover:bg-red-500/10 hover:text-red-500">
                  <LogOut size={20} className="mr-3" />
                  <span className="text-sm font-semibold">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
