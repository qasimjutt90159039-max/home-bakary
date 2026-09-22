import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Heart, 
  Cake, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BUSINESS_INFO } from '../../data/business';

export const Navbar: React.FC = () => {
  const { itemCount, setIsCartDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Custom Cakes', path: '/custom-cakes', highlight: true },
    { name: 'Offers', path: '/offers' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EBDCCB] transition-all">
      {/* Top announcement bar */}
      <div className="bg-[#2C1A11] text-[#F5EBE1] text-xs font-medium py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E5BA73] animate-pulse"></span>
            <span>Freshly baked daily in Al Jada, Sharjah</span>
            <span className="hidden md:inline text-[#B69275]">•</span>
            <span className="hidden md:inline text-[#E5BA73]">Free Sharjah Delivery on orders over AED {BUSINESS_INFO.freeDeliveryThreshold}</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a 
              href={BUSINESS_INFO.phoneTel} 
              className="flex items-center gap-1.5 text-[#E5BA73] hover:text-white transition-colors"
              title="Call our Sharjah Bakery"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{BUSINESS_INFO.phoneFormatted}</span>
            </a>
            <span className="hidden lg:inline text-[#B69275]">|</span>
            <span className="hidden lg:flex items-center gap-1 text-[#D9C3B0]">
              <MapPin className="w-3.5 h-3.5 text-[#E5BA73]" />
              <span>Muwaileh Commercial, Sharjah</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-[#8B5E3C] text-[#FAF7F2] flex items-center justify-center shadow-sm group-hover:bg-[#724827] transition-all">
              <Cake className="w-6 h-6 text-[#E5BA73]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2C1A11] leading-none group-hover:text-[#8B5E3C] transition-colors">
                Home Bakery Kitchen
              </span>
              <span className="text-[11px] uppercase tracking-widest text-[#8B5E3C] font-semibold mt-1">
                Al Jada • Sharjah
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#8B5E3C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#8B5E3C]'
                      : 'text-[#443229] hover:text-[#8B5E3C]'
                  } ${link.highlight ? 'text-[#8B5E3C] flex items-center gap-1 font-semibold' : ''}`
                }
              >
                {link.highlight && <Sparkles className="w-3.5 h-3.5 text-[#E5BA73]" />}
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-[#443229] hover:text-[#8B5E3C] hover:bg-[#F3ECE2] rounded-full transition-colors"
              aria-label="Search bakery products"
              id="header-search-btn"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Bakery Menu Quick Link */}
            <Link
              to="/menu"
              className="hidden sm:inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-full border border-[#D9C3B0] text-[#724827] bg-[#F5EBE1] hover:bg-[#EBDCCB] transition-colors"
            >
              Menu
            </Link>

            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 bg-[#8B5E3C] text-white rounded-full hover:bg-[#724827] transition-all shadow-sm flex items-center justify-center group"
              aria-label={`Cart with ${itemCount} items`}
              id="header-cart-btn"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E5BA73] text-[#2C1A11] text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-[#FAF7F2]">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-[#443229] hover:text-[#8B5E3C] hover:bg-[#F3ECE2] rounded-lg transition-colors"
              aria-label="Open navigation menu"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="py-3 px-2 border-t border-[#EBDCCB] animate-fadeIn">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search cakes, sourdough, croissants, cupcakes, cookies..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                autoFocus
                className="w-full pl-11 pr-24 py-2.5 bg-white border border-[#D9C3B0] rounded-full text-sm text-[#2C1A11] placeholder-[#8C7A70] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C] focus:border-transparent shadow-sm"
              />
              <Search className="w-4 h-4 text-[#8C7A70] absolute left-4 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 bg-[#8B5E3C] text-white text-xs font-semibold rounded-full hover:bg-[#724827] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-full max-w-xs bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 border-l border-[#EBDCCB]">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#EBDCCB] flex items-center justify-between bg-[#F5EBE1]">
              <div className="flex items-center gap-2">
                <Cake className="w-5 h-5 text-[#8B5E3C]" />
                <span className="font-serif text-lg font-bold text-[#2C1A11]">Home Bakery</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-[#5A453A] hover:text-[#2C1A11] rounded-full hover:bg-[#EBDCCB] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search input */}
            <div className="p-4 border-b border-[#EBDCCB]">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search bakery..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#D9C3B0] rounded-lg text-sm text-[#2C1A11] placeholder-[#8C7A70] focus:outline-none focus:ring-1 focus:ring-[#8B5E3C]"
                />
                <Search className="w-4 h-4 text-[#8C7A70] absolute left-3 top-2.5 pointer-events-none" />
              </form>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#EBDCCB] text-[#724827] font-semibold'
                        : 'text-[#443229] hover:bg-[#F3ECE2]'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#A89485]" />
                </NavLink>
              ))}

              <div className="pt-3 border-t border-[#EBDCCB] mt-3 space-y-1">
                <Link
                  to="/menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#443229] hover:bg-[#F3ECE2]"
                >
                  <span>Bakery Menu</span>
                  <ChevronRight className="w-4 h-4 text-[#A89485]" />
                </Link>
                <Link
                  to="/best-sellers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#443229] hover:bg-[#F3ECE2]"
                >
                  <span>Best Sellers</span>
                  <ChevronRight className="w-4 h-4 text-[#A89485]" />
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#443229] hover:bg-[#F3ECE2]"
                >
                  <span>FAQs</span>
                  <ChevronRight className="w-4 h-4 text-[#A89485]" />
                </Link>
              </div>
            </div>

            {/* Drawer Footer info */}
            <div className="p-4 border-t border-[#EBDCCB] bg-[#F5EBE1] space-y-3">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#8B5E3C] text-white rounded-lg text-sm font-semibold hover:bg-[#724827] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call +971 6 531 5847</span>
              </a>
              <div className="text-center text-xs text-[#725E52] leading-tight">
                {BUSINESS_INFO.address}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
