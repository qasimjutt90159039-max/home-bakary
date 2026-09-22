import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, Clock } from 'lucide-react';
import { BAKERY_PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { SectionHeading } from '../common/SectionHeading';

export const SpecialOffersSection: React.FC = () => {
  // Products that have oldPrice
  const discountedProducts = BAKERY_PRODUCTS.filter((p) => p.oldPrice && p.oldPrice > p.price).slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-[#F5EBE1] border-t border-[#EBDCCB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Limited Artisanal Treats"
          title="Special Bakery Offers"
          subtitle="Enjoy artisanal savings on our signature sharing sets, seasonal cakes, and breakfast boxes prepared fresh in Sharjah."
          action={
            <Link
              to="/offers"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#8B5E3C] hover:text-[#724827] transition-colors"
            >
              <span>View All Special Offers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {discountedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
