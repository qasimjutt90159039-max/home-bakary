import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingBag, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 border border-[#EBDCCB] animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#2C1A11] rounded-full shadow-sm transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-[#F5EBE1]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.bestSeller && (
              <span className="absolute top-4 left-4 bg-[#8B5E3C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Best Seller
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C]">
                {product.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2C1A11] mt-1">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#E5BA73]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#2C1A11]">
                  {product.rating.toFixed(1)} ({product.reviews} reviews)
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#2C1A11]">
                  AED {product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-[#A89485] line-through">
                    AED {product.oldPrice}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#725E52] mt-3 leading-relaxed">
                {product.description}
              </p>

              {product.portionSize && (
                <div className="mt-4 p-2.5 bg-[#F3ECE2] rounded-xl text-xs text-[#5A453A] flex items-center gap-2">
                  <span className="font-semibold text-[#2C1A11]">Size:</span>
                  <span>{product.portionSize}</span>
                </div>
              )}
            </div>

            <div className="mt-6 pt-5 border-t border-[#EBDCCB] space-y-4">
              {/* Quantity Selector and Add Button */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#D9C3B0] rounded-xl bg-white overflow-hidden p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-[#5A453A] hover:bg-[#F3ECE2] rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-[#2C1A11]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-[#5A453A] hover:bg-[#F3ECE2] rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-5 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Basket • AED {product.price * quantity}</span>
                </button>
              </div>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="w-full text-center block text-xs font-bold text-[#8B5E3C] hover:text-[#724827] transition-colors"
              >
                View Full Details, Ingredients & Allergens →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
