import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BUSINESS_INFO } from '../../data/business';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    deliveryFee, 
    total,
    itemCount 
  } = useCart();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const freeDeliveryRemaining = Math.max(0, BUSINESS_INFO.freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / BUSINESS_INFO.freeDeliveryThreshold) * 100);

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="cart-drawer-modal">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Slide-out drawer */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 border-l border-[#EBDCCB]">
        {/* Header */}
        <div className="p-5 border-b border-[#EBDCCB] flex items-center justify-between bg-[#F5EBE1]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8B5E3C]" />
            <h2 className="font-serif text-xl font-bold text-[#2C1A11]">Your Fresh Basket</h2>
            <span className="text-xs bg-[#EBDCCB] text-[#724827] px-2 py-0.5 rounded-full font-semibold">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-[#5A453A] hover:text-[#2C1A11] rounded-full hover:bg-[#EBDCCB] transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-[#FAF2E6] px-5 py-3 border-b border-[#EBDCCB]">
          <div className="flex items-center gap-2 text-xs text-[#5A453A] mb-1.5">
            <Truck className="w-4 h-4 text-[#8B5E3C]" />
            {freeDeliveryRemaining > 0 ? (
              <span>Add <strong className="text-[#8B5E3C]">AED {freeDeliveryRemaining}</strong> more for <strong>FREE Sharjah Delivery!</strong></span>
            ) : (
              <span className="font-semibold text-[#386641]">Congratulations! You unlocked FREE Sharjah Delivery!</span>
            )}
          </div>
          <div className="w-full bg-[#E5D5C5] h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#8B5E3C] h-full transition-all duration-300"
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EBDCCB]/70">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#8B5E3C]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2C1A11]">Your cart is empty</h3>
                <p className="text-xs text-[#725E52] mt-1 max-w-xs">
                  Discover our freshly baked artisan cakes, warm croissants, cookies, and sourdough!
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/shop');
                }}
                className="px-5 py-2.5 bg-[#8B5E3C] text-white rounded-lg text-sm font-semibold hover:bg-[#724827] transition-colors"
              >
                Browse Bakery
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}`} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl border border-[#EBDCCB] shrink-0"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80');
                  }}
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-[#2C1A11] leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      {item.selectedSize && (
                        <p className="text-xs text-[#8C7A70] mt-0.5">{item.selectedSize}</p>
                      )}
                      {item.customMessage && (
                        <p className="text-[11px] text-[#8B5E3C] italic mt-0.5">"{item.customMessage}"</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="text-[#A89485] hover:text-[#B91C1C] p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#D9C3B0] rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                        className="p-1.5 text-[#5A453A] hover:bg-[#F3ECE2] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#2C1A11]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                        className="p-1.5 text-[#5A453A] hover:bg-[#F3ECE2] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-bold text-[#2C1A11]">
                      AED {item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#EBDCCB] bg-[#F5EBE1] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5A453A]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#2C1A11]">AED {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery (Sharjah)</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-[#386641] font-semibold">FREE</span>
                  ) : (
                    `AED ${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2C1A11] pt-2 border-t border-[#EBDCCB]">
                <span>Total</span>
                <span className="text-[#8B5E3C]">AED {total}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleViewCartClick}
                className="w-full py-2.5 px-3 border border-[#8B5E3C] text-[#8B5E3C] hover:bg-[#EBDCCB] rounded-xl text-xs font-bold transition-colors text-center"
              >
                View Full Cart
              </button>
              <button
                onClick={handleCheckoutClick}
                className="w-full py-2.5 px-3 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-center text-[#8C7A70]">
              No payment required online. Pay upon delivery or pickup in Sharjah.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
