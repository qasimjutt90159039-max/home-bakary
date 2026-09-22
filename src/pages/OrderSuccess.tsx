import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  ShoppingBag, 
  ArrowRight, 
  Printer, 
  Store,
  Truck
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import { OrderDetails, CartItem } from '../types';

export const OrderSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'HBK-749210';
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hbk_latest_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card */}
        <div className="bg-white rounded-3xl border border-[#EBDCCB] p-6 sm:p-12 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-[#EBF2EA] text-[#386641] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C] bg-[#FAF2E6] px-3.5 py-1 rounded-full border border-[#EBDCCB]">
            Order Successfully Registered
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A11] mt-3">
            Thank You For Your Bakery Order!
          </h1>

          <p className="text-sm text-[#725E52] mt-2 max-w-lg mx-auto leading-relaxed">
            Our master bakers in Sharjah have received your kitchen ticket and are preparing your fresh artisanal bakes with the utmost care.
          </p>

          {/* Reference Badge */}
          <div className="mt-6 inline-block bg-[#FAF7F2] border border-[#D9C3B0] rounded-2xl px-6 py-3">
            <span className="text-xs text-[#8C7A70] block font-semibold uppercase tracking-wider">
              Order Reference Number
            </span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#8B5E3C]">
              {order ? order.orderNumber : orderId}
            </span>
          </div>

          {/* Details Grid */}
          <div className="mt-8 text-left border-t border-[#F3ECE2] pt-6 space-y-6">
            {/* Fulfillment info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5A453A]">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB] space-y-2">
                <span className="font-bold text-[#2C1A11] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  {order?.deliveryType === 'pickup' ? (
                    <>
                      <Store className="w-4 h-4 text-[#8B5E3C]" />
                      <span>Fulfillment: Kitchen Pickup</span>
                    </>
                  ) : (
                    <>
                      <Truck className="w-4 h-4 text-[#8B5E3C]" />
                      <span>Fulfillment: Courier Delivery</span>
                    </>
                  )}
                </span>
                <p>
                  <strong>Customer:</strong> {order ? order.customer.fullName : 'Valued Customer'}
                </p>
                <p>
                  <strong>Phone:</strong> {order ? order.customer.phone : '+971 Contact'}
                </p>
                {order?.customer.address && (
                  <p>
                    <strong>Delivery Address:</strong> {order.customer.address}
                  </p>
                )}
                {order?.deliveryType === 'pickup' && (
                  <p>
                    <strong>Pick Up Location:</strong> {BUSINESS_INFO.address}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB] space-y-2">
                <span className="font-bold text-[#2C1A11] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Clock className="w-4 h-4 text-[#8B5E3C]" />
                  <span>Scheduled Schedule & Payment</span>
                </span>
                <p>
                  <strong>Date:</strong> {order ? order.preferredDate : 'As scheduled'}
                </p>
                <p>
                  <strong>Window:</strong> {order ? order.timeSlot : 'Standard slot'}
                </p>
                <p>
                  <strong>Payment:</strong> {order ? order.paymentMethod : 'Cash / Card on delivery'}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className="text-[#386641] font-semibold">Confirmed & Baking</span>
                </p>
              </div>
            </div>

            {/* Items Summary if available */}
            {order && order.items.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBDCCB]">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#725E52] mb-3">
                  Ordered Items
                </h4>
                <div className="space-y-2 divide-y divide-[#F3ECE2]">
                  {order.items.map((item: CartItem) => (
                    <div key={item.id || `${item.product.id}-${item.selectedSize || 'item'}`} className="pt-2 first:pt-0 flex justify-between text-xs text-[#2C1A11]">
                      <span>
                        {item.quantity}x {item.product.name}{' '}
                        {item.selectedSize ? `(${item.selectedSize})` : ''}
                      </span>
                      <span className="font-semibold">AED {item.product.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="pt-3 flex justify-between font-extrabold text-sm text-[#2C1A11]">
                    <span>Total Amount</span>
                    <span className="text-[#8B5E3C]">AED {order.total}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Exact Bakery Kitchen Contact Card */}
            <div className="p-5 rounded-2xl bg-[#FAF2E6] border border-[#EBDCCB] text-xs text-[#5A453A] space-y-2">
              <h4 className="font-serif font-bold text-base text-[#2C1A11]">
                {BUSINESS_INFO.name}
              </h4>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8B5E3C] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                <span>
                  Kitchen Dispatch Hotline:{' '}
                  <a href={BUSINESS_INFO.phoneTel} className="font-bold text-[#8B5E3C] hover:underline">
                    {BUSINESS_INFO.phoneFormatted}
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-[#F3ECE2] flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-white border border-[#D9C3B0] text-[#2C1A11] rounded-xl text-xs font-bold hover:bg-[#FAF7F2] transition-colors inline-flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#8B5E3C]" />
              <span>Print Kitchen Receipt</span>
            </button>
            <Link
              to="/shop"
              className="px-6 py-2.5 bg-[#8B5E3C] text-white rounded-xl text-xs font-bold hover:bg-[#724827] transition-colors inline-flex items-center gap-2"
            >
              <span>Continue Browsing Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
