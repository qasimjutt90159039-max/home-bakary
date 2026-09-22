import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cake, 
  Phone, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  Clock, 
  Instagram, 
  Facebook, 
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/business';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#241A15] text-[#FAF7F2] pt-16 pb-8 border-t-4 border-[#8B5E3C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3D2C24]">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B5E3C] flex items-center justify-center text-[#FAF7F2]">
                <Cake className="w-5 h-5 text-[#E5BA73]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-[#FAF7F2]">
                  Home Bakery Kitchen
                </span>
                <span className="text-[10px] tracking-widest text-[#E5BA73] uppercase font-medium">
                  Al Jada • Sharjah, UAE
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-[#D9C3B0] leading-relaxed max-w-md">
              Freshly baked every morning with French butter, natural leaven, and pure ingredients. Handcrafting artisan celebration cakes, flaky pastries, sourdough, and wholesome treats for Sharjah.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-[#EBDCCB]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E5BA73] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E5BA73] shrink-0" />
                <a href={BUSINESS_INFO.phoneTel} className="hover:text-white font-medium transition-colors">
                  {BUSINESS_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E5BA73] shrink-0" />
                <span>Fresh Morning Baking & Daily Deliveries</span>
              </div>
            </div>

            {/* Social media icons as UI placeholders */}
            <div className="pt-3">
              <span className="text-xs text-[#A89485] block mb-2 font-medium">Connect With Us</span>
              <div className="flex items-center gap-3 text-[#D9C3B0]">
                <span className="p-2 rounded-full bg-[#33241D] hover:bg-[#8B5E3C] hover:text-white transition-colors cursor-pointer" title="Instagram (Placeholder)">
                  <Instagram className="w-4 h-4" />
                </span>
                <span className="p-2 rounded-full bg-[#33241D] hover:bg-[#8B5E3C] hover:text-white transition-colors cursor-pointer" title="Facebook (Placeholder)">
                  <Facebook className="w-4 h-4" />
                </span>
                <span className="p-2 rounded-full bg-[#33241D] hover:bg-[#8B5E3C] hover:text-white transition-colors cursor-pointer" title="WhatsApp (Placeholder)">
                  <MessageCircle className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-sm">
            <h4 className="font-serif text-base font-bold text-[#E5BA73] tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2 text-[#D9C3B0]">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop Bakery</Link></li>
              <li><Link to="/menu" className="hover:text-white transition-colors">Bakery Menu</Link></li>
              <li><Link to="/best-sellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link to="/offers" className="hover:text-white transition-colors">Special Offers</Link></li>
              <li>
                <Link to="/custom-cakes" className="hover:text-white transition-colors flex items-center gap-1.5 text-[#E5BA73]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Cakes</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3 text-sm">
            <h4 className="font-serif text-base font-bold text-[#E5BA73] tracking-wide">
              Categories
            </h4>
            <ul className="space-y-2 text-[#D9C3B0]">
              <li><Link to="/shop?category=Cakes" className="hover:text-white transition-colors">Artisan Cakes</Link></li>
              <li><Link to="/shop?category=Cupcakes" className="hover:text-white transition-colors">Gourmet Cupcakes</Link></li>
              <li><Link to="/shop?category=Pastries" className="hover:text-white transition-colors">French Pastries</Link></li>
              <li><Link to="/shop?category=Cookies" className="hover:text-white transition-colors">Warm Cookies</Link></li>
              <li><Link to="/shop?category=Bread" className="hover:text-white transition-colors">Sourdough & Bread</Link></li>
              <li><Link to="/shop?category=Desserts" className="hover:text-white transition-colors">Cheesecakes & Desserts</Link></li>
              <li><Link to="/shop?category=Breakfast" className="hover:text-white transition-colors">Breakfast Boxes</Link></li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3 text-sm">
            <h4 className="font-serif text-base font-bold text-[#E5BA73] tracking-wide">
              Customer Care
            </h4>
            <ul className="space-y-2 text-[#D9C3B0]">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/our-story" className="hover:text-white transition-colors">Our Story & Craft</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact & Location</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Bakery FAQs</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89485]">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Muwaileh Commercial, Sharjah, UAE</span>
            <span>•</span>
            <span>Handcrafted Daily</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
