import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import Footer from '../components/footer';
import { useCart } from '../utils/cart';

const GameDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (gameDetails) {
      const success = await addToCart(gameDetails);
      if (success) {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000); // Hide message after 2 seconds
      }
    }
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        // Fetch all games, then find the one with the matching id
        const res = await api.get('/games');
        const game = res.data.games.find(g => g._id === id);
        if (!game || !game.detailsJsonUrl) {
          setError('Game or details link not found');
          setLoading(false);
          return;
        }
        // Fetch the JSON details from the stored URL
        const detailsResponse = await fetch(game.detailsJsonUrl);
        if (!detailsResponse.ok) {
          throw new Error('Failed to fetch game details');
        }
        const details = await detailsResponse.json();
        // Merge important fields from the game object for cart functionality
        setGameDetails({ 
          ...details, 
          _id: game._id,
          title: game.title,
          price: game.price,
          image: game.image
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGameDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#1a1a1a',
        color: '#f0f0f0'
      }}>
        <div>Loading game details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#1a1a1a',
        color: '#e02f5a'
      }}>
        <div>Error: {error}</div>
      </div>
    );
  }

  if (!gameDetails) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#1a1a1a',
        color: '#f0f0f0'
      }}>
        <div>No game details found</div>
      </div>
    );
  }

  return (
    <div className="container">
      <style>
        {`
          :root {
            --bg-color: #1a1a1a;
            --text-color: #f0f0f0;
            --secondary-text-color: #b0b0b0;
            --accent-color: #e02f5a;
            --accent-hover: #ff4070;
            --card-bg: #222222;
          }

          body {
            background-color: var(--bg-color);
            font-family: 'Inter', sans-serif;
            color: var(--text-color);
            margin: 0;
            padding: 0;
            line-height: 1.6;
          }

          .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid #333;
          }

          .header-logo {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-color);
          }

          .header-nav a {
            color: var(--secondary-text-color);
            text-decoration: none;
            margin-left: 20px;
            font-weight: 500;
            transition: color 0.3s ease;
          }

          .header-nav a:hover {
            color: var(--text-color);
          }

          .hero-section {
            position: relative;
            height: 600px;
            display: flex;
            align-items: flex-end;
            padding: 40px;
            background-size: cover;
            background-position: center;
            background-image: linear-gradient(135deg, #2c1810 0%, #8B4513 50%, #D2691E 100%);
            border-radius: 12px;
            margin-top: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          }
          
          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(255, 0, 0, 0));
          }

          .hero-content {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: flex-end;
            gap: 20px;
          }
          
          .hero-logo {
            width: 250px;
            height: 350px;
            background: linear-gradient(145deg, #333, #555);
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
          }

          .hero-text h1 {
            font-size: 48px;
            margin: 0 0 10px;
          }

          .hero-text p {
            font-size: 18px;
            color: var(--secondary-text-color);
            margin: 0 0 20px;
            max-width: 600px;
          }

          .cta-button {
            background-color: var(--accent-color);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .cta-button:hover {
            background-color: var(--accent-hover);
          }
          
          .main-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 40px;
            margin-top: 40px;
          }

          .main-content-left {
            display: flex;
            flex-direction: column;
            gap: 40px;
          }

          .section {
            background-color: var(--card-bg);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }

          .section-title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 20px;
            border-left: 4px solid var(--accent-color);
            padding-left: 15px;
          }

          .carousel-container {
            position: relative;
            overflow: hidden;
            border-radius: 12px;
            height: 400px;
            background: #333;
          }

          .carousel-wrapper {
            display: flex;
            transition: transform 0.5s ease-in-out;
            height: 100%;
          }

          .carousel-slide {
            min-width: 100%;
            height: 100%;
            position: relative;
          }

          .carousel-slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .carousel-slide-placeholder {
            width: 100%;
            height: 100%;
            background: linear-gradient(145deg, #333, #555);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 18px;
            text-align: center;
          }

          .carousel-indicators {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
          }

          .carousel-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .carousel-indicator.active {
            background: #e02f5a;
          }

          .carousel-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            font-size: 18px;
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 50%;
            transition: background 0.3s ease;
          }

          .carousel-nav:hover {
            background: rgba(0, 0, 0, 0.8);
          }

          .carousel-prev {
            left: 20px;
          }

          .carousel-next {
            right: 20px;
          }

          .features-list {
            list-style: none;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }

          .feature-item {
            background-color: #2b2b2b;
            padding: 20px;
            border-radius: 8px;
          }

          .feature-item h3 {
            font-size: 20px;
            margin: 0 0 10px;
            color: var(--accent-color);
          }

          .feature-item p {
            margin: 0;
            color: var(--secondary-text-color);
          }

          .main-content-right {
            display: flex;
            flex-direction: column;
            gap: 40px;
          }

          .info-box {
            background-color: var(--card-bg);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
          
          .info-box h2 {
            font-size: 20px;
            margin-bottom: 15px;
            color: var(--accent-color);
          }
          
          .info-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #333;
          }

          .info-item:last-child {
            border-bottom: none;
          }
          
          .info-label {
            color: var(--secondary-text-color);
          }
          
          .info-value {
            font-weight: 500;
            text-align: right;
            max-width: 60%;
          }
          
          .footer {
            text-align: center;
            padding: 40px 0;
            color: var(--secondary-text-color);
            font-size: 14px;
            border-top: 1px solid #333;
            margin-top: 40px;
          }

          .back-button {
            margin-top: 20px;
            background: none;
            border: 2px solid var(--accent-color);
            color: var(--accent-color);
            padding:  10px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 20px;
          }

          .back-button:hover {
            background-color: var(--accent-color);
            color: white;
          }

          @media (max-width: 900px) {
            .main-content {
              grid-template-columns: 1fr;
            }
            .hero-section {
              height: 450px;
            }
          }
        `}
      </style>

    {/*   <Header /> */}
      
      <button className="back-button" onClick={() => window.history.back()}>
        ← {/* Back to Store */}
      </button>

      <HeroSection gameDetails={gameDetails} handleAddToCart={handleAddToCart} addedToCart={addedToCart} />
      
      <div className="container main-content">
        <div className="main-content-left">
          <MediaGallery screenshots={gameDetails.screenshots} />
          <GameDescription about={gameDetails.about} />
          <FeaturesSection features={gameDetails.keyFeatures} />
        </div>
        <div className="main-content-right">
          <GameDetails details={gameDetails.details} />
          <SystemRequirements specs={gameDetails.systemSpecs} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const Header = () => (
  <header className="header container">
    <div className="header-logo">EPIC GAMES</div>
    <nav className="header-nav">
      <a href="#">Store</a>
      <a href="#">News</a>
      <a href="#">FAQ</a>
      <a href="#">Help</a>
    </nav>
  </header>
);

const HeroSection = ({ gameDetails, handleAddToCart, addedToCart }) => {
  // Debug log for backgroundImage
  console.log('Background image for hero:', gameDetails.backgroundImage);
  // Fallback image if backgroundImage is missing or fails
  const fallbackBg = 'https://placehold.co/1400x600/333333/ffffff?text=No+Background+Image';
  const bgImage = gameDetails.backgroundImage
    ? `url('${gameDetails.backgroundImage}')`
    : `url('${fallbackBg}')`;

  // Add purchase handler
  const navigate = useNavigate();

  const handlePurchase = async () => {
    if (!gameDetails) return;
    // Add to cart first
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to purchase');
      return;
    }
    try {
      await api.post('/cart/add', {
        gameId: gameDetails._id,
        title: gameDetails.title,
        price: gameDetails.price,
        image: gameDetails.image,
        logo: gameDetails.logo,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Navigate to checkout page
      navigate('/checkout');
    } catch (error) {
      alert('Error processing purchase: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        {gameDetails.logo ? (
          <img
            className="hero-logo"
            src={gameDetails.logo}
            alt="Game Logo"
            style={{ width: '250px', height: '350px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', objectFit: 'contain', background: '#222' }}
          />
        ) : (
          <div className="hero-logo">GAME LOGO</div>
        )}
        <div className="hero-text">
          <h1>{gameDetails.title}</h1>
          <p>{gameDetails.about}</p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button className="cta-button" onClick={handlePurchase}>Purchase Now</button>
            <button 
              className="cta-button" 
              style={{ backgroundColor: addedToCart ? '#4CAF50' : '#444', color: '#fff' }} 
              onClick={handleAddToCart}
            >
              {addedToCart ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

  const MediaGallery = ({ screenshots }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = screenshots && screenshots.length > 0 ? screenshots : [
      'Screenshot 1', 'Screenshot 2', 'Screenshot 3', 'Screenshot 4'
    ];

    // Auto-slide functionality
    useEffect(() => {
      if (slides.length <= 1) return;
      
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
      setCurrentSlide(index);
    };

    const nextSlide = () => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
      setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    };

    return (
      <section className="section">
        <h2 className="section-title">Screenshots</h2>
        <div className="carousel-container">
          <div 
            className="carousel-wrapper" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="carousel-slide">
                {screenshots && screenshots.length > 0 ? (
                  <img src={slide} alt={`Screenshot ${index + 1}`} />
                ) : (
                  <div className="carousel-slide-placeholder">{slide}</div>
                )}
              </div>
            ))}
          </div>
          
          {slides.length > 1 && (
            <>
              <button className="carousel-nav carousel-prev" onClick={prevSlide}>
                &#8249;
              </button>
              <button className="carousel-nav carousel-next" onClick={nextSlide}>
                &#8250;
              </button>
              
              <div className="carousel-indicators">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    );
  };

const GameDescription = ({ about }) => (
  <section className="section">
    <h2 className="section-title">About the Game</h2>
    <p>{about}</p>
  </section>
);

const FeaturesSection = ({ features }) => (
  <section className="section">
    <h2 className="section-title">Key Features</h2>
    <ul className="features-list">
      {features && features.length > 0 ? (
        features.map((feature, index) => (
          <li key={index} className="feature-item">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </li>
        ))
      ) : (
        <>
          <li className="feature-item">
            <h3>Amazing Feature</h3>
            <p>Description of this amazing feature.</p>
          </li>
          <li className="feature-item">
            <h3>Great Gameplay</h3>
            <p>Experience incredible gameplay mechanics.</p>
          </li>
        </>
      )}
    </ul>
  </section>
);

const GameDetails = ({ details }) => (
  <aside className="info-box">
    <h2>Details</h2>
    <div className="info-item">
      <span className="info-label">Developer</span>
      <span className="info-value">{details?.developer || 'N/A'}</span>
    </div>
    <div className="info-item">
      <span className="info-label">Publisher</span>
      <span className="info-value">{details?.publisher || 'N/A'}</span>
    </div>
    <div className="info-item">
      <span className="info-label">Release Date</span>
      <span className="info-value">{details?.releaseDate || 'TBA'}</span>
    </div>
    <div className="info-item">
      <span className="info-label">Tags</span>
      <span className="info-value">{details?.tags || 'N/A'}</span>
    </div>
    <div className="info-item">
      <span className="info-label">Platforms</span>
      <span className="info-value">{details?.platforms || 'N/A'}</span>
    </div>
  </aside>
);

const SystemRequirements = ({ specs }) => (
  <aside className="info-box">
    <h2>System Requirements</h2>
    <div className="info-item">
      <span className="info-label">OS</span>
      <span className="info-value">{specs?.OS || 'N/A'}</span>
    </div>
    <div className="info-item">
      <span className="info-label">Processor</span>
      <span className="info-value">{specs?.Processor || 'N/A'}</span>
    </div>
    <div className="info-item">
      <span className="info-label">Memory</span>
      <span className="info-value">{specs?.Memory || 'N/A'}</span>
    </div>
    <div className="info-item">
      <span className="info-label">Graphics</span>
      <span className="info-value">{specs?.Graphics || 'N/A'}</span>
    </div>
    <div className="info-item">
      <span className="info-label">Storage</span>
      <span className="info-value">{specs?.Storage || 'N/A'}</span>
    </div>
  </aside>
);



export default GameDetailsPage;