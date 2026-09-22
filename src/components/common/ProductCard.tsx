import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden border border-[#EBDCCB] hover:border-[#D9C3B0] transition-all duration-300 hover:shadow-lg flex flex-col h-full"
      id={`product-card-${product.id}`}
    >
      {/* Image Container with Badges and Overlay Actions */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#F5EBE1]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLElement).setAttribute(
              'src',
              'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'
            );
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.bestSeller && (
            <span className="bg-[#8B5E3C] text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Best Seller
            </span>
          )}
          {discountPercent && (
            <span className="bg-[#B91C1C] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            wishlisted
              ? 'bg-[#B91C1C] text-white'
              : 'bg-white/85 text-[#5A453A] hover:bg-white hover:text-[#B91C1C]'
          } shadow-sm backdrop-blur-xs`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-[#2C1A11] p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-semibold"
            aria-label="Quick preview"
          >
            <Eye className="w-4 h-4 text-[#8B5E3C]" />
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
            <span className="text-[#8B5E3C] font-semibold uppercase tracking-wider text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#2C1A11]">
              <Star className="w-3.5 h-3.5 fill-[#E5BA73] text-[#E5BA73]" />
              <span className="font-bold text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-[#8C7A70] text-[11px]">({product.reviews})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C1A11] hover:text-[#8B5E3C] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-[#725E52] mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="pt-4 mt-3 border-t border-[#F3ECE2] flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-[#2C1A11]">
                AED {product.price}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-[#A89485] line-through">
                  AED {product.oldPrice}
                </span>
              )}
            </div>
            {product.portionSize && (
              <span className="text-[10px] text-[#8C7A70] line-clamp-1">{product.portionSize}</span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center justify-center gap-1.5 bg-[#8B5E3C] hover:bg-[#724827] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm active:scale-95"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
