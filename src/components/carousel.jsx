import React, { useState } from 'react';
import Search_div from './search_div';
import '../homepage.css';
import EA_SPORTS_FC_26 from '../assets/imgi_3_egs-fc-26-carousel-desktop-1248x702-cfdaed18f79f.jpg'
import Cronos from '../assets/imgi_6_egs-cronos-the-new-dawn-carousel-desktop-1920x1080-21ba05bc64ed.jpg';
import Lords from '../assets/imgi_4_egs-lords-of-the-fallen-2-carousel-desktop-1920x1080-736638a4b8c0.jpg';
import John from '../assets/imgi_5_egs-john-carpenter-toxic-commando-carousel-desktop-1920x1080-83748240757d.jpg'
import Fortnite from '../assets/imgi_2_egs-fortnite-c6s4-carousel-desktop-1920x1080-d9c1ca4e148e.jpg';

// Main application component
export default function App() {
  // Define the slide data with placeholder images and text.
  const slides = [
    {
      id: 0,
      image: Lords,
      title: 'Lords of the Fallen II',
      description: 'Battle against the darkness in the upcoming dark fantasy action-RPG where brutal, soulslike combat meets a world splitting at its core.',
      buttonText: 'Wishlist Now',
      isNew: true,
      thumbnail: Lords,
      alt: 'Lords of the Fallen II thumbnail'
    },
    {
      id: 1,
      image: Fortnite,
      title: 'Fortnite',
      description: 'Join the battle in Fortnite, the ultimate survival game! Build, craft, and fight your way to victory.',
      buttonText: 'Play Now',
      isNew: false,
      thumbnail: Fortnite,
      alt: 'Fortnite thumbnail'
    },
    {
      id: 2,
      image: EA_SPORTS_FC_26,
      title: 'EA SPORTS FC™ 26',
      description: 'Experience the next generation of football realism with EA SPORTS FC™ 26. Pre-order now and get exclusive in-game content.',
      buttonText: 'Pre-Order Now',
      isNew: false,
      thumbnail: EA_SPORTS_FC_26,
      alt: 'EA Sports FC 26 thumbnail'
    },
    {
      id: 3,
      image: John,
      title: 'John Carpenter\'s Toxic Commando',
      description: 'From the master of horror, a new cooperative FPS. Team up with your friends to take on a hoard of monstrous abominations.',
      buttonText: 'Learn More',
      isNew: true,
      thumbnail: John,
      alt: 'Toxic Commando thumbnail'
    },
    {
      id: 4,
      image: Cronos,
      title: 'Cronos: The New Dawn',
      description: 'A grand strategy game where you guide your civilization through the ages. Build, conquer, and leave your mark on history.',
      buttonText: 'Wishlist Now',
      isNew: false,
      thumbnail: Cronos,
      alt: 'Cronos: The New Dawn thumbnail'
    },
  ];

  // State to keep track of the currently active slide index.
  const [activeSlide, setActiveSlide] = useState(0);

  // Get the current slide data based on the active index.
  const currentSlide = slides[activeSlide];

  // Function to handle moving to the next slide.
  const nextSlide = () => {
    setActiveSlide((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Function to handle moving to the previous slide.
  const prevSlide = () => {
    setActiveSlide((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <Search_div/> 
      <div className="app-containe">
        {/* Main Carousel Area */}
        <div className="carousel-main-area">
          <div className="carousel-container">
            {/* Main image with dark overlay */}
            <div className="image-overlay"></div>
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="slide-image"
              onError={(e) => {
                e.target.src = 'https://placehold.co/1200x675/000000/ffffff?text=Image+Not+Found';
              }}
            />
            
            {/* Content container */}
            <div className="content-container">
              <h1 className="main-title">{currentSlide.title}</h1>
              <p className="description">{currentSlide.description}</p>
              <div className="button-group">
                {/* Wishlist button */}
                <button className="wishlist-button">
                  {currentSlide.buttonText}
                </button>
                {/* Add to Wishlist link */}
                <div className="wishlist-link">
                  <svg className="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <a href="#">
                    Add to Wishlist
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="nav-button prev-button"
            >
              <svg className="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="nav-button next-button"
            >
              <svg className="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Sidebar with Thumbnails */}
        <div className="sidebar">
          {slides.map((slide) => (
            <div
              key={slide.id}
              onClick={() => setActiveSlide(slide.id)}
              className={`thumbnail-item ${
                activeSlide === slide.id ? 'active' : ''
              }`}
            >
              <img
                src={slide.thumbnail}
                alt={slide.alt}
                className="thumbnail-image"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/150x150/000000/ffffff?text=Image+Not+Found';
                }}
              />
              <div className="thumbnail-text">
                <h3 className="thumbnail-title">{slide.title}</h3>
                {slide.isNew && (
                  <span className="new-tag">
                    NEW
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}