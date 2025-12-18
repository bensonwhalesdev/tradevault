"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const RapidWithdrawSection = () => {
  return (
    <section className="bg-[#0B1210] py-10 px-4">
      <div className="max-w-6xl mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-8 md:px-14 py-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-2xl blur-2xl" />

              <Image
                src="/rapid.png"
                alt="Rapid withdrawals"
                width={420}
                height={420}
                className="relative z-10 rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <span className="inline-block mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Fast & Reliable
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Rapid withdrawals
            </h2>

            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              99% of withdrawals are processed within 24 hours, based on our
              internal server data from 2024 — ensuring quick access to your
              funds when you need them most.
            </p>

            {/* Trust stats */}
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-white">99%</p>
                <p className="text-xs uppercase tracking-wider text-white/60">
                  Processed in 24h
                </p>
              </div>

              <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-xs uppercase tracking-wider text-white/60">
                  Withdrawal access
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RapidWithdrawSection;
