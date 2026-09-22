import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen, Cake, Clock, MapPin, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/business';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EBE1] via-[#FAF7F2] to-[#FAF7F2] py-12 lg:py-20 border-b border-[#EBDCCB]">
      {/* Subtle warm background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E5BA73]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#8B5E3C]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D9C3B0] text-xs font-semibold text-[#8B5E3C] shadow-xs backdrop-blur-xs">
              <MapPin className="w-3.5 h-3.5 text-[#E5BA73]" />
              <span>Arada by Al Jada • Muwaileh Commercial, Sharjah</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C1A11] tracking-tight leading-[1.1]">
              Freshly Baked.{' '}
              <span className="italic font-medium text-[#8B5E3C] block sm:inline">
                Made With Love.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#5A453A] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Fresh bakery products, cakes, desserts and homemade-style treats prepared for customers in Sharjah. Handcrafted daily using pure European butter, unbleached flours, and natural ingredients.
            </p>

            {/* CTAs: Shop Now, Explore Menu, Order a Custom Cake */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                to="/shop"
                className="px-6 py-3.5 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/menu"
                className="px-6 py-3.5 bg-white hover:bg-[#F3ECE2] text-[#2C1A11] border border-[#D9C3B0] rounded-xl text-sm font-bold shadow-xs transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#8B5E3C]" />
                <span>Explore Menu</span>
              </Link>

              <Link
                to="/custom-cakes"
                className="px-6 py-3.5 bg-[#EBDCCB] hover:bg-[#E5D5C5] text-[#724827] rounded-xl text-sm font-bold transition-all flex items-center gap-2"
              >
                <Cake className="w-4 h-4 text-[#8B5E3C]" />
                <span>Order a Custom Cake</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#EBDCCB]/70 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#2C1A11] block">100%</span>
                <span className="text-xs text-[#725E52]">French Butter Viennoiserie</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#2C1A11] block">Same-Day</span>
                <span className="text-xs text-[#725E52]">Bake to Order in Sharjah</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#2C1A11] block">Bespoke</span>
                <span className="text-xs text-[#725E52]">Custom Cake Studio</span>
              </div>
            </div>
          </div>

          {/* Right Visual Area */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-[#F5EBE1]">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
                  alt="Freshly baked artisan chocolate cake at Home Bakery Kitchen Al Jada"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#E5BA73] font-semibold block">
                    Al Jada Artisan Kitchen
                  </span>
                  <p className="font-serif text-xl font-bold">
                    Signature Belgian Chocolate & Lotus Cakes
                  </p>
                </div>
              </div>

              {/* Floating Fresh Morning Bake Card */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#EBDCCB] flex items-center gap-3 animate-bounce-subtle max-w-[210px]">
                <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] flex items-center justify-center text-[#8B5E3C] shrink-0">
                  <Clock className="w-5 h-5 text-[#8B5E3C]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2C1A11] block">Fresh at 6:00 AM</span>
                  <span className="text-[10px] text-[#725E52]">Hot croissants & sourdough loaves</span>
                </div>
              </div>

              {/* Floating UAE Customer Favorite Card */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#EBDCCB] flex items-center gap-3 max-w-[220px]">
                <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] flex items-center justify-center text-[#E5BA73] shrink-0">
                  <Sparkles className="w-5 h-5 text-[#8B5E3C]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2C1A11] block">Sharjah Local Love</span>
                  <span className="text-[10px] text-[#725E52]">Rated 4.9/5 by local dessert lovers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
