import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Sun, Flame, Clock, Award, Coffee, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

export const OurStory: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-20">
      {/* Editorial Story Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-24">
        <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C] bg-[#F3ECE2] px-3.5 py-1 rounded-full border border-[#EBDCCB]">
          Artisan Storytelling
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#2C1A11] mt-3 tracking-tight leading-tight">
          The Soul of Our Kitchen
        </h1>
        <p className="text-base sm:text-xl text-[#725E52] mt-4 font-serif italic max-w-2xl mx-auto">
          "Baking is a daily conversation between honest flour, living yeast, cold butter, and hot stone."
        </p>
      </div>

      {/* Visual Narrative Chapter 1: The Hearth in Al Jada */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C]">
              Chapter 01 • The Community Kitchen
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A11] leading-snug">
              Rooted in the Vibrant Heart of Al Jada
            </h2>
            <p className="text-sm sm:text-base text-[#5A453A] leading-relaxed">
              When we envisioned Home Bakery Kitchen in Arada by Al Jada, Muwaileh Commercial, our aim was simple: create an authentic neighborhood bakery where every resident, visiting family, or dessert lover can discover true artisanal warmth.
            </p>
            <p className="text-sm sm:text-base text-[#5A453A] leading-relaxed">
              In a fast-paced world dominated by industrialized baked goods, we felt an undeniable pull back to pure methods. We chose to bake small batches throughout the day rather than mass-producing in bulk, guaranteeing that what reaches your table is bursting with honest aroma and crisp crust.
            </p>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 bg-[#F5EBE1]">
              <img
                src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1000&q=80"
                alt="Country sourdough bread proofed and baked in stone oven"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Chapter 2: The Art of Lamination & Sourdough */}
      <div className="bg-[#F5EBE1] py-20 border-y border-[#EBDCCB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=1000&q=80"
                  alt="Golden flaky butter croissants freshly baked"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C]">
                Chapter 02 • Patience Over Rush
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A11] leading-snug">
                The Science of 72-Hour Fermentation & Folded Butter
              </h2>
              <p className="text-sm sm:text-base text-[#5A453A] leading-relaxed">
                Great viennoiserie cannot be accelerated. Our French butter croissants go through a strict three-day process of cold proofing, precise sheet lamination with chilled European butter, and slow resting.
              </p>
              <p className="text-sm sm:text-base text-[#5A453A] leading-relaxed">
                Similarly, our sourdough rests for up to 36 hours, allowing friendly lactic and acetic cultures to break down starches naturally. This results in loaves that are deeply flavorful, beautifully caramelized on the outside, and easy to digest.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative Chapter 3: Celebrations and Custom Artistry */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C]">
              Chapter 03 • Life’s Milestones
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A11] leading-snug">
              Every Cake Tells A Story
            </h2>
            <p className="text-sm sm:text-base text-[#5A453A] leading-relaxed">
              Whether celebrating a first birthday, a family reunion in Sharjah, or an intimate wedding celebration, a cake is more than dessert — it is the centerpiece of memory.
            </p>
            <p className="text-sm sm:text-base text-[#5A453A] leading-relaxed">
              Our cake decorators work with subtle color palettes, hand-whipped buttercreams, silky Belgian ganaches, and fragrant Middle Eastern accents like pistachio praline and cardamon rose.
            </p>
            <div className="pt-2">
              <Link
                to="/custom-cakes"
                className="px-6 py-3 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2"
              >
                <span>Design A Custom Celebration Cake</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 bg-[#F5EBE1]">
              <img
                src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=1000&q=80"
                alt="Pistachio and floral artisan cake presentation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Experience Footer CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EBDCCB] shadow-sm space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1A11]">
            Taste The Craftsmanship Today
          </h3>
          <p className="text-sm text-[#725E52] max-w-md mx-auto">
            Order online for same-day delivery in Sharjah or visit our bakery kitchen in Arada by Al Jada.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-xs font-bold transition-colors"
            >
              Explore Today’s Bakes
            </Link>
            <Link
              to="/menu"
              className="px-6 py-3 border border-[#D9C3B0] text-[#2C1A11] hover:bg-[#FAF7F2] rounded-xl text-xs font-bold transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
