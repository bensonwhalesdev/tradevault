"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, ArrowLeft, ShieldCheck, Clock, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMe } from "../../dashboard/Hooks/useMe";
import { ProofOfPaymentModal } from "./ProveOfPaymentModal";

const wallets: Record<string, string> = {
  BTC: "bc1qtv94d9vv5udvu0nh8aejty95k3ygnf79gqzc0y",
  ETH: "0xe73364bcbD1c79286437E42E32cFD2892B2e2c09",
  SOL: "J32FHVLK3UNfMCoPYunH8WxiEb6FRPM3yBtCLp1WDCnx",
  BNB: "0xe73364bcbD1c79286437E42E32cFD2892B2e2c09",
  USDT: "0xe73364bcbD1c79286437E42E32cFD2892B2e2c09",
  USDC: "0xe73364bcbD1c79286437E42E32cFD2892B2e2c09",
  XRP: "rGPeL3Q6pt2fKwX9PLB75vb13YnPnCADsN",
  LTC: "ltc1q7hlyr4rfvs22k7a92jtckqn3azagv59fgau8fv",
  DOGE: "D7g4BqBvKZsLayTohdtCzLk9TymH7bq9wp",
  "ETH Polygon": "0xe73364bcbD1c79286437E42E32cFD2892B2e2c09",
};

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const { user } = useMe();
  const amount = searchParams.get("amount") || "0";
  const crypto = searchParams.get("crypto") || "BTC";
  const address = wallets[crypto] || wallets["BTC"];

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B1210] text-white p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-[#D4AF37] transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span>Modify Deposit</span>
        </button>

        <div className="bg-[#1a1f2e] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          {/* User Profile Info */}
          <div className="bg-white/5 border-b border-white/5 p-6 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#D4AF37]/10 rounded-full text-[#D4AF37]"><User size={18}/></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Full Name</p>
                <p className="font-bold text-sm">{user?.fullName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#D4AF37]/10 rounded-full text-[#D4AF37]"><Mail size={18}/></div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Registered Email</p>
                <p className="font-bold text-sm">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 text-center">
            <h1 className="text-2xl font-black mb-2">Awaiting Deposit</h1>
            <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto">
              Please send the equivalent of <span className="text-white font-bold">${amount}</span> in <span className="text-[#D4AF37] font-bold">{crypto}</span>.
            </p>

            {/* Address Field */}
            <div className="text-left max-w-md mx-auto mb-10">
              <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3 block text-center">
                Click to copy {crypto} address
              </label>
              <div 
                onClick={handleCopy}
                className="group relative bg-[#0B1210] border-2 border-white/5 rounded-md p-3 cursor-pointer hover:border-[#D4AF37]/40 transition-all text-center"
              >
                <p className="text-sm font-mono break-all text-slate-300 group-hover:text-white transition-colors">
                  {address}
                </p>
                <div className="mt-3 flex justify-center text-[#D4AF37] text-xs font-bold gap-1 items-center">
                   {copied ? <Check size={14} /> : <Copy size={14} />}
                   {copied ? "Copied to Clipboard" : "Copy Address"}
                </div>
              </div>
            </div>

            {/* Visual QR Code Section */}
            <div className="flex flex-col items-center justify-center mb-10">
              <div className="bg-white p-5 rounded-[2rem] shadow-[0_0_50px_rgba(212,175,55,0.15)]">
                <QRCodeSVG 
                  value={address} 
                  size={200}
                  level="H"
                  includeMargin={false}
                  bgColor="#FFFFFF"
                  fgColor="#0B1210"
                />
              </div>
              <div className="mt-6 flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">
                 <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                 <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">Waiting for payment</span>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex gap-3 justify-center mx-auto">
              {/* <Button 
                onClick={() => router.push('/dashboard')}
                className="bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-black rounded-md cursor-pointer"
              >
                I have sent the funds
              </Button> */}
              < ProofOfPaymentModal amountSent={amount} />
              <Button 
                variant="ghost" 
                onClick={() => router.push('/dashboard')}
                className="text-slate-500 hover:text-white hover:bg-white/5 font-bold cursor-pointer"
              >
                Cancel and return
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-10 opacity-40">
                <ShieldCheck size={20} />
                <Clock size={20} />
                <span className="text-[10px] font-black tracking-widest uppercase">Verified Gateway</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}