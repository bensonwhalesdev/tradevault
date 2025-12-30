"use client";

import React, { useState } from "react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2, CheckCircle2, X } from "lucide-react";
import { uploadToImgBB } from "../lib/imagebbUploads";

export function ProofOfPaymentModal({ amountSent }: { amountSent: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedAmount, setConfirmedAmount] = useState(amountSent);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      try {
        setUploading(true);
        const url = await uploadToImgBB(selectedFile);
        setImageUrl(url);
      } catch (error) {
        alert("Image upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = {
      amount: confirmedAmount,
      proofImage: imageUrl, // The hosted URL
      status: "Payment Sent - Awaiting Verification"
    };

    try {
      const response = await fetch("https://formspree.io/f/xgvnlazw", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Submission failed. Please check your connection.");
      }
    } catch (error) {
      console.error("Formspree Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-black rounded-md cursor-pointer">
          I have sent the funds
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#1a1f2e] border-white/10 text-white max-w-md rounded-[2.5rem] outline-none">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Confirm Deposit</DialogTitle>
              <p className="text-slate-400 text-sm">Upload your receipt to speed up verification.</p>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Amount Sent ($)</label>
                <Input 
                  value={confirmedAmount}
                  onChange={(e) => setConfirmedAmount(e.target.value)}
                  className="bg-[#0B1210] border-white/5 h-12 rounded-xl text-white font-bold"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Screenshot</label>
                {!preview ? (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/10 rounded-2xl bg-[#0B1210] cursor-pointer hover:border-[#D4AF37]/40 transition-all">
                    <ImagePlus className="text-slate-500 mb-2" size={32} />
                    <p className="text-xs text-slate-500">Tap to upload proof</p>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} required />
                  </label>
                ) : (
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/20 bg-[#0B1210]">
                    <img src={preview} alt="Preview" className="w-full h-full object-contain p-2" />
                    {uploading && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                        <Loader2 className="animate-spin text-[#D4AF37] mb-2" />
                        <span className="text-[10px] text-[#D4AF37]">Hosting Image...</span>
                      </div>
                    )}
                    <button type="button" onClick={() => {setPreview(null); setImageUrl("");}} className="absolute top-2 right-2 p-1 bg-red-500 rounded-full"><X size={14}/></button>
                  </div>
                )}
              </div>
            </div>

            <Button 
              type="submit"
              disabled={uploading || submitting || !imageUrl}
              className="w-full bg-[#D4AF37] hover:bg-[#C5A030] text-[#0B1210] font-black rounded-md cursor-pointer"
            >
              {submitting ? <Loader2 className="animate-spin" /> : "Complete Submission"}
            </Button>
          </form>
        ) : (
          <div className="py-12 flex flex-col items-center text-center">
            <CheckCircle2 className="text-emerald-500 mb-6" size={60} />
            <h2 className="text-2xl font-bold mb-2">Submission Sent</h2>
            <p className="text-slate-400 text-sm px-6">We have received your proof. Your balance will be updated after network confirmation.</p>
            <Button onClick={() => window.location.href = '/dashboard'} className="mt-8 bg-white/5 text-white px-8 rounded-xl">Go Home</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}