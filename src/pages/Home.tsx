import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { BestSellersSection } from '../components/home/BestSellersSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { SpecialOffersSection } from '../components/home/SpecialOffersSection';
import { CustomCakeBanner } from '../components/home/CustomCakeBanner';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { LocationSection } from '../components/home/LocationSection';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Large Premium Hero */}
      <Hero />

      {/* 2. Featured Categories */}
      <FeaturedCategories />

      {/* 3. Best Sellers */}
      <BestSellersSection />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Special Offers */}
      <SpecialOffersSection />

      {/* 6. Custom Cake Section */}
      <CustomCakeBanner />

      {/* 7. Customer Reviews */}
      <ReviewsSection />

      {/* 8. Location & Contact CTA */}
      <LocationSection />
    </div>
  );
};
