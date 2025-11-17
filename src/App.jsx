import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Carousel from './components/carousel.jsx';
import Main_container from './components/Main_container.jsx';
import Footer from './components/footer.jsx';
import Signup from './pages/signup.jsx';
import Login from './pages/Login.jsx';
import Adminpage from './pages/adminpage.jsx';
import Gamedetails from './pages/game_details.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Library from './pages/Library.jsx';
import News from './pages/news.jsx';
const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carousel />
                <Main_container />
                <Footer />
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Adminpage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/library" element={<Library />} />
          <Route path="/news" element={<News />} />
          <Route path="/game/:id" element={<Gamedetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;