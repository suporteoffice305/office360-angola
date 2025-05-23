
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  users: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateUsers: (productId: string, users: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

// Create context with a default undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create CartProvider component to wrap the application
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize cart items from localStorage if available
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    // This is useful for debugging but also for syncing with admin dashboard
    console.log('Cart updated:', items); 
    
    // This could be expanded to send cart data to the server for admin dashboard
    const trackCart = async () => {
      try {
        // In a real app, this would be an API call to your backend
        if (items.length > 0) {
          // Simulate tracking cart for admin dashboard
          console.log('Tracking cart for admin dashboard:', {
            items,
            total: items.reduce((total, item) => total + (item.price * item.quantity), 0),
            timestamp: new Date().toISOString(),
            user: localStorage.getItem('user') || 'anonymous',
            event: 'cart_update'
          });
        }
      } catch (error) {
        console.error('Error tracking cart:', error);
      }
    };
    
    trackCart();
  }, [items]);

  // Add product to cart
  const addToCart = (product: Product, quantity: number) => {
    if (quantity <= 0) return;
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove product from cart - improved with immediate update
  const removeFromCart = (productId: string) => {
    // Immediately filter out the removed item
    const updatedItems = items.filter(item => item.id !== productId);
    setItems(updatedItems);
    
    // Track removal for analytics
    console.log('Item removed from cart:', productId);
    
    // Update localStorage immediately for persistence
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  // Update quantity of product in cart
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Update number of users for a product
  const updateUsers = (productId: string, users: number) => {
    if (users <= 0) return;
    
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === productId) {
          // Calculate new price based on base price per user
          const basePricePerUser = item.price / item.users;
          return { 
            ...item, 
            users, 
            price: basePricePerUser * users 
          };
        }
        return item;
      })
    );
  };

  // Clear all items from cart
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  // Calculate total price of all items in cart
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Count total number of items in cart
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Create context value object with all cart functions
  const contextValue = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateUsers,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
