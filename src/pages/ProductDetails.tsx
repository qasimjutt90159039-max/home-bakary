import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Truck, 
  ShieldCheck, 
  Clock, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { BAKERY_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/common/ProductCard';
import { SectionHeading } from '../components/common/SectionHeading';
import { BUSINESS_INFO } from '../data/business';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const product = BAKERY_PRODUCTS.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [customGreeting, setCustomGreeting] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'delivery'>('details');

  // Reset state when product id changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(1);
      setSelectedSize(product.portionSize || 'Standard');
      setCustomGreeting('');
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#8B5E3C] mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#2C1A11]">Product Not Found</h2>
        <p className="text-sm text-[#725E52] mt-2 mb-6">
          The requested bakery item may have been seasonal or retired from our Sharjah kitchen.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-[#8B5E3C] text-white font-bold rounded-xl text-xs hover:bg-[#724827] transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const relatedProducts = BAKERY_PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, customGreeting.trim() ? customGreeting : undefined);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, customGreeting.trim() ? customGreeting : undefined);
    navigate('/checkout');
  };

  const galleryImages = [
    product.image,
    ...(product.gallery || [])
  ].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-xs text-[#725E52] mb-6">
          <Link to="/" className="hover:text-[#2C1A11]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#2C1A11]">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#2C1A11]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#2C1A11] font-semibold truncate max-w-[180px] sm:max-w-none">
            {product.name}
          </span>
        </div>

        {/* Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#EBDCCB] shadow-xs">
          {/* Gallery Column (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Featured Photo */}
            <div className="relative aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-[#F5EBE1] border border-[#EBDCCB]">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.bestSeller && (
                  <span className="bg-[#8B5E3C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Best Seller
                  </span>
                )}
                {discountPercent && (
                  <span className="bg-[#B91C1C] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                    Special Offer • Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  wishlisted
                    ? 'bg-[#B91C1C] text-white'
                    : 'bg-white/85 text-[#5A453A] hover:bg-white hover:text-[#B91C1C]'
                } shadow-md backdrop-blur-xs`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === imgUrl ? 'border-[#8B5E3C] ring-2 ring-[#8B5E3C]/20' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Purchasing Info Column (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B5E3C] bg-[#FAF2E6] px-3 py-1 rounded-full">
                  {product.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[#2C1A11]">
                  <div className="flex text-[#E5BA73]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold">{product.rating.toFixed(1)}</span>
                  <span className="text-[#8C7A70]">({product.reviews} customer reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1A11] leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl font-extrabold text-[#2C1A11]">
                  AED {product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-[#A89485] line-through">
                    AED {product.oldPrice}
                  </span>
                )}
                <span className="text-xs text-[#386641] font-semibold bg-[#EBF2EA] px-2.5 py-1 rounded-lg">
                  Inclusive of Fresh UAE Tax
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm text-[#5A453A] leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Portion / Size Specifier */}
              {product.portionSize && (
                <div className="pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#725E52] block mb-2">
                    Size / Portion:
                  </label>
                  <div className="inline-block px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D9C3B0] text-xs font-semibold text-[#2C1A11]">
                    {product.portionSize}
                  </div>
                </div>
              )}

              {/* Custom Plaque / Greeting input if it is a cake */}
              {product.category === 'Cakes' && (
                <div className="pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#725E52] block mb-1.5">
                    Optional Greeting Plaque (Free of Charge):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Happy Birthday Sarah! (Max 30 characters)"
                    maxLength={30}
                    value={customGreeting}
                    onChange={(e) => setCustomGreeting(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#D9C3B0] rounded-xl text-xs text-[#2C1A11] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                  />
                </div>
              )}

              {/* Quantity & CTA Buttons */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity controller */}
                  <div className="flex items-center border border-[#D9C3B0] rounded-xl bg-[#FAF7F2] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-[#5A453A] hover:bg-white rounded-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-[#2C1A11]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-[#5A453A] hover:bg-white rounded-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-[#8B5E3C] hover:bg-[#724827] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • AED {product.price * quantity}</span>
                  </button>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 bg-[#2C1A11] hover:bg-[#442b1f] text-white rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#E5BA73]" />
                  <span>Instant Checkout Request</span>
                </button>
              </div>

              {/* Delivery Assurance & Highlights */}
              <div className="pt-5 border-t border-[#EBDCCB] space-y-2.5 text-xs text-[#5A453A]">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                  <span>
                    <strong>Fast Sharjah Courier:</strong> Same-day delivery across Sharjah for orders placed before 4:00 PM.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                  <span>
                    <strong>Bakery Pickup:</strong> Free pickup at Arada by Al Jada kitchen in Muwaileh Commercial.
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#8B5E3C] shrink-0" />
                  <span>
                    <strong>No Advance Payment Needed:</strong> Pay comfortably upon delivery or collection via cash/card.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Ingredients, Storage, Delivery Policy */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-[#EBDCCB] shadow-xs">
          <div className="flex items-center gap-6 border-b border-[#EBDCCB] pb-4 text-sm font-bold">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-2 relative transition-colors ${
                activeTab === 'details' ? 'text-[#8B5E3C] border-b-2 border-[#8B5E3C]' : 'text-[#725E52] hover:text-[#2C1A11]'
              }`}
            >
              Description & Preparation
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-2 relative transition-colors ${
                activeTab === 'ingredients' ? 'text-[#8B5E3C] border-b-2 border-[#8B5E3C]' : 'text-[#725E52] hover:text-[#2C1A11]'
              }`}
            >
              Ingredients & Allergens
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`pb-2 relative transition-colors ${
                activeTab === 'delivery' ? 'text-[#8B5E3C] border-b-2 border-[#8B5E3C]' : 'text-[#725E52] hover:text-[#2C1A11]'
              }`}
            >
              Delivery & Kitchen Pick Up
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'details' && (
              <div className="space-y-4 max-w-3xl text-sm text-[#5A453A] leading-relaxed">
                <p>{product.description}</p>
                <p>
                  Baked in our kitchen located at <strong>Arada by Al Jada - Muwaileh Commercial - Sharjah</strong>. We prepare our batches fresh daily so that every slice and bite retains delicate aromas, authentic crusts, and silky ganache finishes.
                </p>
                {product.prepTime && (
                  <p className="font-semibold text-[#8B5E3C]">
                    Kitchen schedule: {product.prepTime}
                  </p>
                )}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-5 max-w-3xl text-sm text-[#5A453A]">
                {product.ingredients && (
                  <div>
                    <h4 className="font-bold text-[#2C1A11] mb-2">Key Ingredients:</h4>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {product.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-center gap-2 p-2 bg-[#FAF7F2] rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5E3C]" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.allergens && (
                  <div className="p-4 bg-[#FFF8EE] rounded-xl border border-[#F2E0C9]">
                    <h4 className="font-bold text-[#A75D00] text-xs uppercase tracking-wider mb-1">
                      Allergen Advisory:
                    </h4>
                    <p className="text-xs text-[#7A4B10]">
                      Contains: <strong>{product.allergens.join(', ')}</strong>.
                      Our facility handles wheat flours, dairy, eggs, and nuts. For severe allergies, please call our kitchen directly at <strong>+971 6 531 5847</strong>.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-3 max-w-3xl text-sm text-[#5A453A] leading-relaxed">
                <p>
                  <strong>Delivery Coverage:</strong> Temperature-monitored refrigerated courier delivery throughout Sharjah, with dedicated local delivery in Muwaileh Commercial and Al Jada.
                </p>
                <p>
                  <strong>Delivery Fee:</strong> Flat AED {BUSINESS_INFO.standardDeliveryFee} across Sharjah. Orders over AED {BUSINESS_INFO.freeDeliveryThreshold} qualify for <strong>FREE delivery</strong>.
                </p>
                <p>
                  <strong>Kitchen Pickup:</strong> Free pickup is ready 2 hours after order confirmation at <em>{BUSINESS_INFO.address}</em>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <SectionHeading
              badge="You Might Also Love"
              title={`More in ${product.category}`}
              subtitle="Pair your selection with handcrafted accompaniments from our Al Jada ovens."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
