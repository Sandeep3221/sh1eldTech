'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function ContactSection() {
  return (
    <section className="relative w-full bg-[#08090C] py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Subtle Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a2ff4d]/5 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 flex flex-col items-center">
        
        {/* Headline - 2 lines on all devices */}
        <h2 className="text-[26px] sm:text-4xl md:text-5xl lg:text-[4rem] font-heading font-extrabold text-white mb-12 sm:mb-16 text-center leading-[1.15] tracking-tight">
          Bring Us In Early.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#a2ff4d]">Thank Us Later.</span>
        </h2>

        {/* Premium Solid White Form Container */}
        <div className="w-full bg-white rounded-[32px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          <form className="relative z-10 flex flex-col gap-5 sm:gap-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Top Row: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-black font-bold ml-2">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-[20px] px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#08090C] focus:ring-1 focus:ring-[#08090C] focus:bg-white transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-black font-bold ml-2">Email</label>
                <input 
                  type="email" 
                  placeholder="hello@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-[20px] px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#08090C] focus:ring-1 focus:ring-[#08090C] focus:bg-white transition-all duration-300"
                />
              </div>
            </div>

            {/* Bottom Row: Description */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-black font-bold ml-2">Description</label>
              <textarea 
                rows={4}
                placeholder="Tell us about your project or idea..."
                className="w-full bg-slate-50 border border-slate-200 rounded-[20px] px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#08090C] focus:ring-1 focus:ring-[#08090C] focus:bg-white transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4 w-full">
              <button className="group w-full flex items-center justify-center gap-3 bg-[#08090C] hover:bg-slate-800 text-white font-heading font-bold text-sm sm:text-base tracking-widest uppercase py-4 sm:py-5 rounded-[20px] transition-all duration-300 shadow-xl hover:shadow-2xl">
                <span>Submit Request</span>
                <ArrowUpRight className="w-5 h-5 text-[#a2ff4d] group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
            
          </form>
        </div>

      </div>
    </section>
  );
}
