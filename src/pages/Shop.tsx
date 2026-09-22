import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Check, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { BAKERY_PRODUCTS } from '../data/products';
import { ProductCategory, Product } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';

const CATEGORIES: ('All' | ProductCategory)[] = [
  'All',
  'Cakes',
  'Cupcakes',
  'Pastries',
  'Cookies',
  'Desserts',
  'Bread',
  'Breakfast',
];

type SortOption = 'featured' | 'rating' | 'price-asc' | 'price-desc' | 'popular';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('q');

  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>(
    (categoryParam as ProductCategory) || 'All'
  );
  const [searchTerm, setSearchTerm] = useState(queryParam || '');
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [onlyBestSellers, setOnlyBestSellers] = useState(false);
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync state if URL query params change
  useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam as ProductCategory)) {
      setSelectedCategory(categoryParam as ProductCategory);
    }
    if (queryParam !== null) {
      setSearchTerm(queryParam);
    }
  }, [categoryParam, queryParam]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return BAKERY_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search term filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesTags = product.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      // Best sellers filter
      if (onlyBestSellers && !product.bestSeller) {
        return false;
      }

      // Offers filter
      if (onlyOffers && (!product.oldPrice || product.oldPrice <= product.price)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return b.reviews - a.reviews;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchTerm, maxPrice, sortBy, onlyBestSellers, onlyOffers]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setMaxPrice(250);
    setSortBy('featured');
    setOnlyBestSellers(false);
    setOnlyOffers(false);
    setSearchParams({});
  };

  const handleCategorySelect = (cat: 'All' | ProductCategory) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C] bg-[#F3ECE2] px-3 py-1 rounded-full border border-[#EBDCCB]">
            Handcrafted in Sharjah
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1A11] mt-2">
            The Artisan Bakery Store
          </h1>
          <p className="text-sm sm:text-base text-[#725E52] mt-2 max-w-2xl">
            Explore freshly baked cakes, flaky French croissants, artisan sourdough loaves, cupcakes, and gourmet cookies.
          </p>
        </div>

        {/* Top Control Bar: Search, Mobile Filter Toggle, Sort */}
        <div className="bg-white rounded-2xl border border-[#EBDCCB] p-4 sm:p-5 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search by name, chocolate, sourdough, croissant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-sm text-[#2C1A11] placeholder-[#8C7A70] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            />
            <Search className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-3.5 pointer-events-none" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-[#8C7A70] hover:text-[#2C1A11]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action Row: Filter Toggle on mobile & Sort dropdown */}
          <div className="w-full md:w-auto flex items-center justify-between sm:justify-end gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#F3ECE2] text-[#2C1A11] rounded-xl text-xs font-bold border border-[#D9C3B0] hover:bg-[#EBDCCB] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#8B5E3C]" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#725E52] hidden sm:inline whitespace-nowrap">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl py-2 pl-3 pr-8 text-xs font-semibold text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                >
                  <option value="featured">Featured / Curated</option>
                  <option value="popular">Popularity & Reviews</option>
                  <option value="rating">Highest Rating</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8C7A70] absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Body: Filter Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-[#EBDCCB] p-5 shadow-xs space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F3ECE2]">
                <span className="font-serif font-bold text-base text-[#2C1A11]">Filters</span>
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#8B5E3C] hover:text-[#724827] flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7A70] mb-3">
                  Categories
                </h4>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => {
                    const count = cat === 'All'
                      ? BAKERY_PRODUCTS.length
                      : BAKERY_PRODUCTS.filter((p) => p.category === cat).length;
                    const isSelected = selectedCategory === cat;

                    return (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#8B5E3C] text-white font-bold shadow-xs'
                            : 'text-[#443229] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-[#F3ECE2] text-[#8C7A70]'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter */}
              <div className="pt-4 border-t border-[#F3ECE2]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold uppercase tracking-wider text-[#8C7A70]">
                    Price Up To
                  </span>
                  <span className="font-bold text-[#8B5E3C]">AED {maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#8B5E3C] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#A89485] mt-1">
                  <span>AED 10</span>
                  <span>AED 250</span>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="pt-4 border-t border-[#F3ECE2] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A70] block mb-2">
                  Highlights
                </span>
                <label className="flex items-center gap-2 text-xs text-[#2C1A11] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyBestSellers}
                    onChange={(e) => setOnlyBestSellers(e.target.checked)}
                    className="rounded accent-[#8B5E3C] w-4 h-4"
                  />
                  <span>Best Sellers Only</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-[#2C1A11] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyOffers}
                    onChange={(e) => setOnlyOffers(e.target.checked)}
                    className="rounded accent-[#8B5E3C] w-4 h-4"
                  />
                  <span>Special Offers Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {/* Active Filters Display */}
            <div className="flex items-center justify-between text-xs text-[#725E52] mb-4">
              <span>
                Showing <strong className="text-[#2C1A11]">{filteredProducts.length}</strong> delicious products
              </span>
              {(selectedCategory !== 'All' || searchTerm || maxPrice < 250 || onlyBestSellers || onlyOffers) && (
                <button
                  onClick={resetFilters}
                  className="text-[#8B5E3C] hover:underline font-semibold flex items-center gap-1"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#EBDCCB] p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF2E6] flex items-center justify-center text-[#8B5E3C] mx-auto">
                  <Search className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2C1A11]">
                  No Bakery Items Found
                </h3>
                <p className="text-sm text-[#725E52] max-w-md mx-auto">
                  We couldn't find any products matching your current filters. Try changing your search keywords or resetting your price and category options.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#8B5E3C] text-white rounded-xl text-xs font-bold hover:bg-[#724827] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal/Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs" 
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EBDCCB]">
                <h3 className="font-serif text-xl font-bold text-[#2C1A11]">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-[#5A453A] hover:bg-[#F3ECE2]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7A70] mb-3">
                  Categories
                </h4>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                        selectedCategory === cat
                          ? 'bg-[#8B5E3C] text-white font-bold'
                          : 'text-[#2C1A11] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 pt-4 border-t border-[#F3ECE2]">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold text-[#8C7A70]">Max Price:</span>
                  <span className="font-bold text-[#8B5E3C]">AED {maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#8B5E3C]"
                />
              </div>

              {/* Checkboxes */}
              <div className="mt-6 pt-4 border-t border-[#F3ECE2] space-y-2 text-xs">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={onlyBestSellers}
                    onChange={(e) => setOnlyBestSellers(e.target.checked)}
                    className="accent-[#8B5E3C]"
                  />
                  <span>Best Sellers Only</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={onlyOffers}
                    onChange={(e) => setOnlyOffers(e.target.checked)}
                    className="accent-[#8B5E3C]"
                  />
                  <span>Special Offers Only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EBDCCB] space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#8B5E3C] text-white rounded-xl text-xs font-bold text-center"
              >
                Apply Filters ({filteredProducts.length} items)
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2.5 border border-[#D9C3B0] text-[#725E52] rounded-xl text-xs font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
