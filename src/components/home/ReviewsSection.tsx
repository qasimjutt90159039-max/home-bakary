import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { BAKERY_REVIEWS } from '../../data/reviews';
import { SectionHeading } from '../common/SectionHeading';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          centered
          badge="Community Impressions"
          title="Loved By Dessert Enthusiasts in Sharjah"
          subtitle="Read real experiences from families, breakfast clubs, and celebration hosts across Muwaileh and Al Jada."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BAKERY_REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EBDCCB] hover:border-[#D9C3B0] transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#E5BA73]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#EBDCCB]" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#443229] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-5 mt-5 border-t border-[#F3ECE2] flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2C1A11]">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#8C7A70] mt-0.5">
                    <MapPin className="w-3 h-3 text-[#8B5E3C]" />
                    <span>{review.location}</span>
                  </div>
                </div>

                {review.productMentioned && (
                  <span className="text-[10px] bg-[#FAF2E6] text-[#8B5E3C] font-semibold px-2.5 py-1 rounded-full border border-[#EBDCCB]">
                    {review.productMentioned}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#A89485] mt-8">
          * Authentic customer reviews gathered from our Sharjah bakery kitchen patrons and delivery feedback.
        </p>
      </div>
    </section>
  );
};
