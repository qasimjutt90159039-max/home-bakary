import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  Send, 
  CheckCircle2, 
  Navigation, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import { Link } from 'react-router-dom';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C] bg-[#F3ECE2] px-3.5 py-1 rounded-full border border-[#EBDCCB]">
            Connect With Our Bakers
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C1A11] mt-3">
            Contact Home Bakery Kitchen
          </h1>
          <p className="text-sm sm:text-base text-[#725E52] mt-2">
            Have questions about custom orders, dietary specifications, or same-day delivery in Sharjah? We are here to assist.
          </p>
        </div>

        {/* Top 3 Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {/* 1. Phone Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#EBDCCB] shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] text-[#8B5E3C] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2C1A11]">Call Our Kitchen</h3>
              <p className="text-xs text-[#725E52]">
                Immediate assistance for active deliveries and cake consultations.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-[#F3ECE2]">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="text-sm font-extrabold text-[#8B5E3C] hover:text-[#724827] block"
              >
                {BUSINESS_INFO.phoneFormatted}
              </a>
              <span className="text-[11px] text-[#8C7A70] block mt-0.5">Kitchen Hotline</span>
            </div>
          </div>

          {/* 2. Location Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#EBDCCB] shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] text-[#8B5E3C] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2C1A11]">Bakery Location</h3>
              <p className="text-xs text-[#725E52] leading-relaxed">
                {BUSINESS_INFO.address}
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-[#F3ECE2]">
              <a
                href="https://maps.google.com/?q=Arada+Al+Jada+Sharjah+UAE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#8B5E3C] hover:underline inline-flex items-center gap-1"
              >
                <span>Get Driving Directions</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3. Hours Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#EBDCCB] shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2E6] text-[#8B5E3C] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2C1A11]">Kitchen Hours</h3>
              <p className="text-xs text-[#725E52]">
                Open 7 days a week for oven-fresh baking, takeaway, and delivery.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-[#F3ECE2] text-xs">
              <div className="flex justify-between font-semibold text-[#2C1A11]">
                <span>Mon – Sun:</span>
                <span>{BUSINESS_INFO.openingHours}</span>
              </div>
              <span className="text-[11px] text-[#386641] block mt-0.5 font-medium">
                ● Fresh Ovens Firing Daily
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form + Map Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#EBDCCB] shadow-xs">
            <h2 className="font-serif text-2xl font-bold text-[#2C1A11] mb-2">
              Send Us A Message
            </h2>
            <p className="text-xs sm:text-sm text-[#725E52] mb-6">
              Our kitchen team responds promptly to all queries and catering requests.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-[#FAF7F2] rounded-2xl border border-[#EBDCCB] space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#EBF2EA] text-[#386641] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2C1A11]">
                  Message Received!
                </h3>
                <p className="text-xs sm:text-sm text-[#5A453A] max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>. Our team in Al Jada will reach back to you at <strong>{phone}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="px-5 py-2 bg-[#8B5E3C] text-white rounded-xl text-xs font-bold hover:bg-[#724827] transition-colors"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sultan Al-Nuaimi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +971 50 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. yourname@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Custom Cake Inquiry">Custom Celebration Cake</option>
                      <option value="Catering & Large Events">Corporate & Party Catering</option>
                      <option value="Delivery Schedule Question">Delivery Question</option>
                      <option value="Feedback & Suggestions">Feedback & Compliments</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you have in mind..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:ring-2 focus:ring-[#8B5E3C] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Transmitting Message...' : 'Send Message to Bakery'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Location & Map Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBDCCB] shadow-xs space-y-5">
              <h3 className="font-serif text-xl font-bold text-[#2C1A11]">
                Bakery Kitchen Dispatch Hub
              </h3>

              {/* Stylized Visual Map */}
              <div className="rounded-2xl overflow-hidden border border-[#D9C3B0] bg-[#E9E4DC] h-56 relative flex items-center justify-center p-4">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2C1A11_1px,transparent_1px)] [background-size:14px_14px]" />
                <div className="relative z-10 bg-white/95 p-4 rounded-2xl shadow-lg border border-[#D9C3B0] text-center max-w-xs">
                  <div className="w-9 h-9 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#2C1A11]">
                    Home Bakery Kitchen Al Jada
                  </h4>
                  <p className="text-[11px] text-[#725E52] mt-0.5">
                    Arada by Al Jada - Muwaileh Commercial - Sharjah
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-[#5A453A]">
                <p>
                  <strong>Kitchen Category:</strong> {BUSINESS_INFO.category}
                </p>
                <p>
                  <strong>Sharjah Courier Dispatch:</strong> Refrigerated deliveries leave our kitchen every 90 minutes.
                </p>
                <p>
                  <strong>Self Pickup:</strong> Dedicated pickup bay with easy vehicle parking directly outside the Arada Al Jada commercial zone.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="flex-1 py-3 bg-[#FAF7F2] hover:bg-[#F3ECE2] text-[#8B5E3C] border border-[#D9C3B0] rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {BUSINESS_INFO.phoneFormatted}</span>
                </a>
                <Link
                  to="/shop"
                  className="flex-1 py-3 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Online</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
