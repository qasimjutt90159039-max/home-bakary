import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Truck, 
  Store, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  AlertCircle,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_INFO } from '../data/business';
import { OrderDetails, CartItem } from '../types';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#2C1A11]">Your Basket is Empty</h2>
        <p className="text-sm text-[#725E52] mt-2 mb-6">
          Please add items to your basket before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#8B5E3C] text-white font-bold rounded-xl text-xs hover:bg-[#724827] transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // Delivery type: delivery or pickup
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');

  // Customer info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Delivery address
  const [addressArea, setAddressArea] = useState('');
  const [addressCity, setAddressCity] = useState('Sharjah');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Schedule
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // tomorrow default
  );
  const [timeSlot, setTimeSlot] = useState('Afternoon (1:00 PM - 5:00 PM)');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card_on_delivery' | 'pickup_pay'>(
    'cod'
  );

  // Validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delivery fee logic for checkout: if pickup, delivery fee is 0
  const effectiveDeliveryFee = deliveryType === 'pickup' ? 0 : deliveryFee;
  const finalTotal = subtotal + effectiveDeliveryFee;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!phone.trim()) {
      newErrors.phone = 'Please provide a valid UAE contact number.';
    } else if (phone.trim().length < 7) {
      newErrors.phone = 'Phone number is too short.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please provide your email address for order confirmation.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (deliveryType === 'delivery') {
      if (!addressArea.trim()) {
        newErrors.addressArea = 'Please provide your street, building, and apartment details.';
      }
      if (!addressCity.trim()) {
        newErrors.addressCity = 'Please enter your city/emirate.';
      }
    }

    if (!deliveryDate) {
      newErrors.deliveryDate = 'Please select a delivery date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // scroll to first error
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const orderNumber = `HBK-${Date.now().toString().slice(-6)}`;
    const newOrder: OrderDetails = {
      orderNumber,
      createdAt: new Date().toISOString(),
      items: [...items],
      subtotal,
      deliveryFee: effectiveDeliveryFee,
      total: finalTotal,
      deliveryType,
      customer: {
        fullName,
        phone,
        email,
        address:
          deliveryType === 'delivery'
            ? `${addressArea}, ${addressCity}, United Arab Emirates`
            : undefined,
        city: addressCity,
        notes: deliveryNotes || undefined,
      },
      preferredDate: deliveryDate,
      timeSlot,
      paymentMethod:
        paymentMethod === 'cod'
          ? 'Cash on Delivery'
          : paymentMethod === 'card_on_delivery'
          ? 'Card Machine on Delivery'
          : 'Pay upon Kitchen Pickup',
      status: 'Confirmed & Baking Scheduled',
    };

    // Store in localStorage
    try {
      localStorage.setItem('hbk_latest_order', JSON.stringify(newOrder));
      const previousOrders = JSON.parse(localStorage.getItem('hbk_orders_history') || '[]');
      localStorage.setItem('hbk_orders_history', JSON.stringify([newOrder, ...previousOrders]));
    } catch {
      // ignore
    }

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success?orderId=${orderNumber}`);
    }, 700);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B5E3C] hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Basket</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A11]">
            Checkout & Confirmation
          </h1>
          <p className="text-xs sm:text-sm text-[#725E52] mt-1">
            Complete your order details. No advance online payment required.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Checkout Fields (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Delivery Option Selector */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EBDCCB] shadow-xs">
              <h2 className="font-serif text-xl font-bold text-[#2C1A11] mb-4">
                1. Fulfillment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    deliveryType === 'delivery'
                      ? 'border-[#8B5E3C] bg-[#FAF2E6]/50 ring-2 ring-[#8B5E3C]/20'
                      : 'border-[#EBDCCB] hover:border-[#D9C3B0] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] text-[#8B5E3C] flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    {deliveryType === 'delivery' && (
                      <span className="w-5 h-5 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <h3 className="font-bold text-sm text-[#2C1A11]">Refrigerated Delivery</h3>
                    <p className="text-xs text-[#725E52] mt-0.5">
                      Temperature-controlled van across Sharjah
                    </p>
                    <span className="text-xs font-bold text-[#8B5E3C] block mt-1">
                      {deliveryFee === 0 ? 'FREE' : `AED ${deliveryFee}`}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDeliveryType('pickup');
                    setPaymentMethod('pickup_pay');
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    deliveryType === 'pickup'
                      ? 'border-[#8B5E3C] bg-[#FAF2E6]/50 ring-2 ring-[#8B5E3C]/20'
                      : 'border-[#EBDCCB] hover:border-[#D9C3B0] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] text-[#8B5E3C] flex items-center justify-center">
                      <Store className="w-5 h-5" />
                    </div>
                    {deliveryType === 'pickup' && (
                      <span className="w-5 h-5 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <h3 className="font-bold text-sm text-[#2C1A11]">Kitchen Pickup</h3>
                    <p className="text-xs text-[#725E52] mt-0.5">
                      Arada by Al Jada - Muwaileh Commercial
                    </p>
                    <span className="text-xs font-bold text-[#386641] block mt-1">
                      Free Pickup (Always AED 0)
                    </span>
                  </div>
                </button>
              </div>

              {deliveryType === 'pickup' && (
                <div className="mt-4 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EBDCCB] text-xs text-[#5A453A] flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#8B5E3C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#2C1A11]">Pickup Address:</strong> {BUSINESS_INFO.address}. Ready approximately 2 hours after kitchen confirmation.
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Customer Contact Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EBDCCB] shadow-xs">
              <h2 className="font-serif text-xl font-bold text-[#2C1A11] mb-4">
                2. Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maryam Al-Maktoum"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-[#B91C1C] mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                    UAE Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +971 50 987 6543"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-[#B91C1C] mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-[#B91C1C] mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: Address (Only if Delivery selected) */}
            {deliveryType === 'delivery' && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EBDCCB] shadow-xs">
                <h2 className="font-serif text-xl font-bold text-[#2C1A11] mb-4">
                  3. Delivery Address in Sharjah / UAE
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                      Street, Building Name, Villa / Apartment Number *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Al Zahia Villa 14, or Muwaileh Commercial Tower 2 Apt 405"
                      value={addressArea}
                      onChange={(e) => setAddressArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                    />
                    {errors.addressArea && (
                      <p className="text-[11px] text-[#B91C1C] mt-1">{errors.addressArea}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                        Emirate / City
                      </label>
                      <input
                        type="text"
                        value={addressCity}
                        onChange={(e) => setAddressCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                        Driver Landmark or Delivery Notes
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Gate code, ring bell, leave at reception"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Timing & Slot */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EBDCCB] shadow-xs">
              <h2 className="font-serif text-xl font-bold text-[#2C1A11] mb-4">
                4. Schedule Date & Time Slot
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                  />
                  {errors.deliveryDate && (
                    <p className="text-[11px] text-[#B91C1C] mt-1">{errors.deliveryDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                  >
                    <option value="Morning (9:00 AM - 1:00 PM)">Morning (9:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 9:00 PM)">Evening (5:00 PM - 9:00 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 5: Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EBDCCB] shadow-xs">
              <h2 className="font-serif text-xl font-bold text-[#2C1A11] mb-2">
                5. Payment Method
              </h2>
              <p className="text-xs text-[#725E52] mb-4">
                Zero advance online charge. Settle conveniently upon receipt.
              </p>

              <div className="space-y-3">
                {deliveryType === 'delivery' ? (
                  <>
                    <label className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-[#8B5E3C] bg-[#FAF2E6]/40' : 'border-[#EBDCCB]'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="accent-[#8B5E3C]"
                        />
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-[#2C1A11] block">
                            Cash on Delivery
                          </span>
                          <span className="text-[11px] text-[#725E52]">
                            Pay exact cash in AED directly to the delivery courier.
                          </span>
                        </div>
                      </div>
                      <Banknote className="w-5 h-5 text-[#8B5E3C]" />
                    </label>

                    <label className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card_on_delivery' ? 'border-[#8B5E3C] bg-[#FAF2E6]/40' : 'border-[#EBDCCB]'
                    }`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card_on_delivery'}
                          onChange={() => setPaymentMethod('card_on_delivery')}
                          className="accent-[#8B5E3C]"
                        />
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-[#2C1A11] block">
                            Card on Delivery (POS Machine)
                          </span>
                          <span className="text-[11px] text-[#725E52]">
                            Driver will bring a wireless POS terminal (Visa, Mastercard, Apple Pay).
                          </span>
                        </div>
                      </div>
                      <CreditCard className="w-5 h-5 text-[#8B5E3C]" />
                    </label>
                  </>
                ) : (
                  <label className="p-4 rounded-2xl border-2 border-[#8B5E3C] bg-[#FAF2E6]/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={true}
                        readOnly
                        className="accent-[#8B5E3C]"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#2C1A11] block">
                          Pay at Bakery Kitchen Counter
                        </span>
                        <span className="text-[11px] text-[#725E52]">
                          Settle via Cash, Card, or Apple Pay when collecting at Arada by Al Jada.
                        </span>
                      </div>
                    </div>
                    <Store className="w-5 h-5 text-[#8B5E3C]" />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EBDCCB] shadow-sm sticky top-24 space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#2C1A11] pb-3 border-b border-[#F3ECE2]">
                Review Order ({items.length} items)
              </h2>

              {/* Items List */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-[#F3ECE2]">
                {items.map((it: CartItem) => (
                  <div key={it.id || `${it.product.id}-${it.selectedSize || 'def'}`} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={it.product.image}
                        alt={it.product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-[#F5EBE1] shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-[#2C1A11] leading-snug">{it.product.name}</h4>
                        <span className="text-[#8C7A70]">
                          Qty: {it.quantity} {it.selectedSize ? `• ${it.selectedSize}` : ''}
                        </span>
                        {it.customGreeting && (
                          <span className="block text-[#8B5E3C] italic text-[10px]">
                            "{it.customGreeting}"
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-[#2C1A11] shrink-0">
                      AED {it.product.price * it.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="pt-4 border-t border-[#F3ECE2] space-y-2.5 text-xs text-[#5A453A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#2C1A11]">AED {subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>
                    {deliveryType === 'delivery' ? 'Sharjah Courier Delivery' : 'Kitchen Pickup'}
                  </span>
                  <span className="font-bold text-[#2C1A11]">
                    {effectiveDeliveryFee === 0 ? (
                      <span className="text-[#386641] font-bold">FREE</span>
                    ) : (
                      `AED ${effectiveDeliveryFee}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#F3ECE2] flex justify-between text-base font-extrabold text-[#2C1A11]">
                  <span>Total Amount Due</span>
                  <span className="text-xl text-[#8B5E3C]">AED {finalTotal}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>Registering Order & Scheduling Ovens...</span>
                  ) : (
                    <span>Place Bakery Order (AED {finalTotal})</span>
                  )}
                </button>

                <p className="text-center text-[11px] text-[#8C7A70] mt-3 leading-snug">
                  By clicking Place Order, your kitchen ticket will be registered. You will receive an immediate confirmation code and chef scheduling.
                </p>
              </div>

              {/* Guarantee */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-xl text-[11px] text-[#725E52] flex items-center gap-2 border border-[#EBDCCB]">
                <ShieldCheck className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                <span>
                  Questions or immediate changes? Call our Al Jada kitchen team at <strong>+971 6 531 5847</strong>.
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
