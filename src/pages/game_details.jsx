import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Footer from '../components/footer';

const GameDetailsPage = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        // Optionally, merge some fields from the game object
        setGameDetails({ ...details, title: game.title });
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

          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
          }

          .gallery-item {
            border-radius: 8px;
            overflow: hidden;
            width: 100%;
            height: 200px;
            background: linear-gradient(145deg, #333, #555);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 14px;
            text-align: center;
            transition: transform 0.2s ease;
            cursor: pointer;
          }
          
          .gallery-item:hover {
            transform: scale(1.03);
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
            background: none;
            border: 2px solid var(--accent-color);
            color: var(--accent-color);
            padding: 10px 20px;
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

      <Header />
      
      <button className="back-button" onClick={() => window.history.back()}>
        ← Back to Store
      </button>

      <HeroSection gameDetails={gameDetails} />
      
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

const HeroSection = ({ gameDetails }) => {
  // Debug log for backgroundImage
  console.log('Background image for hero:', gameDetails.backgroundImage);
  // Fallback image if backgroundImage is missing or fails
  const fallbackBg = 'https://placehold.co/1400x600/333333/ffffff?text=No+Background+Image';
  const bgImage = gameDetails.backgroundImage
    ? `url('${gameDetails.backgroundImage}')`
    : `url('${fallbackBg}')`;
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
          <button className="cta-button">Purchase Now</button>
        </div>
      </div>
    </section>
  );
};

  const MediaGallery = ({ screenshots }) => (
    <section className="section">
      <h2 className="section-title">Screenshots</h2>
      <div className="gallery-grid">
        {screenshots && screenshots.length > 0 ? (
          screenshots.map((screenshot, index) => (
            <img
              key={index}
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              className="gallery-item"
              style={{ objectFit: 'cover', width: '100%', height: '200px' }}
            />
          ))
        ) : (
          <>
            <div className="gallery-item">Screenshot 1</div>
            <div className="gallery-item">Screenshot 2</div>
            <div className="gallery-item">Screenshot 3</div>
            <div className="gallery-item">Screenshot 4</div>
          </>
        )}
      </div>
    </section>
  );

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