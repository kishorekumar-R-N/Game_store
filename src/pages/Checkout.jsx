import React, { useState, useEffect } from 'react';
import { useCart } from '../utils/cart';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Checkout = () => {
  const { cart, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: '',
    username: ''
  });


  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch user details from local storage or API if needed
    const email = localStorage.getItem('userEmail') || '';
    const username = localStorage.getItem('username') || '';
    setUserDetails({ email, username });
  }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to purchase');
      setProcessing(false);
      return;
    }

    try {
      const item = cart[0]; // Assuming single item for purchase
      console.log('Cart item:', item); // Debug log

      if (!item || !item.gameId) {
        setError('Invalid game information');
        setProcessing(false);
        return;
      }

      // Create Razorpay order on backend
      const orderResponse = await api.post('/razorpay/order', {
        amount: item.price,
        currency: 'INR',
        receipt: `receipt_order_${Date.now()}`,
        gameId: item.gameId // Include gameId in order creation
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!orderResponse.data.success) {
        setError('Failed to create payment order');
        setProcessing(false);
        return;
      }

      const { order } = orderResponse.data;

      // Load Razorpay script dynamically
      const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        setError('Failed to load Razorpay SDK');
        setProcessing(false);
        return;
      }

      // Initialize Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Game Store',
        description: `Purchase of ${item.title}`,
        order_id: order.id,
        handler: async function(response) {
          try {
            console.log('Payment response:', response);
            
            // Verify the payment
            console.log('Sending verification request...');
            console.log('Item in verification:', item); // Debug log
            const verifyResponse = await api.post('/razorpay/verify', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              gameId: item.gameId || item._id // Try both possible ID fields
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });

            if (verifyResponse.data.success) {
              setSuccess(true);
              setProcessing(false);
              // Show success message before redirecting
              alert('Payment successful! Redirecting to your library...');
              navigate('/library');
            } else {
              console.error('Verification failed:', verifyResponse.data);
              setError(verifyResponse.data.message || 'Payment verification failed');
              setProcessing(false);
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setError('Payment verification failed');
            setProcessing(false);
          }
        },
        prefill: {
          name: userDetails.username,
          email: userDetails.email
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: function() {
            setError('Payment cancelled');
            setProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function(response) {
        console.error('Payment Failed:', response.error);
        setError(`Payment Failed: ${response.error.description}`);
        setProcessing(false);
      });
      rzp.open();

    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')}>Back to Store</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', backgroundColor: '#222', color: '#eee', borderRadius: '8px' }}>
      <h2>Checkout</h2>
      <p>Total Items: {getCartCount()}</p>
      <p>Total Amount: ${getCartTotal().toFixed(2)}</p>

      {success ? (
        <div style={{ color: 'lightgreen', marginTop: '1rem' }}>
          Payment successful!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email:</label><br />
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Username:</label><br />
            <input
              type="text"
              name="username"
              value={userDetails.username}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
            />
          </div>

          <button type="submit" disabled={processing} style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', backgroundColor: '#e02f5a', color: '#fff', border: 'none', cursor: 'pointer' }}>
            {processing ? 'Processing...' : 'Pay Now'}
          </button>
          {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        </form>
      )}
    </div>
  );
};

export default Checkout;
