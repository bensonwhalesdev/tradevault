"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Zap, Globe, ArrowRight, Eye, EyeOff, Lock, Mail, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegister } from "../Hooks/useRegister";

// Validation Schema
const registerSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, loading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerUser(data);
  };

  return (
    <div className="min-h-screen bg-[#0B1210] flex flex-col lg:flex-row overflow-hidden">
      
      {/* ===== Left Side: Marketing & Trust (Hidden on Mobile) ===== */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative bg-[#0D1614] p-16 flex-col justify-between border-r border-white/5"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-16">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-2xl font-bold tracking-tighter text-white">
              NEXA<span className="text-[#D4AF37]">TRADE</span>
            </span>
          </Link>

          <h2 className="text-5xl font-bold text-white leading-tight mb-8">
            Start your journey with <br /> 
            <span className="text-[#D4AF37]">Institutional Grade</span> Tech.
          </h2>

          <div className="space-y-8">
            {[
              { icon: ShieldCheck, title: "Regulated & Secure", desc: "Fully compliant with global financial standards." },
              { icon: Zap, title: "Lightning Fast", desc: "Execute trades in milliseconds with zero lag." },
              { icon: Globe, title: "Global Access", desc: "Trade 2,000+ assets across 50+ international markets." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
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

        <div className="relative z-10 pt-10 border-t border-white/5">
          <p className="text-gray-500 text-sm">
            © 2025 NexaTrade Global Ltd. All rights reserved. <br />
            Trading involves significant risk of loss.
          </p>
        </div>
      </motion.div>

      {/* ===== Right Side: Register Form ===== */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
        {/* Mobile Logo Only - Clickable back to Home */}
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
            <h3 className="text-3xl font-bold text-white mb-2">Create Account</h3>
            <p className="text-gray-500">Join over 780,000 traders worldwide.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                  {...register("fullName")}
                  type="text" 
                  placeholder="John Doe" 
                  className={`bg-white/5 border-white/10 text-white pl-11 py-6 rounded-xl focus:border-[#D4AF37] transition-all ${errors.fullName ? "border-red-500" : ""}`} 
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                  {...register("email")}
                  type="email" 
                  placeholder="name@company.com" 
                  className={`bg-white/5 border-white/10 text-white pl-11 py-6 rounded-xl focus:border-[#D4AF37] transition-all ${errors.email ? "border-red-500" : ""}`} 
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                  {...register("password")}
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className={`bg-white/5 border-white/10 text-white pl-11 pr-11 py-6 rounded-xl focus:border-[#D4AF37] transition-all ${errors.password ? "border-red-500" : ""}`} 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 py-2">
                <input required type="checkbox" className="mt-1 accent-[#D4AF37] w-4 h-4 rounded" id="terms" />
                <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">
                    I agree to the <Link href="#" className="text-[#D4AF37] hover:underline">Terms of Service</Link> and <Link href="#" className="text-[#D4AF37] hover:underline">Privacy Policy</Link>.
                </label>
            </div>

            <Button 
              disabled={loading}
              className="w-full bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-bold py-6 rounded-xl group transition-all duration-300 shadow-lg shadow-[#D4AF37]/10 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create My Account
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Footer Social / Login */}
          <div className="mt-10">
            {/* <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0B1210] px-4 text-gray-600 tracking-widest">Or Register With</span></div>
            </div> */}

            {/* <div className="grid grid-cols-2 gap-4 mb-8">
                <Button variant="outline" className="border-white/10 bg-transparent text-white hover:bg-white/5 rounded-xl h-12">
                    <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={18} height={18} className="mr-2" />
                    Google
                </Button>
                <Button variant="outline" className="border-white/10 bg-transparent text-white hover:bg-white/5 rounded-xl h-12">
                    <Image src="https://www.svgrepo.com/show/303108/apple-black-logo.svg" alt="Apple" width={18} height={18} className="mr-2 invert" />
                    Apple
                </Button>
            </div> */}

            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-white font-bold hover:text-[#D4AF37] transition-colors">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}