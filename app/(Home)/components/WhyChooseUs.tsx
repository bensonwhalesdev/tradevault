"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Globe,
  LineChart,
  Lock,
  Users,
  LucideIcon,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: "Institutional-Grade Security",
    description:
      "Your assets are protected with advanced encryption, cold storage, and multi-layer risk controls trusted by professionals.",
    icon: ShieldCheck,
  },
  {
    title: "Lightning-Fast Execution",
    description:
      "Ultra-low latency order matching ensures you never miss market opportunities, even during high volatility.",
    icon: Zap,
  },
  {
    title: "Global Market Access",
    description:
      "Trade major crypto assets across global markets with deep liquidity and competitive pricing at all times.",
    icon: Globe,
  },
  {
    title: "Advanced Trading Tools",
    description:
      "Professional-grade charts, indicators, and real-time data to help you trade with clarity and precision.",
    icon: LineChart,
  },
  {
    title: "Secure & Transparent",
    description:
      "We operate with full transparency, clear pricing, and strict compliance standards you can trust.",
    icon: Lock,
  },
  {
    title: "Built for Every Trader",
    description:
      "Whether you’re just starting or trading at scale, our platform adapts seamlessly to your needs.",
    icon: Users,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-10 overflow-hidden bg-[#0B1210]">
      {/* Subtle background glow (NO fog) */}
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-[#276F2E]/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px] bg-[#6F2E27]/15 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16 lg:mb-24"
        >
          <span className="inline-block mb-6 px-5 py-2 rounded-full border border-[#276F2E]/30 text-xs font-bold uppercase tracking-widest text-[#276F2E] bg-[#132019]">
            Why Choose Us
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-white tracking-tight leading-tight">
            Built on trust. <br className="hidden md:block" />
            Designed for performance.
          </h2>

          <p className="text-white/70 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Everything we build is focused on helping you trade with confidence,
            clarity, and complete peace of mind.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="
                group relative p-8 md:p-10 rounded-[2rem]
                bg-[#0F1A15]
                border border-[#276F2E]/20
                hover:border-[#6F2E27]/50
                transition-all duration-500
              "
            >
              {/* Icon */}
              <div className="w-14 h-14 mb-8 rounded-2xl flex items-center justify-center
                bg-[#276F2E]/15 border border-[#276F2E]/30
                text-[#276F2E]
                group-hover:scale-110 transition-transform duration-500
              ">
                <feature.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                {feature.title}
              </h3>

              <p className="text-white/65 leading-relaxed font-light text-sm md:text-base group-hover:text-white/85 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Bottom shimmer */}
              <div className="absolute bottom-0 left-0 w-full h-[2px]
                bg-gradient-to-r from-transparent via-[#276F2E]/60 to-transparent
                translate-x-[-100%] group-hover:translate-x-[100%]
                transition-transform duration-1000 ease-in-out
              " />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
