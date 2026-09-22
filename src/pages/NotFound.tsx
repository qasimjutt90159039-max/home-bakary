import React from 'react';
import { Link } from 'react-router-dom';
import { Cake, ShoppingBag, ArrowLeft, Home as HomeIcon } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#EBDCCB] p-8 sm:p-12 text-center shadow-xs">
        <div className="w-20 h-20 rounded-full bg-[#FAF2E6] text-[#8B5E3C] flex items-center justify-center mx-auto mb-6">
          <Cake className="w-10 h-10" />
        </div>

        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#8B5E3C] bg-[#F3ECE2] px-3 py-1 rounded-full border border-[#EBDCCB]">
          Error 404
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A11] mt-3">
          Page Crumbled Away
        </h1>

        <p className="text-xs sm:text-sm text-[#725E52] mt-3 leading-relaxed">
          Looks like this recipe or page doesn't exist or has moved out of our Al Jada kitchen display.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-6 py-3 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Bakery Shop</span>
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#FAF7F2] hover:bg-[#F3ECE2] text-[#2C1A11] border border-[#D9C3B0] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <HomeIcon className="w-4 h-4 text-[#8B5E3C]" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
