import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, CustomerInfo } from '../types';
import { BUSINESS_INFO } from '../data/business';

interface ToastState {
  id: number;
  message: string;
  type?: 'success' | 'info';
}

interface CartContextType {
  cart: CartItem[];
  items: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, customMessage?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  freeDeliveryThreshold: number;
  orders: Order[];
  createOrder: (customer: CustomerInfo) => Order;
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info') => void;
  removeToast: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'hbk_cart_v1';
const WISHLIST_STORAGE_KEY = 'hbk_wishlist_v1';
const ORDERS_STORAGE_KEY = 'hbk_orders_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedSize?: string,
    customMessage?: string
  ) => {
    const size = selectedSize || product.portionSize || 'Standard';
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          customMessage: customMessage || updated[existingIndex].customMessage,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: `${product.id}-${size}`,
            product,
            quantity,
            selectedSize: size,
            customMessage,
          },
        ];
      }
    });

    showToast(`Added "${product.name}" (${quantity}) to your cart!`);
  };

  const removeFromCart = (idOrProductId: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === idOrProductId ||
            (item.product.id === idOrProductId &&
              (!selectedSize || item.selectedSize === selectedSize))
          )
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (idOrProductId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(idOrProductId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.id === idOrProductId ||
          (item.product.id === idOrProductId &&
            (!selectedSize || item.selectedSize === selectedSize))
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your favorites', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your favorites!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee =
    cart.length === 0 ? 0 : subtotal >= BUSINESS_INFO.freeDeliveryThreshold ? 0 : BUSINESS_INFO.standardDeliveryFee;
  const total = subtotal + deliveryFee;

  const createOrder = (customer: CustomerInfo): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `HBK-${new Date().getFullYear()}-${randomSuffix}`;
    const newOrder: Order = {
      orderId,
      createdAt: new Date().toISOString(),
      customer,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      status: 'Confirmed',
      paymentMethod: 'Pay upon Delivery / Pickup (Card or Cash)',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        items: cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        itemCount,
        subtotal,
        deliveryFee,
        total,
        freeDeliveryThreshold: BUSINESS_INFO.freeDeliveryThreshold,
        orders,
        createOrder,
        toasts,
        showToast,
        removeToast,
        searchQuery,
        setSearchQuery,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
