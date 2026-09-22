import React from 'react';
import { BUSINESS_INFO } from '../data/business';

export const Terms: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EBDCCB] p-6 sm:p-12 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C] bg-[#FAF2E6] px-3.5 py-1 rounded-full">
              Legal & Policies
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A11] mt-3">
              Terms & Conditions
            </h1>
            <p className="text-xs text-[#8C7A70] mt-1">
              Home Bakery Kitchen Al Jada • Sharjah, UAE
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-[#5A453A] leading-relaxed border-t border-[#F3ECE2] pt-6">
            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website and ordering baked goods, celebration cakes, or pastries from <strong>Home Bakery Kitchen Al Jada</strong>, you agree to comply with and be bound by the following terms and conditions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                2. Fresh Food Nature & Quality
              </h2>
              <p>
                All items from our kitchen are baked fresh daily without artificial preservatives. Baked goods should be consumed within the advised shelf life: same day for warm viennoiserie, within 48 hours for refrigerated cream cakes, and within 3 days for artisan sourdough when stored in a cool, dry breadbox.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                3. Orders, Pricing & Payment
              </h2>
              <p>
                Prices are listed in UAE Dirhams (AED) and include all applicable taxes. We reserve the right to modify prices or adjust availability based on daily market ingredient quality. Payment is due upon delivery (via cash or card terminal) or upon kitchen pickup at Arada by Al Jada.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                4. Custom Cakes & Special Orders
              </h2>
              <p>
                Submitting a custom cake request through our website forms an inquiry. The order is officially confirmed once our pastry chef contacts you at your provided phone number to finalize design specifications, date, and availability. We recommend placing custom cake requests at least 24–48 hours in advance.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                5. Cancellations & Modifications
              </h2>
              <p>
                Standard bakery orders may be modified or cancelled up to 3 hours prior to the scheduled delivery time by calling our kitchen at <strong>+971 6 531 5847</strong>. Because custom celebration cakes require dedicated ingredient prep and decorating time, custom cake cancellations must be communicated at least 24 hours prior to the scheduled date.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                6. Deliveries & Handover
              </h2>
              <p>
                We use temperature-controlled refrigerated couriers to ensure delicate buttercreams and chocolates arrive intact. Customers must ensure an authorized recipient is available at the provided delivery address during the chosen time window.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-lg text-[#2C1A11]">
                7. Allergen Disclaimer
              </h2>
              <p>
                Our bakery handles wheat flour, dairy, eggs, peanuts, tree nuts, and sesame. While our chefs adhere to strict kitchen hygiene, cross-contact may occur. If you have severe life-threatening allergies, please advise our team prior to ordering.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
