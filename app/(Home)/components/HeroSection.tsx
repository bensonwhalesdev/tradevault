"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Zap, Tv, Apple, Play } from "lucide-react";
import React from "react";

interface StarRatingProps {
  count: number;
  colorClass: string;
}

const StarRating: React.FC<StarRatingProps> = ({ count, colorClass }) => (
  <div className="flex items-center space-x-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 md:w-4 md:h-4 fill-current ${
          i < count ? colorClass : "text-gray-300/50"
        }`}
      />
    ))}
  </div>
);

interface RatingCardProps {
  title: string;
  rating: string;
  starCount: number;
  starColorClass: string;
  imageSrc: string;
}

const RatingCard: React.FC<RatingCardProps> = ({
  title,
  rating,
  starCount,
  starColorClass,
  imageSrc,
}) => (
  <div className="flex items-center space-x-2 md:space-x-3">
    <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
      <Image src={imageSrc} alt={title} fill className="object-contain" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] md:text-xs font-semibold text-gray-700 truncate">
        {title}
      </p>
      <div className="flex items-center space-x-1 md:space-x-2">
        <p className="text-xs md:text-sm font-bold text-gray-900">{rating}</p>
        <StarRating count={starCount} colorClass={starColorClass} />
      </div>
    </div>
  </div>
);

export default function HeroSection() {
  const HERO_BG = "#0D1A13";
  const SIGNUP_COLOR = "linear-gradient(90deg, #D4AF77 0%, #C08E63 100%)";

  return (
    <section className="relative overflow-hidden mt-10 bg-white">
      <div
        className="relative text-white overflow-hidden pb-20 lg:pb-0"
        style={{
          backgroundColor: HERO_BG,
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 40px), 0 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative container mx-auto px-6 py-16 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            className="lg:col-span-6 z-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-[3.8rem] font-bold leading-[1.1] mb-6 tracking-tight text-center lg:text-left">
              Trade with a trusted <br className="hidden lg:block" /> global
              broker
            </h1>

            <p className="text-gray-400 max-w-lg mb-10 text-base md:text-lg font-light text-center lg:text-left mx-auto lg:mx-0">
              Join a community of 787,000+ traders from around the world. Our
              customers love us so much, they’ve traded over $1tn in volume.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
              <Link href="/register" className="sm:w-auto">
                <button
                  className="w-full px-10 py-3.5 rounded-md text-black font-bold transition hover:scale-105 active:scale-95 cursor-pointer"
                  style={{ background: SIGNUP_COLOR }}
                >
                  Sign Up
                </button>
              </Link>
              <Link href="/register" className="sm:w-auto">
                <button className="w-full px-10 py-3.5 rounded-md bg-transparent text-white font-bold border border-gray-700 hover:bg-white/5 transition active:scale-95 cursor-pointer">
                  Try Demo
                </button>
              </Link>
            </div>

            <p className="text-[10px] uppercase tracking-widest text-gray-500 text-center lg:text-left">
              Authorised and regulated by the SCB
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-6 relative h-[350px] md:h-[500px] lg:h-[600px] mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute left-[-5%] top-[10%] w-[180px] md:w-[280px] h-full z-0 opacity-40 lg:opacity-100"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/phone1.png"
                alt="App Interface 1"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <motion.div
              className="absolute right-[5%] top-[0%] w-[200px] md:w-[320px] h-full z-10"
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <Image
                src="/phone2.png"
                alt="App Interface 2"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <div className="absolute right-0 bottom-1/4 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/20 backdrop-blur-md border border-yellow-500/50">
              <Zap className="w-6 h-6 text-yellow-500 fill-current" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            <RatingCard
              title="TradingView"
              rating="4.8"
              starCount={5}
              starColorClass="text-blue-500"
              imageSrc="/tradingview.png"
            />
            <RatingCard
              title="Apple Store"
              rating="4.7"
              starCount={5}
              starColorClass="text-orange-400"
              imageSrc="/apple.png"
            />
            <RatingCard
              title="Google Play"
              rating="4.6"
              starCount={5}
              starColorClass="text-orange-400"
              imageSrc="/playstore.png"
            />
            <RatingCard
              title="Trustpilot"
              rating="4.6"
              starCount={5}
              starColorClass="text-green-500"
              imageSrc="/trustpilot.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}