import { useState, useEffect } from 'react';
import api from '../api';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend when component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      setLoading(true);
      const response = await api.get('/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data.cart.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (game) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add items to cart');
        return;
      }

      setLoading(true);
      const response = await api.post('/cart/add', {
        gameId: game._id,
        title: game.title,
        price: game.price,
        image: game.image,
        logo: game.logo,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCart(response.data.cart.items || []);
      return true; // Success
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding item to cart');
      return false; // Failure
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (gameId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      setLoading(true);
      const response = await api.delete(`/cart/remove/${gameId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCart(response.data.cart.items || []);
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Error removing item from cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (gameId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      setLoading(true);
      const response = await api.put('/cart/update', {
        gameId,
        quantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCart(response.data.cart.items || []);
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      alert('Error updating cart');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      setLoading(true);
      await api.delete('/cart/clear', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Error clearing cart');
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    loading,
    fetchCart
  };
};

// Helper function to get cart count for navbar/header
export const getCartCount = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return 0;
    
    const response = await api.get('/cart', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const cart = response.data.cart.items || [];
    return cart.reduce((count, item) => count + item.quantity, 0);
  } catch (error) {
    console.error('Error getting cart count:', error);
    return 0;
  }
};
