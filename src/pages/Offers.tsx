import React, { useState } from 'react';
import { Tag, Sparkles, Clock, Percent, ArrowRight } from 'lucide-react';
import { BAKERY_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { SectionHeading } from '../components/common/SectionHeading';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types';
import { Link } from 'react-router-dom';

export const Offers: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter products that have oldPrice > price
  const offersList = BAKERY_PRODUCTS.filter((p) => p.oldPrice && p.oldPrice > p.price);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#8B5E3C] via-[#A75D00] to-[#724827] text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-[#FAF7F2] text-xs font-bold border border-white/20">
              <Percent className="w-3.5 h-3.5 text-[#E5BA73]" />
              <span>Sharjah Bakery Specials</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Exclusive Seasonal Bakery Offers
            </h1>

            <p className="text-sm sm:text-base text-[#F5EBE1] leading-relaxed">
              Handcrafted morning boxes, signature celebration cakes, and sharing bundles baked fresh at special limited-time prices.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#E5BA73] font-semibold">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Baked Fresh Daily
              </span>
              <span>•</span>
              <span>Free Delivery in Sharjah on orders &gt; AED 150</span>
            </div>
          </div>
        </div>

        <SectionHeading
          badge="Limited Offers"
          title="Current Specials & Bundles"
          subtitle="All items are baked with the same uncompromised standards and fresh premium ingredients."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {offersList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Custom Order Upsell */}
        <div className="mt-16 p-8 bg-white rounded-3xl border border-[#EBDCCB] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#2C1A11]">
              Looking for a custom cake discount for large gatherings?
            </h3>
            <p className="text-xs sm:text-sm text-[#725E52] mt-1">
              Contact our head pastry chef at +971 6 531 5847 for customized volume orders and corporate gifting.
            </p>
          </div>
          <Link
            to="/custom-cakes"
            className="px-6 py-3 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-xs font-bold shrink-0 transition-colors"
          >
            Custom Cakes Studio
          </Link>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
