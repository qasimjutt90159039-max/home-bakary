export type ProductCategory = 
  | 'Cakes'
  | 'Cupcakes'
  | 'Pastries'
  | 'Cookies'
  | 'Desserts'
  | 'Bread'
  | 'Breakfast'
  | 'Special Occasions';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  oldPrice?: number;
  description: string;
  shortDescription: string;
  image: string;
  gallery?: string[];
  rating: number;
  reviews: number;
  stock: number;
  featured: boolean;
  bestSeller: boolean;
  tags: string[];
  ingredients?: string[];
  allergens?: string[];
  portionSize?: string;
  prepTime?: string;
}

export interface CartItem {
  id?: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  customMessage?: string;
  customGreeting?: string;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  deliveryDate: string;
  deliveryTime: string;
  orderNotes?: string;
}

export interface OrderDetails {
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryType: 'delivery' | 'pickup';
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address?: string;
    city?: string;
    notes?: string;
  };
  preferredDate: string;
  timeSlot: string;
  paymentMethod: string;
  status: string;
}

export interface Order {
  orderId: string;
  createdAt: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Pending Review' | 'Confirmed' | 'Baking' | 'Out for Delivery' | 'Delivered';
  paymentMethod: 'Pay upon Delivery / Pickup (Card or Cash)';
}

export interface CustomCakeRequest {
  id: string;
  createdAt: string;
  cakeType: string;
  flavor: string;
  size: string;
  creamType: string;
  filling: string;
  colorTheme: string;
  messageOnCake: string;
  occasion: string;
  preferredDate: string;
  specialInstructions: string;
  referenceImageUrl?: string;
  customerName: string;
  phone: string;
  status: 'Pending Confirmation';
}

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  productMentioned?: string;
}

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
  category: 'Ordering' | 'Delivery' | 'Custom Cakes' | 'Ingredients & Storage';
}
