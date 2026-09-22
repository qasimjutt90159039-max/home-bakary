import React from 'react';
import { Link } from 'react-router-dom';
import { Cake, Sparkles, Check, ArrowRight } from 'lucide-react';

export const CustomCakeBanner: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#2C1A11] via-[#3D2517] to-[#241A15] text-[#FAF7F2] relative overflow-hidden">
      {/* Glow decorative effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#E5BA73]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#8B5E3C]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2]/10 border border-[#E5BA73]/30 text-[#E5BA73] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Celebration Studio</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Create Your Dream Custom Cake For Life’s Special Moments
            </h2>

            <p className="text-sm sm:text-base text-[#D9C3B0] leading-relaxed max-w-xl">
              From intimate birthday gatherings to grand weddings across Sharjah, our pastry artists bring your vision to life. Choose your sponge layers, luscious fillings, cream finishes, color palettes, and custom message plaques.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#F5EBE1]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#8B5E3C] flex items-center justify-center text-white shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Belgian Chocolate, Vanilla, Pistachio & Lotus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#8B5E3C] flex items-center justify-center text-white shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Hand-piped buttercream or velvety ganache</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#8B5E3C] flex items-center justify-center text-white shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Custom color themes & personalized greetings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#8B5E3C] flex items-center justify-center text-white shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Prompt review & phone consultation (+971 6 531 5847)</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/custom-cakes"
                className="px-7 py-3.5 bg-[#E5BA73] hover:bg-[#D49B55] text-[#2C1A11] rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2"
              >
                <Cake className="w-4 h-4" />
                <span>Build Your Custom Cake</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+97165315847"
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-sm font-semibold transition-colors"
              >
                Call Chef at +971 6 531 5847
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 bg-[#3D2517] aspect-square max-w-md mx-auto">
              <img
                src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80"
                alt="Artisan custom celebration cake created by Home Bakery Kitchen Al Jada"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-center sm:text-left">
                <span className="text-[11px] font-bold tracking-widest text-[#E5BA73] uppercase">
                  Sharjah Masterclass
                </span>
                <p className="font-serif text-xl font-bold text-white mt-1">
                  Bespoke Hand-Piped Celebrations
                </p>
                <p className="text-xs text-[#D9C3B0] mt-0.5">
                  Available in 1kg to 5kg+ multi-tiered formats
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
