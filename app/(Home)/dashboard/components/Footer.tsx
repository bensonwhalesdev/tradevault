"use client";

import React from "react";
import Link from "next/link";
import { 
  Wifi, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  Server,
  Globe
} from "lucide-react";

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1210] border-t border-white/5 px-6 py-3">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Section: System Status */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Live Market Feed
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-gray-500">
            <Server size={14} />
            <span className="text-[10px] font-medium uppercase tracking-wider">
              US-EAST-1 Node
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-gray-500">
            <Wifi size={14} className="text-[#D4AF37]" />
            <span className="text-[10px] font-medium uppercase tracking-wider">
              Latency: 18ms
            </span>
          </div>
        </div>

        {/* Center Section: Copyright (Optional) */}
        <div className="hidden lg:block">
          <p className="text-[10px] text-gray-600 font-medium uppercase tracking-widest">
            &copy; {currentYear} NexaTrade Global • Institutional Access
          </p>
        </div>

        {/* Right Section: Support & Security */}
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-4">
            <Link 
              href="/support" 
              className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
            >
              <HelpCircle size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Support</span>
            </Link>
            
            <Link 
              href="/terms" 
              className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
            >
              <ShieldCheck size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Legal</span>
            </Link>
          </nav>

          <div className="h-4 w-[1px] bg-white/10" />

          <div className="flex items-center gap-2 text-gray-400">
            <Globe size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">UTC-5</span>
          </div>
        </div>
      </div>
    </footer>
  );
}