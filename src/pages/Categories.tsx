import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cake, Sparkles } from 'lucide-react';
import { BAKERY_CATEGORIES } from '../data/categories';
import { SectionHeading } from '../components/common/SectionHeading';

export const Categories: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          centered
          badge="Kitchen Collections"
          title="Bakery Categories"
          subtitle="Explore our specialized artisanal collections, thoughtfully baked in small batches for celebrations and everyday gatherings in Sharjah."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {BAKERY_CATEGORIES.map((cat) => {
            const isSpecial = cat.name === 'Special Occasions';
            const targetUrl = isSpecial ? '/custom-cakes' : `/shop?category=${encodeURIComponent(cat.name)}`;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#EBDCCB] hover:border-[#D9C3B0] transition-all duration-300 hover:shadow-xl flex flex-col justify-between group"
              >
                {/* Category Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#F5EBE1]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <span className="absolute top-3 right-3 bg-white/95 text-[#2C1A11] text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                    {cat.itemCount} Items
                  </span>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif text-2xl font-bold leading-tight group-hover:text-[#E5BA73] transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-[#725E52] leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#F3ECE2]">
                    <Link
                      to={targetUrl}
                      className="w-full py-2.5 px-4 bg-[#FAF7F2] hover:bg-[#8B5E3C] text-[#8B5E3C] hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 group-hover:shadow-xs"
                    >
                      <span>Explore {cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
