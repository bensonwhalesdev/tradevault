"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  ArrowUpRight,
  ShieldCheck,
  Mail
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Markets",
      links: [
        { name: "Forex", href: "#" },
        { name: "Indices", href: "#" },
        { name: "Commodities", href: "#" },
        { name: "Crypto", href: "#" },
        { name: "Shares", href: "#" },
      ],
    },
    {
      title: "Platforms",
      links: [
        { name: "TradingView", href: "#" },
        { name: "MetaTrader 5", href: "#" },
        { name: "Mobile App", href: "#" },
        { name: "Web Trader", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "API Docs", href: "#" },
        { name: "Status", href: "#" },
        { name: "Security", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0B1210] text-white pt-20 pb-10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-[#0B1210] to-[#111] rounded-[2.5rem] p-8 md:p-12 mb-20 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Ready to elevate your trading?
            </h3>
            <p className="text-gray-400 text-lg">
              Join 787,000+ traders and start your journey with a regulated global broker.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <Link href="/register">
              <button className="w-full lg:w-auto px-8 py-4 rounded-md bg-white text-black font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group cursor-pointer">
                Open Account
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Link>
            <Link href="/register">
              <button className="w-full lg:w-auto px-8 py-4 rounded-md bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                Try Free Demo
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-6 block">
              NEXA<span className="text-gray-500">TRADE</span>
            </Link>
            <p className="text-gray-500 mb-8 max-w-sm leading-relaxed">
              Empowering traders worldwide with institutional-grade technology, 
              deep liquidity, and a transparent trading environment.
            </p>
            <div className="flex gap-4">
              {[Twitter, Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-white hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {footerLinks.map((column, i) => (
            <div key={i} className="col-span-1">
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-gray-400">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href} className="text-gray-500 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between gap-8 mb-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Regulatory Disclosure</span>
              </div>
              <p className="text-white text-xs leading-relaxed mb-4">
                NexaTrade is a trading name of NexaTrade Global Ltd. Authorised and regulated by the Securities Commission of The Bahamas (the SCB) with license number SIA-F212. 
              </p>
              <p className="text-white text-xs leading-relaxed">
                Risk Warning: Trading Derivatives carries a high level of risk to your capital and you should only trade with money you can afford to lose. Trading Derivatives may not be suitable for all investors, please ensure that you fully understand the risks involved and seek independent advice if necessary.
              </p>
            </div>
            <div className="flex items-start lg:items-end flex-col">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@nexatrade.com</span>
              </div>
              <p className="text-gray-600 text-xs">Available 24/5 for global support</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-[10px] uppercase tracking-[0.2em]">
            <p>© {currentYear} NexaTrade Global Limited. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
}