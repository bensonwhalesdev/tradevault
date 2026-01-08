"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LockKeyhole, Clock, AlertCircle, CalendarDays } from "lucide-react";

export function WithdrawDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-black rounded-md cursor-pointer">
          Withdraw
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#1a1f2e] border-white/10 text-white max-w-md rounded-md outline-none shadow-2xl">
        <DialogHeader className="flex flex-col items-center text-center">
          {/* Visual Icon Header */}
          <div className="relative mb-4">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20">
              <LockKeyhole className="text-[#D4AF37]" size={36} />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#0B1210] p-1.5 rounded-full border border-white/5">
              <Clock className="text-amber-500" size={16} />
            </div>
          </div>

          <DialogTitle className="text-2xl font-black tracking-tight text-white">
            Withdrawal Restricted
          </DialogTitle>
          
          <div className="mt-4 p-4 bg-[#0B1210] rounded-2xl border border-white/5 w-full">
            <DialogDescription className="text-slate-400 text-sm leading-relaxed">
              To ensure platform stability and prevent market manipulation, funds cannot be withdrawn until after <span className="text-white font-bold">60 days</span> of your first deposit.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Progress/Policy Detail */}
          <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="p-2 bg-white/5 rounded-lg">
                <CalendarDays size={20} className="text-slate-400" />
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Lock-in Period</p>
                <p className="text-sm font-bold text-white">60 Calendar Days</p>
            </div>
          </div>

          <div className="flex items-start gap-3 px-2">
            <AlertCircle className="text-[#D4AF37] shrink-0 mt-0.5" size={14} />
            <p className="text-[11px] text-slate-500">
              Your assets remain fully invested and will continue to accrue profits during this period.
            </p>
          </div>
        </div>

        {/* <DialogFooter className="sm:justify-center">
          <Button 
            className="w-full bg-white/5 hover:bg-white/10 text-white font-bold h-12 rounded-xl transition-all"
            onClick={(e) => {
                // Logic to close dialog or acknowledge
            }}
          >
            I Understand
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}