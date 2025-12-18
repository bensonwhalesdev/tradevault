"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Fingerprint, LayoutDashboard, History, KeyRound, ArrowRight, Eye, EyeOff, Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "../Hooks/useLogin";
const loginSchema = z.object({
  email: z.string().email("Please enter a valid business email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, loading } = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => loginUser(data);

  return (
    <div className="min-h-screen bg-[#0B1210] flex flex-col lg:flex-row overflow-hidden">
      
      {/* ===== Left Side: Secure Gateway Branding ===== */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative bg-[#0D1614] p-16 flex-col justify-between border-r border-white/5"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-16">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-2xl font-bold tracking-tighter text-white">
              NEXA<span className="text-[#D4AF37]">TRADE</span>
            </span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Secure Gateway Active</span>
          </div>

          <h2 className="text-5xl font-bold text-white leading-tight mb-8">
            Access your <br /> 
            <span className="text-[#D4AF37]">Global Portfolio</span>.
          </h2>

          <div className="space-y-8">
            {[
              { icon: LayoutDashboard, title: "Custom Terminal", desc: "Your personalized workspace is ready." },
              { icon: History, title: "Audit Ready", desc: "Every transaction is logged and encrypted." },
            //   { icon: Fingerprint, title: "Biometric Access", desc: "Multi-factor authentication enabled." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#D4AF37]/50 transition-colors">
                  <item.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-gray-600 text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>SSL Encrypted Connection: 256-bit AES</span>
        </div>
      </motion.div>

      {/* ===== Right Side: Login Form ===== */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-8 left-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Logo" width={30} height={30} />
                <span className="text-xl font-bold text-white tracking-tighter">NEXA<span className="text-[#D4AF37]">TRADE</span></span>
            </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md mt-15"
        >
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-3xl font-bold text-white mb-2">Welcome Back</h3>
            <p className="text-gray-500 italic text-sm font-light">Enter your credentials.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                  {...register("email")}
                  placeholder="name@nexatrade.com" 
                  className={`bg-white/5 border-white/10 text-white pl-11 py-7 rounded-xl focus:border-[#D4AF37] transition-all ${errors.email ? "border-red-500/50" : ""}`} 
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold mt-1 ml-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                {/* <Link href="#" className="text-[10px] text-[#D4AF37] hover:underline uppercase font-bold">Lost Access?</Link> */}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                  {...register("password")}
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className={`bg-white/5 border-white/10 text-white pl-11 pr-12 py-7 rounded-xl focus:border-[#D4AF37] transition-all ${errors.password ? "border-red-500/50" : ""}`} 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[10px] uppercase font-bold mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <Button 
              disabled={loading}
              className="w-full bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-black h-14 rounded-xl group transition-all duration-300 shadow-xl shadow-[#D4AF37]/5 overflow-hidden relative"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-6">New to the platform?</p>
            <Link href="/register">
                <Button variant="outline" className="w-full border-white/10 bg-transparent text-white rounded-xl h-12 uppercase text-[10px] tracking-[0.2em] font-bold cursor-pointer">
                    Create An Account
                </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}