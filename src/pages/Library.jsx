import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import '../library.css';

const Library = () => {
  const [purchasedGames, setPurchasedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibrary = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Get library games with populated game details
        const response = await api.get('/library', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('Library Response:', response.data); // Debug log
        setPurchasedGames(response.data.games);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch library:', err);
        setError('Failed to fetch your library');
        setLoading(false);
      }
    };

    fetchLibrary();
  }, [navigate]);

  const handleDownload = async (gameId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to download');
      return;
    }

    try {
      const response = await api.get(`/games/download/${gameId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.data.success) {
        setError(response.data.message || 'Failed to initiate download');
        return;
      }

      // Create a download link
      const link = document.createElement('a');
      link.href = response.data.downloadUrl;
      link.download = response.data.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download error:', err);
      setError(err.response?.data?.message || 'Failed to initiate download');
    }
  };

  if (loading) return <div>Loading your library...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="library-container">
      <h1>My Game Library</h1>
      {purchasedGames.length === 0 ? (
        <p>No games in your library yet. Start shopping!</p>
      ) : (
        <div className="library-grid">
          {purchasedGames.map(game => {
            console.log('Rendering game:', game); // Debug log
            return (
              <div key={game._id} className="library-item">
                <div className="game-image">
                  {game.gameId && game.gameId.image ? (
                    <img 
                      src={game.gameId.image}
                      alt={game.title}
                      onError={(e) => {
                        console.log('Image load error for:', game.title);
                        e.target.src = '/placeholder-game.jpg';
                      }}
                    />
                  ) : (
                    <img 
                      src="/placeholder-game.jpg"
                      alt={game.title}
                    />
                  )}
                </div>
                <h3>{game.title}</h3>
                <div className="game-details">
                  <button 
                    onClick={() => handleDownload(game.gameId._id)}
                    className="download-button"
                  >
                    Download Game
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Library;