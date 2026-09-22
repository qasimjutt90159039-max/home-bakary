import React from 'react';
import { 
  Flame, 
  Sparkles, 
  Palette, 
  Cake, 
  Smartphone, 
  HeartHandshake 
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Flame,
      title: 'Freshly Prepared',
      description: 'We do not sell day-old baked goods. Our kitchen fires ovens at dawn so you enjoy warm, flaky, and moist textures made that very day.'
    },
    {
      icon: Sparkles,
      title: 'Quality Ingredients',
      description: 'Genuine French AOP butter, real Madagascar bourbon vanilla, unbleached flours, and Belgian chocolate. No hydrogenated oils or shortcuts.'
    },
    {
      icon: Palette,
      title: 'Beautiful Presentation',
      description: 'Every cake and pastry is finished by skilled hands with elegant piping, delicate sugar pearls, edible gold dust, or fresh fruit accents.'
    },
    {
      icon: Cake,
      title: 'Custom Orders',
      description: 'Bespoke cakes tailored to your celebrations in Sharjah. Choose your sponge, fillings, colors, and personalized edible greetings.'
    },
    {
      icon: Smartphone,
      title: 'Convenient Ordering',
      description: 'Order seamlessly online without upfront payment. Review your request and settle smoothly on delivery or kitchen pickup.'
    },
    {
      icon: HeartHandshake,
      title: 'Customer Focused',
      description: 'Our Al Jada kitchen team is always just a phone call away at +971 6 531 5847 for special requests, diet notes, and delivery updates.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          centered
          badge="The Home Bakery Standard"
          title="Why Choose Our Bakery Kitchen"
          subtitle="We craft each recipe with artisanal integrity, bringing restaurant-grade pastry craftsmanship into homes across Sharjah."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 bg-white rounded-2xl border border-[#EBDCCB] hover:border-[#D9C3B0] transition-all hover:shadow-md flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF2E6] text-[#8B5E3C] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2C1A11] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#725E52] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
