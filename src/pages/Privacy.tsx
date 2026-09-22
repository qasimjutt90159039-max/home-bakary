import React from 'react';
import { ShieldCheck, Lock, Mail, Phone, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

export const Privacy: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EBDCCB] p-6 sm:p-12 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C] bg-[#FAF2E6] px-3.5 py-1 rounded-full">
              Legal & Privacy
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A11] mt-3">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#8C7A70] mt-1">
              Effective Date: January 2025 • Home Bakery Kitchen Al Jada (Sharjah, UAE)
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#5A453A] leading-relaxed border-t border-[#F3ECE2] pt-6">
            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                1. Overview & Commitment
              </h2>
              <p>
                Home Bakery Kitchen Al Jada ("we", "us", or "our"), located at <strong>{BUSINESS_INFO.address}</strong>, operates this online bakery ordering platform. We value your privacy and are committed to protecting the personal information you share with us when browsing our bakery catalogue, placing delivery orders, or requesting bespoke cakes.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                2. Information We Collect
              </h2>
              <p>
                When you interact with our website or place an order, we may collect:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Contact Information:</strong> Full name, telephone number, and email address.</li>
                <li><strong>Fulfillment Details:</strong> Delivery address (building, street, apartment in Sharjah or UAE) or pickup preferences.</li>
                <li><strong>Order Specifications:</strong> Selected bakery products, custom cake flavor selections, personalized message inscriptions, and celebration dates.</li>
                <li><strong>Device Information:</strong> Technical logs such as browser type and screen dimensions used to improve our responsive user experience.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                3. Purpose of Processing
              </h2>
              <p>
                Your information is used strictly to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Bake, pack, and fulfill your bakery goods to your requested specifications.</li>
                <li>Contact you by telephone ({BUSINESS_INFO.phoneFormatted}) for order status updates, delivery directions, or custom design clarification.</li>
                <li>Maintain local basket and user preferences on your browser (via local storage).</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                4. Payment & Financial Security
              </h2>
              <p>
                Our platform does not process, store, or solicit credit card numbers or sensitive banking credentials online. All transactions are settled via Cash on Delivery, handheld POS terminal upon arrival, or directly at our bakery kitchen counter.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                5. Disclosure to Third Parties
              </h2>
              <p>
                We do not sell, rent, or trade your personal information. Details are shared solely with authorized kitchen personnel and licensed local couriers responsible for bringing your order to your door.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                6. Kitchen Contact
              </h2>
              <p>
                For questions regarding this policy or to update your contact details, please contact:
              </p>
              <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EBDCCB] text-xs">
                <p><strong>Home Bakery Kitchen Al Jada</strong></p>
                <p>{BUSINESS_INFO.address}</p>
                <p>Phone: {BUSINESS_INFO.phoneFormatted}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
