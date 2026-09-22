import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BAKERY_PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { SectionHeading } from '../common/SectionHeading';
import { QuickViewModal } from '../common/QuickViewModal';
import { Product } from '../../types';

export const BestSellersSection: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter top best sellers across cakes, pastries, cookies, bread, desserts
  const bestSellers = BAKERY_PRODUCTS.filter((p) => p.bestSeller).slice(0, 8);

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-[#EBDCCB]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Sharjah Favorites"
          title="Best Selling Creations"
          subtitle="Our most requested signature cakes, freshly baked viennoiserie, and artisan treats loved across Sharjah."
          action={
            <Link
              to="/best-sellers"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#8B5E3C] hover:text-[#724827] transition-colors"
            >
              <span>View All Best Sellers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FAF7F2] hover:bg-[#F3ECE2] text-[#2C1A11] border border-[#D9C3B0] rounded-xl text-sm font-bold transition-all shadow-xs"
          >
            <span>Explore All 30+ Bakery Items</span>
            <ArrowRight className="w-4 h-4 text-[#8B5E3C]" />
          </Link>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
