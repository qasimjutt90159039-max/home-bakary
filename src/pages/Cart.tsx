import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/business';
import { CartItem } from '../types';

export const Cart: React.FC = () => {
  const { 
    items, 
    subtotal, 
    deliveryFee, 
    total, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    freeDeliveryThreshold 
  } = useCart();

  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-[#F3ECE2] text-[#8B5E3C] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A11]">
            Your Bakery Basket Is Empty
          </h1>
          <p className="text-sm sm:text-base text-[#725E52] mt-3 mb-8 max-w-md mx-auto">
            Discover our fresh morning croissants, celebration cakes, and warm sourdough loaves baked in Al Jada.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="px-7 py-3.5 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-sm font-bold transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Bakery Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/offers"
              className="px-6 py-3.5 bg-white border border-[#D9C3B0] text-[#2C1A11] rounded-xl text-sm font-bold hover:bg-[#FAF7F2] transition-colors"
            >
              View Specials & Offers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A11]">
              Your Fresh Basket
            </h1>
            <p className="text-xs sm:text-sm text-[#725E52] mt-1">
              Carefully baked and dispatched from our kitchen in Arada by Al Jada, Sharjah.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#B91C1C] hover:underline font-semibold"
          >
            Clear Basket
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-white rounded-2xl border border-[#EBDCCB] p-4 sm:p-5 mb-8 shadow-xs">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2">
            <div className="flex items-center gap-2 text-[#2C1A11]">
              <Truck className="w-4 h-4 text-[#8B5E3C]" />
              {remainingForFreeDelivery > 0 ? (
                <span>
                  Add <strong className="text-[#8B5E3C]">AED {remainingForFreeDelivery}</strong> more for <strong className="text-[#386641]">FREE Delivery</strong> in Sharjah!
                </span>
              ) : (
                <span className="text-[#386641] font-extrabold">
                  🎉 You have qualified for FREE Delivery in Sharjah!
                </span>
              )}
            </div>
            <span className="text-xs text-[#8C7A70]">{freeDeliveryProgress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-[#FAF7F2] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8B5E3C] to-[#E5BA73] transition-all duration-300 rounded-full"
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Two Columns: Products List + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart items list (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item: CartItem) => {
              const itemKey = item.id || `${item.product.id}-${item.selectedSize || 'default'}`;
              const itemId = item.id || item.product.id;
              return (
              <div
                key={itemKey}
                className="bg-white rounded-2xl border border-[#EBDCCB] p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 shadow-xs"
              >
                {/* Image + Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 bg-[#F5EBE1]"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B5E3C] bg-[#FAF2E6] px-2 py-0.5 rounded-md">
                      {item.product.category}
                    </span>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#2C1A11] mt-1">
                      <Link to={`/product/${item.product.id}`} className="hover:text-[#8B5E3C]">
                        {item.product.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#8C7A70]">
                      AED {item.product.price} each {item.selectedSize ? `• ${item.selectedSize}` : ''}
                    </p>
                    {item.customGreeting && (
                      <p className="text-xs text-[#8B5E3C] italic mt-1 bg-[#FAF7F2] px-2 py-0.5 rounded-md">
                        Greeting: "{item.customGreeting}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity + Item Total + Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F3ECE2]">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-[#D9C3B0] rounded-xl bg-[#FAF7F2] p-0.5">
                    <button
                      onClick={() => updateQuantity(itemId, item.quantity - 1, item.selectedSize)}
                      className="p-1.5 text-[#5A453A] hover:bg-white rounded-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-xs text-[#2C1A11]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(itemId, item.quantity + 1, item.selectedSize)}
                      className="p-1.5 text-[#5A453A] hover:bg-white rounded-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal for this item */}
                  <div className="text-right">
                    <span className="font-bold text-base text-[#2C1A11] block">
                      AED {item.product.price * item.quantity}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(itemId, item.selectedSize)}
                    className="p-2 text-[#8C7A70] hover:text-[#B91C1C] transition-colors rounded-lg hover:bg-[#FAF7F2]"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
            })}

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B5E3C] hover:underline"
              >
                &larr; Continue Shopping More Bakery Delights
              </Link>
            </div>
          </div>

          {/* Summary Column (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border border-[#EBDCCB] p-6 shadow-sm sticky top-24 space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#2C1A11] pb-3 border-b border-[#F3ECE2]">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-[#5A453A]">
                <div className="flex justify-between">
                  <span>Basket Subtotal</span>
                  <span className="font-bold text-[#2C1A11]">AED {subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Sharjah Refrigerated Courier</span>
                  <span className="font-bold text-[#2C1A11]">
                    {deliveryFee === 0 ? (
                      <span className="text-[#386641] font-extrabold">FREE</span>
                    ) : (
                      `AED ${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-[#8C7A70] pt-1">
                  <span>Bakery Kitchen Prep</span>
                  <span>Same-Day Fresh Guarantee</span>
                </div>

                <div className="pt-3 border-t border-[#F3ECE2] flex justify-between text-base font-extrabold text-[#2C1A11]">
                  <span>Estimated Total</span>
                  <span className="text-xl text-[#8B5E3C]">AED {total}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="pt-2 space-y-3">
                <Link
                  to="/checkout"
                  className="w-full py-4 px-6 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-[11px] text-center text-[#8C7A70] leading-snug">
                  Cash or Card on Delivery & Kitchen Pickup options available in checkout.
                </p>
              </div>

              {/* Trust Badge */}
              <div className="pt-4 border-t border-[#F3ECE2] space-y-2 text-[11px] text-[#725E52]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                  <span>Verified local kitchen in Arada by Al Jada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                  <span>Telephone hotline: {BUSINESS_INFO.phoneFormatted}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
