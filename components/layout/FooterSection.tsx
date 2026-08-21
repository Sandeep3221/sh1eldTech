'use client';

import React from 'react';
import { MapPin, Mail, Phone, Building2, Beaker } from 'lucide-react';

export function FooterSection() {
  return (
    <footer 
      className="relative w-full bg-[#030406] pt-16 sm:pt-24 pb-8 sm:pb-10 border-t border-white/10"
      // Explicitly forcing system fonts to ensure it doesn't use the custom fonts from the sections above
      style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16 mb-14 sm:mb-20">
          
          {/* Column 1: Educational Institute */}
          <div className="flex flex-col">
            <h4 className="text-white text-[13px] sm:text-[15px] font-semibold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 uppercase tracking-wider">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              Educational Institute
            </h4>
            <div className="flex items-start gap-2 sm:gap-3 group">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 mt-1 shrink-0 group-hover:text-cyan-400 transition-colors" />
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-gray-400">
                SH1ELD CyberSecurity Centre,<br/>
                Children Park, Tibet Road,<br/>
                Gangtok. (East)
              </p>
            </div>
          </div>

          {/* Column 2: R&D Labs */}
          <div className="flex flex-col">
            <h4 className="text-white text-[13px] sm:text-[15px] font-semibold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 uppercase tracking-wider">
              <Beaker className="w-4 h-4 sm:w-5 sm:h-5 text-[#a2ff4d]" />
              Research & Development
            </h4>
            <div className="flex items-start gap-2 sm:gap-3 group">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 mt-1 shrink-0 group-hover:text-[#a2ff4d] transition-colors" />
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-gray-400">
                AIC SMUTBI, 5TH Floor, F Block,<br/>
                SMIT Campus, Majitar,<br/>
                Sikkim (East)
              </p>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col">
            <h4 className="text-white text-[13px] sm:text-[15px] font-semibold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 uppercase tracking-wider">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
              Get in Touch
            </h4>
            <div className="flex flex-col gap-4 sm:gap-5">
              <a 
                href="mailto:sh1eldtech011@gmail.com" 
                className="flex items-center gap-2 sm:gap-3 text-[13px] sm:text-[14px] text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-pink-400/10 transition-colors shrink-0">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 group-hover:text-pink-400 transition-colors" />
                </div>
                sh1eldtech011@gmail.com
              </a>
              
              <a 
                href="tel:+919547250772" 
                className="flex items-center gap-2 sm:gap-3 text-[13px] sm:text-[14px] text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-400/10 transition-colors shrink-0">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                +91 9547250772
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar / Copyright */}
        <div className="w-full pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-[12px] text-gray-500">
          <p>© {new Date().getFullYear()} SH1ELD Tech. All rights reserved.</p>
          <div className="flex gap-5 sm:gap-8">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Legal Info</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
