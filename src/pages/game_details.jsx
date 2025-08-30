import React from 'react';

// Main App component that renders the entire page.
const App = () => {
  return (
    <div className="container">
      {/* CSS for the entire app. It's placed here to keep everything self-contained. */}
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
            background-image: url('https://placehold.co/1400x600/333333/ffffff?text=HERO+BACKGROUND+IMAGE');
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
            background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
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
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          }

          .hero-text h1 {
            font-size: 48px;
            margin: 0 0 10px;
          }

          .hero-text p {
            font-size: 18px;
            color: var(--secondary-text-color);
            margin: 0 0 20px;
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
            height: auto;
            display: block;
            object-fit: cover;
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
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
          }
          
          .footer {
            text-align: center;
            padding: 40px 0;
            color: var(--secondary-text-color);
            font-size: 14px;
            border-top: 1px solid #333;
            margin-top: 40px;
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
      <HeroSection />
      <div className="container main-content">
        <div className="main-content-left">
          <MediaGallery />
          <GameDescription />
          <FeaturesSection />
        </div>
        <div className="main-content-right">
          <GameDetails />
          <SystemRequirements />
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Component for the header navigation.
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

// Component for the main hero section with the background image.
const HeroSection = () => (
  <section className="hero-section">
    <div className="hero-overlay"></div>
    <div className="hero-content">
      <img
        src="https://placehold.co/250x350/555555/ffffff?text=GAME+LOGO"
        alt="Game Logo"
        className="hero-logo"
      />
      <div className="hero-text">
        <h1>Killing Floor 3</h1>
        <p>
          Welcome to the future of slaughter. The year is 2091, and global
          megacorp Horzine has produced the ultimate army: the Zeds. Take on a
          squad-based mission in this action-horror FPS.
        </p>
        <button className="cta-button">Pre-Order Now</button>
      </div>
    </div>
  </section>
);

// Component for the image/video gallery.
const MediaGallery = () => (
  <section className="section">
    <h2 className="section-title">Media</h2>
    <div className="gallery-grid">
      <img
        src="https://placehold.co/600x350/444444/ffffff?text=Screenshot+1"
        alt="Screenshot 1"
        className="gallery-item"
      />
      <img
        src="https://placehold.co/600x350/444444/ffffff?text=Screenshot+2"
        alt="Screenshot 2"
        className="gallery-item"
      />
      <img
        src="https://placehold.co/600x350/444444/ffffff?text=Screenshot+3"
        alt="Screenshot 3"
        className="gallery-item"
      />
      <img
        src="https://placehold.co/600x350/444444/ffffff?text=Screenshot+4"
        alt="Screenshot 4"
        className="gallery-item"
      />
    </div>
  </section>
);

// Component for the main game description.
const GameDescription = () => (
  <section className="section">
    <h2 className="section-title">About the Game</h2>
    <p>
      Killing Floor 3 is the next installment in the legendary co-op horror FPS
      series. The year is 2091, 70 years after the events of Killing Floor 2.
      Horzine is now a ruthless global megacorp and the ultimate creator of the
      Zed army. You are a member of a rogue group of misfits and rebels called
      Nightfall, fighting back against the megacorp and their deadly creations.
      Experience the visceral thrill of taking down waves of Zeds, from
      low-level creeps to the fearsome bosses that stand in your way.
    </p>
    <p>
      This new chapter introduces new weapons, classes, and enemy types while
      retaining the core formula that fans love. Team up with friends, customize
      your character, and survive the onslaught in a grim, futuristic world.
    </p>
  </section>
);

// Component for key features.
const FeaturesSection = () => (
  <section className="section">
    <h2 className="section-title">Key Features</h2>
    <ul className="features-list">
      <li className="feature-item">
        <h3>Co-op Survival</h3>
        <p>Team up with up to 5 other players to fight for your lives.</p>
      </li>
      <li className="feature-item">
        <h3>Visceral Combat</h3>
        <p>Brutal, high-impact gunplay and melee combat against terrifying Zeds.</p>
      </li>
      <li className="feature-item">
        <h3>New Enemies</h3>
        <p>Face off against a deadly new roster of Zeds and colossal bosses.</p>
      </li>
      <li className="feature-item">
        <h3>Deep Progression</h3>
        <p>Unlock new skills, weapons, and cosmetics as you level up your class.</p>
      </li>
    </ul>
  </section>
);

// Component for game details (platforms, developer, etc.).
const GameDetails = () => (
  <aside className="info-box">
    <h2>Details</h2>
    <div className="info-item">
      <span className="info-label">Developer</span>
      <span className="info-value">Tripwire Interactive</span>
    </div>
    <div className="info-item">
      <span className="info-label">Publisher</span>
      <span className="info-value">Tripwire Presents</span>
    </div>
    <div className="info-item">
      <span className="info-label">Release Date</span>
      <span className="info-value">TBA</span>
    </div>
    <div className="info-item">
      <span className="info-label">Tags</span>
      <span className="info-value">Action, FPS, Horror</span>
    </div>
    <div className="info-item">
      <span className="info-label">Platforms</span>
      <span className="info-value">PC, PS5, Xbox Series X|S</span>
    </div>
  </aside>
);

// Component for system requirements.
const SystemRequirements = () => (
  <aside className="info-box">
    <h2>System Requirements</h2>
    <div className="info-item">
      <span className="info-label">OS</span>
      <span className="info-value">Windows 10</span>
    </div>
    <div className="info-item">
      <span className="info-label">Processor</span>
      <span className="info-value">Intel Core i5-9600K</span>
    </div>
    <div className="info-item">
      <span className="info-label">Memory</span>
      <span className="info-value">16 GB RAM</span>
    </div>
    <div className="info-item">
      <span className="info-label">Graphics</span>
      <span className="info-value">NVIDIA GeForce RTX 2060</span>
    </div>
    <div className="info-item">
      <span className="info-label">Storage</span>
      <span className="info-value">20 GB available space</span>
    </div>
  </aside>
);

// Component for the page footer.
const Footer = () => (
  <footer className="footer container">
    <p>&copy; 2024 Your Website. All Rights Reserved.</p>
  </footer>
);

export default App;
