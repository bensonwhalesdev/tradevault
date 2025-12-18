"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===== Desktop Navbar ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B1210] border-b border-white/5 hidden md:block">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative p-1.5 bg-white/5 border border-white/10 rounded-xl transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="NexaTrade Logo"
                  width={32}
                  height={32}
                  priority
                  className="rounded-sm"
                />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white uppercase">
                Nexa<span className="text-[#D4AF37]">Trade</span>
              </span>
            </Link>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-md cursor-pointer px-6">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-bold rounded-md cursor-pointer px-8 shadow-lg shadow-[#D4AF37]/10 flex items-center gap-2 group transition-all duration-300">
                  Get Started
                  {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Mobile Header ===== */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-[#0B1210]/95 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-4">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white transition-active scale-95 active:scale-90"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="NexaTrade Logo"
            width={30}
            height={30}
            className="rounded-md"
          />
          <span className="text-sm font-bold tracking-widest text-white uppercase">NexaTrade</span>
        </Link>
        
        {/* Placeholder to keep logo centered */}
        <div className="w-10" /> 
      </div>

      {/* ===== Mobile Sidebar (Framer Motion) ===== */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[60] md:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 h-full w-[280px] bg-[#0B1210] border-r border-white/10 p-6 flex flex-col"
            >
              {/* Sidebar Top Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={35}
                    height={35}
                  />
                  <span className="font-bold text-white tracking-tighter">NEXATRADE</span>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar Branding Feature (Unique Touch) */}
              <div className="mb-4">
                <div className="p-5 rounded-2xl bg-white/[0.03]">
                  <ShieldCheck className="w-8 h-8 text-[#D4AF37] mb-3" />
                  <h4 className="text-white font-semibold text-sm mb-1">Secure Trading</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Institutional-grade security for your digital assets and global market access.
                  </p>
                </div>
              </div>

              {/* Sidebar CTAs (Fixed at bottom) */}
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="px-6 rounded-md border-white/10 hover:bg-white/5">
                    Sign In
                  </Button>
                </Link>

                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="px-6 rounded-md bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-bold">
                    Get Started
                  </Button>
                </Link>
                
                <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest mt-2">
                  Regulated Global Broker
                </p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;