"use client";

import { motion } from "framer-motion";
import { UserPlus, CreditCard, BarChart3 } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Create your account",
    icon: UserPlus,
  },
  {
    title: "Make your first deposit",
    icon: CreditCard,
  },
  {
    title: "Start trading",
    icon: BarChart3,
  },
];

export default function GetStartedSection() {
  return (
    <section className="bg-[#0B1210] py-14 px-4">
      <div className="max-w-6xl mx-auto rounded-[2.5rem] bg-white/[0.04] border border-white/10 px-6 md:px-12 py-20 text-center relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
        >
          Ready to join a leading <br className="hidden md:block" /> broker?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-white/70 text-base md:text-lg mb-16"
        >
          Join our community of traders worldwide
        </motion.p>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative flex-1 flex flex-col items-center"
            >
              {/* Icon */}
              <Link href="/register">
              <div className="relative z-10 w-16 h-16 rounded-full border border-white/30 flex items-center justify-center bg-[#0B1210] text-white shadow-lg">
                <step.icon className="w-7 h-7 cursor-pointer" />
              </div>
              </Link>

              {/* Connector (desktop only) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-8 right-0 w-full h-px border-t border-dashed border-white/20 translate-x-1/2" />
              )}

              {/* Label */}
              <p className="mt-6 text-sm md:text-base font-medium text-white/90">
                {index + 1}. {step.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
