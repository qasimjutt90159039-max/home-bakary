import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ShoppingBag, 
  Sparkles, 
  Flame, 
  Download, 
  Printer, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { BAKERY_PRODUCTS } from '../data/products';
import { BAKERY_CATEGORIES } from '../data/categories';
import { useCart } from '../context/CartContext';
import { ProductCategory } from '../types';
import { BUSINESS_INFO } from '../data/business';

export const BakeryMenu: React.FC = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const menuSections = [
    'Cakes',
    'Cupcakes',
    'Pastries',
    'Cookies',
    'Desserts',
    'Bread',
    'Breakfast',
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Menu Cover Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C] bg-[#F3ECE2] px-3.5 py-1 rounded-full border border-[#EBDCCB]">
            Daily Kitchen Registry
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C1A11] mt-3">
            Artisanal Bakery Menu
          </h1>
          <p className="text-sm sm:text-base text-[#725E52] mt-2">
            Home Bakery Kitchen Al Jada • Sharjah, UAE • Tel: +971 6 531 5847
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#2C1A11] border border-[#D9C3B0] rounded-xl text-xs font-semibold hover:bg-[#FAF7F2] transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#8B5E3C]" />
              <span>Print Menu</span>
            </button>
          </div>
        </div>

        {/* Category Jump Pill Bar */}
        <div className="sticky top-20 z-20 bg-[#FAF7F2]/90 backdrop-blur-md py-3 mb-8 border-y border-[#EBDCCB]/80 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === 'All'
                ? 'bg-[#8B5E3C] text-white shadow-xs'
                : 'bg-white text-[#2C1A11] border border-[#D9C3B0] hover:bg-[#F3ECE2]'
            }`}
          >
            All Items ({BAKERY_PRODUCTS.length})
          </button>
          {menuSections.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveCategory(sec)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === sec
                  ? 'bg-[#8B5E3C] text-white shadow-xs'
                  : 'bg-white text-[#2C1A11] border border-[#D9C3B0] hover:bg-[#F3ECE2]'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Menu Presentation Sheet */}
        <div className="bg-white rounded-3xl border border-[#EBDCCB] p-6 sm:p-12 shadow-sm space-y-12">
          {menuSections.map((sectionName) => {
            if (activeCategory !== 'All' && activeCategory !== sectionName) {
              return null;
            }

            const items = BAKERY_PRODUCTS.filter((p) => p.category === sectionName);
            if (items.length === 0) return null;

            return (
              <section key={sectionName} className="space-y-6">
                {/* Section Title */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#2C1A11]">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1A11]">
                      {sectionName}
                    </h2>
                    <span className="text-xs text-[#8C7A70] block mt-0.5">
                      Baked fresh daily in small batches
                    </span>
                  </div>
                  <Link
                    to={`/shop?category=${encodeURIComponent(sectionName)}`}
                    className="text-xs font-bold text-[#8B5E3C] hover:underline"
                  >
                    View in Shop &rarr;
                  </Link>
                </div>

                {/* Items in Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group p-3 rounded-xl hover:bg-[#FAF7F2] transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-baseline justify-between gap-4">
                          <Link
                            to={`/product/${item.id}`}
                            className="font-serif font-bold text-base text-[#2C1A11] group-hover:text-[#8B5E3C] transition-colors"
                          >
                            {item.name}
                          </Link>
                          <div className="flex items-baseline gap-2 shrink-0">
                            {item.oldPrice && (
                              <span className="text-xs text-[#A89485] line-through">
                                AED {item.oldPrice}
                              </span>
                            )}
                            <span className="font-bold text-sm text-[#2C1A11]">
                              AED {item.price}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-[#725E52] mt-1 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-[11px] text-[#8C7A70]">
                          {item.portionSize && (
                            <span className="bg-[#FAF2E6] px-2 py-0.5 rounded-md text-[#8B5E3C] font-medium">
                              {item.portionSize}
                            </span>
                          )}
                          {item.bestSeller && (
                            <span className="text-[#A75D00] font-semibold">
                              ★ Top Pick
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#F3ECE2]">
                        <Link
                          to={`/product/${item.id}`}
                          className="text-[11px] font-semibold text-[#8B5E3C] hover:underline"
                        >
                          Details & Allergens
                        </Link>
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#8B5E3C] hover:bg-[#724827] text-white px-2.5 py-1 rounded-lg transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add AED {item.price}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};
