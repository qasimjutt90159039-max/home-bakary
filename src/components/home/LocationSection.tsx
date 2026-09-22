import React from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/business';
import { Link } from 'react-router-dom';

export const LocationSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#EBDCCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#EBDCCB] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Business Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-block text-xs font-bold tracking-widest text-[#8B5E3C] uppercase bg-white px-3 py-1 rounded-full border border-[#D9C3B0] mb-3">
                  Visit Or Pick Up
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A11] leading-tight">
                  Home Bakery Kitchen Al Jada
                </h2>
                <p className="text-xs sm:text-sm text-[#8B5E3C] font-semibold mt-1">
                  Category: {BUSINESS_INFO.category} • Sharjah, UAE
                </p>
              </div>

              {/* Exact Address Block */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EBDCCB]">
                  <MapPin className="w-5 h-5 text-[#8B5E3C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-[#8C7A70] block font-semibold uppercase tracking-wider">
                      Bakery Address
                    </span>
                    <p className="text-sm font-bold text-[#2C1A11] mt-0.5 leading-snug">
                      {BUSINESS_INFO.address}
                    </p>
                    <p className="text-xs text-[#725E52] mt-1">
                      Located conveniently within the vibrant Arada Al Jada district in Muwaileh Commercial, Sharjah.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EBDCCB]">
                  <Phone className="w-5 h-5 text-[#8B5E3C] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-[#8C7A70] block font-semibold uppercase tracking-wider">
                      Bakery Kitchen Hotline
                    </span>
                    <a 
                      href={BUSINESS_INFO.phoneTel} 
                      className="text-base sm:text-lg font-extrabold text-[#8B5E3C] hover:text-[#724827] transition-colors block mt-0.5"
                    >
                      {BUSINESS_INFO.phoneFormatted}
                    </a>
                    <p className="text-xs text-[#725E52] mt-0.5">
                      Call us for order pickups, custom cake confirmations, or urgent deliveries.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="px-6 py-3.5 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_INFO.phoneFormatted}</span>
                </a>
                <Link
                  to="/contact"
                  className="px-6 py-3.5 bg-white hover:bg-[#F3ECE2] text-[#2C1A11] border border-[#D9C3B0] rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                >
                  <span>Contact & Map Details</span>
                  <ArrowRight className="w-4 h-4 text-[#8B5E3C]" />
                </Link>
              </div>
            </div>

            {/* Stylized Google Maps / Location Visual */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#D9C3B0] bg-white shadow-md">
                {/* Visual Map Header */}
                <div className="h-64 sm:h-72 bg-[#E9E4DC] relative flex items-center justify-center p-6 text-center overflow-hidden">
                  {/* Subtle map pattern simulation */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2C1A11_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Road simulation lines */}
                  <div className="absolute w-full h-8 bg-white/60 -rotate-12 transform" />
                  <div className="absolute w-8 h-full bg-white/60 rotate-45 transform" />

                  {/* Pin card in center */}
                  <div className="relative z-10 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-[#D9C3B0] max-w-sm mx-auto">
                    <div className="w-10 h-10 rounded-full bg-[#8B5E3C] text-[#E5BA73] flex items-center justify-center mx-auto mb-2 shadow-md">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif font-bold text-[#2C1A11] text-base sm:text-lg">
                      Home Bakery Kitchen Al Jada
                    </h4>
                    <p className="text-xs text-[#725E52] mt-1 font-medium">
                      Arada by Al Jada - Muwaileh Commercial - Sharjah
                    </p>
                    <div className="mt-3 pt-3 border-t border-[#F3ECE2] flex items-center justify-center gap-3 text-xs">
                      <span className="text-[#386641] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Kitchen Open Daily
                      </span>
                    </div>
                  </div>
                </div>

                {/* Map Footer Bar */}
                <div className="p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-[#EBDCCB]">
                  <div className="text-[#5A453A]">
                    <strong>Pickup & Courier Dispatch:</strong> Arada Al Jada, Sharjah
                  </div>
                  <a
                    href="https://maps.google.com/?q=Arada+Al+Jada+Sharjah+UAE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#8B5E3C] font-bold hover:underline"
                  >
                    <span>Open in Google Maps</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
