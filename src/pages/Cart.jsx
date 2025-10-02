import React from 'react';
import { useCart } from '../utils/cart';
import Footer from '../components/footer';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, loading } = useCart();

  const handleRemove = (gameId) => {
    removeFromCart(gameId);
  };

  const handleQuantityChange = (gameId, quantity) => {
    updateQuantity(gameId, quantity);
  };

  const total = getCartTotal();

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#f0f0f0', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Your Cart</h1>
        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '18px' }}>Loading cart...</p>
        ) : cart.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px' }}>Your cart is empty.</p>
        ) : (
          <>
            <div style={{ display: 'grid', gap: '20px' }}>
              {cart.map((item) => (
                <div key={item.gameId} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#222', padding: '20px', borderRadius: '8px' }}>
                  <img src={item.logo || item.image || 'https://via.placeholder.com/100'} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginRight: '20px' }} />
                  <div style={{ flex: 1 }}>
                    <h3>{item.title}</h3>
                    <p>Price: ${item.price || 'N/A'}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => handleQuantityChange(item.gameId, item.quantity - 1)} style={{ padding: '5px 10px', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '4px' }}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.gameId, item.quantity + 1)} style={{ padding: '5px 10px', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '4px' }}>+</button>
                  </div>
                  <button onClick={() => handleRemove(item.gameId)} style={{ marginLeft: '20px', padding: '10px 20px', backgroundColor: '#e02f5a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'right', marginTop: '40px', fontSize: '24px', fontWeight: 'bold' }}>
              Total: ${total.toFixed(2)}
            </div>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <button style={{ padding: '15px 30px', backgroundColor: '#e02f5a', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '18px', cursor: 'pointer' }}>Checkout</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
