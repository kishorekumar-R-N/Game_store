import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Carousel from './components/carousel.jsx';
import Main_container from './components/Main_container.jsx';
import Footer from './components/footer.jsx';
import Signup from './pages/signup.jsx';
import Login from './pages/Login.jsx';

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;