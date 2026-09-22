import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BAKERY_CATEGORIES } from '../../data/categories';
import { SectionHeading } from '../common/SectionHeading';

export const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Bakes of Every Craving"
          title="Explore Our Bakery Categories"
          subtitle="From early morning flaky French viennoiserie to celebration centerpiece cakes, every treat is prepared with passion in our Sharjah kitchen."
          action={
            <Link
              to="/categories"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#8B5E3C] hover:text-[#724827] transition-colors"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {BAKERY_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={cat.name === 'Special Occasions' ? '/custom-cakes' : `/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#EBDCCB] hover:border-[#D9C3B0] transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              {/* Image */}
              <div className="aspect-4/3 overflow-hidden bg-[#F5EBE1] relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#2C1A11] text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {cat.itemCount} Items
                </span>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight group-hover:text-[#E5BA73] transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Text */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white">
                <p className="text-xs text-[#725E52] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#8B5E3C] group-hover:text-[#724827]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
