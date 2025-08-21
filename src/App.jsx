import React from 'react';
import Navbar from './components/navbar.jsx';

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <h1>Welcome to the Store</h1>
        <p>This is a demonstration of a responsive navbar using standard CSS.</p>
      </div>
    </div>
  );
};

export default App;