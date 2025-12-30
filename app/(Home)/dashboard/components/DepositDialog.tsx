"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wallet, Info, ArrowRight } from "lucide-react";

export function DepositDialog() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");

  const handleRedirect = () => {
    if (!amount || Number(amount) < 200) return;
    const params = new URLSearchParams({
      amount: amount,
      crypto: selectedCrypto
    });
    router.push(`/payment?${params.toString()}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-black rounded-md transition-all active:scale-95 cursor-pointer">
          Deposit
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-[#1a1f2e] border-white/10 text-white max-w-md rounded-[2rem] outline-none">
        <DialogHeader>
          <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
            <Wallet className="text-[#D4AF37]" size={24} />
          </div>
          <DialogTitle className="text-2xl font-bold text-white">
            Add funds to balance
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm mt-2">
            Once you click <span className="text-white font-semibold">Add Funds</span> below, you’ll be redirected to a page showing the wallet address for your selected cryptocurrency.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37]">Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
              <Input 
                type="number" 
                placeholder="0.00" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-[#0B1210] border-white/5 border-2 h-14 pl-8 rounded-xl text-lg font-bold focus-visible:border-[#D4AF37]/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37]">Select Asset</label>
            <Select onValueChange={setSelectedCrypto} defaultValue="BTC">
              <SelectTrigger className="bg-[#0B1210] border-white/5 border-2 h-14 rounded-xl text-white font-medium">
                <SelectValue placeholder="BTC" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1f2e] border-white/10 text-white rounded-xl">
                <SelectItem value="BTC">BTC</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="SOL">SOL</SelectItem>
                <SelectItem value="BNB">BNB</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="XRP">XRP</SelectItem>
                <SelectItem value="LTC">LTC</SelectItem>
                <SelectItem value="DOGE">DOGE</SelectItem>
                <SelectItem value="ETH Polygon">ETH Polygon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-[#0B1210] border border-[#D4AF37]/20 p-4 rounded-2xl flex items-start gap-3">
            <Info className="text-[#D4AF37] shrink-0 mt-0.5" size={18} />
            <div className="space-y-1">
              <p className="text-xs font-bold text-white">Minimum amount is $200</p>
              <p className="text-[11px] text-slate-500">
                After sending your crypto, the funds will appear on your balance within a few minutes.
              </p>
            </div>
          </div>

          <Button 
            disabled={!amount || Number(amount) < 200}
            onClick={handleRedirect}
            className="w-full bg-[#D4AF37] hover:bg-[#C5A030] disabled:bg-white/5 disabled:text-slate-500 text-[#0B1210] font-black rounded-md flex items-center justify-center gap-2 text-md cursor-pointer">
            Add Funds
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}