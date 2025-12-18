"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "P**** R*****",
    date: "2025-07-01",
    text: "I'm learning the basics of stock investment. The platform makes it very easy to understand market trends.",
  },
  {
    id: 2,
    name: "V****** F**** N***** ",
    date: "2025-07-01",
    text: "Great customer service. They helped me recover my account incredibly fast after losing my old email.",
  },
  {
    id: 3,
    name: "B*******",
    date: "2025-06-30",
    text: "Everything worked as expected from day one. The platform is intuitive and support was instantly available.",
  },
  {
    id: 4,
    name: "G** J*******",
    date: "2025-06-28",
    text: "Great for learning technical analysis fast. Spreads are fair and customer support is top notch.",
  },
];

const CARD_VARIANTS = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

export default function ReviewSection() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
   <div className="bg-[#0B1210]">
     <section className="bg-[#F9FAFB] py-14 overflow-hidden rounded-4xl">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-6">
            Read our reviews to find <br className="hidden md:block" /> out more
            about us
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Honest feedback from traders of all experience levels worldwide.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Desktop arrows */}
          <div className="hidden md:flex absolute inset-y-0 left-0 right-0 items-center justify-between z-20 pointer-events-none">
            <button
              onClick={prev}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white border border-gray-200 shadow hover:scale-105 transition flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={next}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white border border-gray-200 shadow hover:scale-105 transition flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Cards */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                variants={CARD_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[0, 1, 2].map((offset) => {
                  const review =
                    reviews[(index + offset) % reviews.length];

                  return (
                    <div
                      key={review.id}
                      className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between min-h-[320px]"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                            {review.name}
                          </p>
                          <span className="text-xs text-gray-300">
                            {review.date}
                          </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed text-base line-clamp-6">
                          {review.text}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-2">
                        <Star className="w-5 h-5 fill-green-500 text-green-500" />
                        <span className="font-semibold text-black text-lg">
                          Trustpilot
                        </span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs md:text-sm text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Showing our 4 & 5 star reviews. User details are anonymised in
            accordance with <span className="text-green-500 font-bold">GDPR</span> privacy requirements.
          </p>
        </div>
      </div>
    </section>
   </div>
  );
}
