import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  MapPin, 
  Phone, 
  Clock, 
  ChefHat, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import { SectionHeading } from '../components/common/SectionHeading';

export const About: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C] bg-[#F3ECE2] px-3.5 py-1 rounded-full border border-[#EBDCCB]">
            Our Bakery Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C1A11] mt-3 tracking-tight">
            Freshly Baked in Al Jada, Sharjah
          </h1>
          <p className="text-base sm:text-lg text-[#725E52] mt-4 leading-relaxed">
            Rooted in artisanal tradition and modern passion, Home Bakery Kitchen Al Jada was founded to bring authentic, handmade-style baking to the homes and celebrations of Sharjah.
          </p>
        </div>

        {/* Story & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/3 bg-[#F5EBE1]">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80"
                alt="Artisan bakery kitchen baking fresh pastries at dawn"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#5A453A] leading-relaxed">
            <h2 className="font-serif text-3xl font-bold text-[#2C1A11] leading-snug">
              Every Day Begins With The Warm Scent of Real Baking
            </h2>
            <p>
              Located in the modern, lively district of <strong>Arada by Al Jada in Muwaileh Commercial, Sharjah</strong>, our kitchen is designed around honesty, time-honored methods, and the purest bakery staples.
            </p>
            <p>
              We believe great bakery items should not depend on artificial stabilizers, pre-made dry mixes, or industrial dough conditioners. Instead, we take the longer, rewarding path: slow fermentations for sourdough, three-day lamination with pure French butter for our croissants, and natural infusions with real vanilla bean pods and cocoa for our celebration cakes.
            </p>
            <div className="pt-2">
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#8B5E3C] hover:text-[#724827] transition-colors"
              >
                <span>Read the deeper story behind our craft</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 5 Core Pillars: Fresh preparation, Quality ingredients, Craftsmanship, Beautiful presentation, Customer satisfaction */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EBDCCB] shadow-xs mb-20">
          <SectionHeading
            centered
            badge="The 5 Principles"
            title="What Defines Home Bakery Kitchen"
            subtitle="Our kitchen guidelines ensure that every box delivered in Sharjah upholds the highest standard."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] text-[#8B5E3C] flex items-center justify-center font-serif font-bold text-lg mb-3">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C1A11] mb-2">
                Fresh Preparation
              </h3>
              <p className="text-xs text-[#725E52] leading-relaxed">
                Baking every morning from scratch so breads, pastries, and cakes are at peak texture and aroma.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] text-[#8B5E3C] flex items-center justify-center font-serif font-bold text-lg mb-3">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C1A11] mb-2">
                Quality Ingredients
              </h3>
              <p className="text-xs text-[#725E52] leading-relaxed">
                Pure butter, Belgian chocolate, fresh local farm dairy, and unbleached stoneground flours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] text-[#8B5E3C] flex items-center justify-center font-serif font-bold text-lg mb-3">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C1A11] mb-2">
                Bakery Craftsmanship
              </h3>
              <p className="text-xs text-[#725E52] leading-relaxed">
                Skilled bakers using traditional methods: natural levain sourdough, hand folding, and artisanal patience.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] text-[#8B5E3C] flex items-center justify-center font-serif font-bold text-lg mb-3">
                4
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C1A11] mb-2">
                Beautiful Presentation
              </h3>
              <p className="text-xs text-[#725E52] leading-relaxed">
                Handcrafted piping, delicate sugar work, and elegant packaging ready for table presentation or gifting.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] text-[#8B5E3C] flex items-center justify-center font-serif font-bold text-lg mb-3">
                5
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C1A11] mb-2">
                Customer Satisfaction
              </h3>
              <p className="text-xs text-[#725E52] leading-relaxed">
                Attentive service, personal phone support at +971 6 531 5847, and dependable delivery across Sharjah.
              </p>
            </div>
          </div>
        </div>

        {/* Location & Call Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#2C1A11] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#E5BA73] font-semibold">
              Visit or Contact Our Kitchen
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
              Home Bakery Kitchen Al Jada
            </h3>
            <p className="text-xs sm:text-sm text-[#D9C3B0] mt-1">
              {BUSINESS_INFO.address}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="px-6 py-3 bg-[#E5BA73] text-[#2C1A11] font-bold rounded-xl text-xs hover:bg-[#D49B55] transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +971 6 531 5847</span>
            </a>
            <Link
              to="/shop"
              className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl text-xs hover:bg-white/20 transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
