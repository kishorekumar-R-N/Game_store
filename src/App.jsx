import React from 'react';
import Navbar from './components/navbar.jsx';
import Carousel from './components/carousel.jsx';
import Main_container from './components/Main_container.jsx';


const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Carousel />
      <Main_container />

 
    {/*   <div className="main-content">
        <h1>Welcome to the Store</h1>
        <p>This is a demonstration of a responsive navbar using standard CSS.</p>
      </div> */}
    </div>
  );
};

export default App;