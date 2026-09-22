import React, { useState } from 'react';
import { Award, Star, Sparkles, ArrowRight } from 'lucide-react';
import { BAKERY_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { SectionHeading } from '../components/common/SectionHeading';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types';
import { Link } from 'react-router-dom';

export const BestSellers: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter products marked as bestSeller
  const bestSellerProducts = BAKERY_PRODUCTS.filter((p) => p.bestSeller);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2E6] border border-[#EBDCCB] text-[#8B5E3C] text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Community Hall of Fame</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C1A11]">
            Our Most Celebrated Bakes
          </h1>
          <p className="text-sm sm:text-base text-[#725E52] mt-3 leading-relaxed">
            The recipes our customers order again and again: from the rich Lotus and Belgian Chocolate cakes to French butter croissants and stone-baked country sourdough.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellerProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-[#EBDCCB] text-center max-w-3xl mx-auto shadow-xs space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#2C1A11]">
            Want a tailored version of a bestseller?
          </h3>
          <p className="text-sm text-[#725E52] max-w-md mx-auto">
            We can modify sizing, cream types, sweetness, and inscriptions for any of our signature cakes.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/custom-cakes"
              className="px-6 py-3 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-xs font-bold transition-colors"
            >
              Order Custom Version
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3 border border-[#D9C3B0] text-[#2C1A11] hover:bg-[#FAF7F2] rounded-xl text-xs font-bold transition-colors"
            >
              Explore Full Catalog
            </Link>
          </div>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
