import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { BAKERY_FAQS } from '../data/faq';
import { BUSINESS_INFO } from '../data/business';
import { Link } from 'react-router-dom';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C] bg-[#F3ECE2] px-3.5 py-1 rounded-full border border-[#EBDCCB]">
            Frequently Asked Questions
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C1A11] mt-3">
            Bakery Orders & Delivery FAQ
          </h1>
          <p className="text-sm sm:text-base text-[#725E52] mt-2">
            Everything you need to know about our fresh baking cycles, delivery coverage in Sharjah, custom celebration orders, and storage tips.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {BAKERY_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#EBDCCB] overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#2C1A11]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FAF7F2] text-[#8B5E3C] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#8B5E3C] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#5A453A] leading-relaxed border-t border-[#F3ECE2] pt-4">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-[#EBDCCB] text-center space-y-3 shadow-xs">
          <h3 className="font-serif text-2xl font-bold text-[#2C1A11]">
            Still have a question?
          </h3>
          <p className="text-xs sm:text-sm text-[#725E52] max-w-md mx-auto">
            Our kitchen team in Arada by Al Jada is happy to answer any questions regarding custom orders, ingredients, or urgent dispatch.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="px-6 py-2.5 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +971 6 531 5847</span>
            </a>
            <Link
              to="/contact"
              className="px-6 py-2.5 border border-[#D9C3B0] text-[#2C1A11] rounded-xl text-xs font-bold hover:bg-[#FAF7F2] transition-colors"
            >
              Contact Us Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
