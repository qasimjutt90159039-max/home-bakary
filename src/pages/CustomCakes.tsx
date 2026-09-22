import React, { useState } from 'react';
import { 
  Cake, 
  Sparkles, 
  Upload, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  X, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import { CustomCakeRequest } from '../types';

export const CustomCakes: React.FC = () => {
  const [cakeType, setCakeType] = useState('Layered Round Sponge');
  const [flavor, setFlavor] = useState('Rich Belgian Chocolate');
  const [size, setSize] = useState('1.5 kg (10-12 Persons)');
  const [creamType, setCreamType] = useState('Swiss Meringue Buttercream');
  const [filling, setFilling] = useState('Belgian Chocolate Ganache & Hazelnut Praline');
  const [colorTheme, setColorTheme] = useState('Pastel Cream & Subtle Gold Accents');
  const [messageOnCake, setMessageOnCake] = useState('');
  const [occasion, setOccasion] = useState('Birthday');
  const [preferredDate, setPreferredDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Image upload handling
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');

  // Form states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedRequest, setSubmittedRequest] = useState<CustomCakeRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'Please provide your full name.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Please provide your UAE contact number.';
    } else if (phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number so our chefs can reach you.';
    }

    if (!preferredDate) {
      newErrors.preferredDate = 'Please select your preferred celebration date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const randomId = `CC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const requestData: CustomCakeRequest = {
      id: randomId,
      createdAt: new Date().toISOString(),
      cakeType,
      flavor,
      size,
      creamType,
      filling,
      colorTheme,
      messageOnCake,
      occasion,
      preferredDate,
      specialInstructions,
      referenceImageUrl: imagePreview || undefined,
      customerName,
      phone,
      status: 'Pending Confirmation',
    };

    // Save to localStorage for demo persistence
    try {
      const savedRequests = JSON.parse(localStorage.getItem('hbk_custom_cakes_v1') || '[]');
      localStorage.setItem('hbk_custom_cakes_v1', JSON.stringify([requestData, ...savedRequests]));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRequest(requestData);
    }, 600);
  };

  const resetForm = () => {
    setSubmittedRequest(null);
    setMessageOnCake('');
    setSpecialInstructions('');
    setImagePreview(null);
    setImageFileName('');
    setCustomerName('');
    setPhone('');
    setPreferredDate('');
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF2E6] border border-[#EBDCCB] text-[#8B5E3C] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Al Jada Custom Cake Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C1A11]">
            Order Your Custom Cake
          </h1>
          <p className="text-sm sm:text-base text-[#725E52] mt-3 leading-relaxed">
            Specify your desired layers, flavors, and design inspirations. Our pastry artists in Sharjah review every request individually and call you directly to confirm.
          </p>
        </div>

        {/* Notice Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EBDCCB] mb-8 flex items-start gap-3.5 text-xs text-[#5A453A]">
          <CheckCircle2 className="w-5 h-5 text-[#8B5E3C] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-[#2C1A11] block mb-0.5">No Online Payment Required For Custom Requests</strong>
            All custom cakes are submitted for kitchen feasibility and confirmation. We recommend requesting at least <strong>24 to 48 hours in advance</strong>. For same-day urgent inquiries, call our kitchen directly at <strong>+971 6 531 5847</strong>.
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-[#EBDCCB] p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Cake Architecture */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C1A11] pb-3 border-b border-[#F3ECE2] flex items-center gap-2">
                <Cake className="w-5 h-5 text-[#8B5E3C]" />
                <span>1. Cake Foundation & Flavor</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                {/* Cake Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                    Cake Type / Structure
                  </label>
                  <select
                    value={cakeType}
                    onChange={(e) => setCakeType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  >
                    <option value="Layered Round Sponge">Layered Round Sponge (Single Tier)</option>
                    <option value="2-Tier Celebration Cake">2-Tier Celebration Cake (Grand Event)</option>
                    <option value="Heart-Shaped Vintage Cake">Heart-Shaped Vintage Lambeth Cake</option>
                    <option value="Square / Sheet Celebration">Square / Sheet Celebration Cake</option>
                    <option value="Bento Petite Cake">Bento Petite Cake (1-2 persons)</option>
                  </select>
                </div>

                {/* Flavor */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                    Sponge Flavor
                  </label>
                  <select
                    value={flavor}
                    onChange={(e) => setFlavor(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  >
                    <option value="Rich Belgian Chocolate">Rich Belgian Chocolate</option>
                    <option value="Madagascar Bourbon Vanilla">Madagascar Bourbon Vanilla</option>
                    <option value="Signature Lotus Biscoff">Signature Lotus Biscoff</option>
                    <option value="Red Velvet Sponge">Red Velvet Sponge</option>
                    <option value="Roasted Pistachio & Cardamom">Roasted Pistachio & Cardamom (UAE Signature)</option>
                    <option value="Spiced Carrot & Walnut">Spiced Carrot & Walnut</option>
                    <option value="Marble Cocoa & Vanilla">Marble Cocoa & Vanilla</option>
                  </select>
                </div>

                {/* Size */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                    Size / Portions
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  >
                    <option value="1 kg (Serves 6-8 Persons)">1 kg (Serves 6-8 Persons)</option>
                    <option value="1.5 kg (10-12 Persons)">1.5 kg (10-12 Persons) - Most Popular</option>
                    <option value="2 kg (14-16 Persons)">2 kg (14-16 Persons)</option>
                    <option value="3 kg (20-25 Persons)">3 kg (20-25 Persons)</option>
                    <option value="5 kg+ Multi-tier (30+ Persons)">5 kg+ Multi-tier (30+ Persons)</option>
                  </select>
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                    Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  >
                    <option value="Birthday">Birthday</option>
                    <option value="Wedding / Engagement">Wedding / Engagement</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Baby Shower / Gender Reveal">Baby Shower / Gender Reveal</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Corporate / Special Gathering">Corporate / Special Gathering</option>
                    <option value="Other Celebration">Other Celebration</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Creams, Fillings & Design Theme */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C1A11] pb-3 border-b border-[#F3ECE2] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8B5E3C]" />
                <span>2. Creams, Fillings & Aesthetics</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                {/* Cream Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                    Exterior Cream Coating
                  </label>
                  <select
                    value={creamType}
                    onChange={(e) => setCreamType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  >
                    <option value="Swiss Meringue Buttercream">Swiss Meringue Buttercream (Silky & Light)</option>
                    <option value="Whipped Dark Chocolate Ganache">Whipped Dark Chocolate Ganache</option>
                    <option value="Velvety Cream Cheese Frosting">Velvety Cream Cheese Frosting</option>
                    <option value="Fresh Chantilly Dairy Cream">Fresh Chantilly Dairy Cream</option>
                    <option value="Fondant Smooth Enrobing">Fondant Smooth Enrobing</option>
                  </select>
                </div>

                {/* Filling */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                    Interior Filling
                  </label>
                  <select
                    value={filling}
                    onChange={(e) => setFilling(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  >
                    <option value="Belgian Chocolate Ganache & Hazelnut Praline">Belgian Chocolate Ganache & Hazelnut Praline</option>
                    <option value="Lotus Biscoff Cream & Cookie Crumble">Lotus Biscoff Cream & Cookie Crumble</option>
                    <option value="Fresh Strawberry & Berry Compote">Fresh Strawberry & Berry Compote</option>
                    <option value="Pistachio Pastry Cream">Pistachio Pastry Cream</option>
                    <option value="Salted Caramel & Crunchy Pearls">Salted Caramel & Crunchy Pearls</option>
                  </select>
                </div>

                {/* Color / Theme */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                    Color Palette / Theme
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pastel Pink & White, Minimalist Gold, Navy & Silver"
                    value={colorTheme}
                    onChange={(e) => setColorTheme(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  />
                </div>

                {/* Message On Cake */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                    Message / Greeting on Cake Plaque
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Happy 30th Birthday Hessa!"
                    value={messageOnCake}
                    onChange={(e) => setMessageOnCake(e.target.value)}
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  />
                </div>
              </div>

              {/* Reference Image Upload UI */}
              <div className="mt-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                  Reference Image Upload (Design Inspiration)
                </label>
                <div className="border-2 border-dashed border-[#D9C3B0] rounded-2xl p-5 text-center bg-[#FAF7F2] hover:bg-[#F3ECE2] transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {imagePreview ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={imagePreview}
                        alt="Reference design"
                        className="w-28 h-28 object-cover rounded-xl shadow-md border border-[#D9C3B0]"
                      />
                      <span className="text-xs font-semibold text-[#8B5E3C]">
                        {imageFileName} (Click to change photo)
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#725E52]">
                      <Upload className="w-8 h-8 text-[#8B5E3C]" />
                      <span className="text-xs font-bold text-[#2C1A11]">
                        Upload your cake reference or Pinterest photo
                      </span>
                      <span className="text-[11px] text-[#8C7A70]">
                        Supports JPG, PNG, WEBP (Max 5MB)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mt-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                  Special Instructions or Dietary Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about specific decor elements, piping styles, nut allergies, or delivery coordination details..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                />
              </div>
            </div>

            {/* Section 3: Contact & Preferred Date */}
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C1A11] pb-3 border-b border-[#F3ECE2] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#8B5E3C]" />
                <span>3. Date & Contact Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                    Preferred Celebration Date *
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  />
                  {errors.preferredDate && (
                    <p className="text-[11px] text-[#B91C1C] mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fatima Al-Suwaidi"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-[#B91C1C] mt-1">{errors.customerName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#725E52] mb-1.5">
                    UAE Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +971 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs sm:text-sm text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-[#B91C1C] mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Sending Request to Chef...</span>
                ) : (
                  <>
                    <Cake className="w-5 h-5" />
                    <span>Submit Custom Cake Request For Confirmation</span>
                  </>
                )}
              </button>
              <p className="text-center text-xs text-[#8C7A70] mt-3">
                No immediate charge. Our kitchen team in Al Jada will review your request and call {phone || 'you'} to confirm design details and timing.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {submittedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={resetForm} />

          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-[#EBDCCB] text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#EBF2EA] text-[#386641] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#8B5E3C]">
              Request Received
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#2C1A11] mt-1">
              Thank You, {submittedRequest.customerName}!
            </h3>

            <p className="text-xs sm:text-sm text-[#5A453A] mt-2 leading-relaxed">
              Your custom cake inquiry has been recorded under reference{' '}
              <strong className="text-[#8B5E3C]">{submittedRequest.id}</strong>.
            </p>

            <div className="mt-5 p-4 rounded-2xl bg-[#FAF7F2] text-left text-xs text-[#5A453A] space-y-1.5 border border-[#EBDCCB]">
              <div className="flex justify-between">
                <span className="text-[#8C7A70]">Cake Concept:</span>
                <span className="font-semibold text-[#2C1A11]">{submittedRequest.flavor} ({submittedRequest.cakeType})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7A70]">Size:</span>
                <span className="font-semibold text-[#2C1A11]">{submittedRequest.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7A70]">Target Date:</span>
                <span className="font-semibold text-[#2C1A11]">{submittedRequest.preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7A70]">Customer Phone:</span>
                <span className="font-semibold text-[#2C1A11]">{submittedRequest.phone}</span>
              </div>
            </div>

            <div className="mt-6 p-3.5 bg-[#FAF2E6] rounded-xl text-xs text-[#724827]">
              Our head pastry chef will review your request and contact you at <strong>{submittedRequest.phone}</strong>. If you have immediate questions, feel free to call us directly at <strong>+971 6 531 5847</strong>.
            </div>

            <div className="mt-6">
              <button
                onClick={resetForm}
                className="w-full py-3 bg-[#8B5E3C] text-white rounded-xl text-xs font-bold hover:bg-[#724827] transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
