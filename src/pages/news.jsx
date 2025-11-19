import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../news.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
        const response = await axios.get(`${API_BASE}/news`);
        console.log('Fetched news:', response.data); // Debug log
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError('Failed to load news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="news-container">
        <h1 className="news-header">Loading News...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-container">
        <h1 className="news-header">Error</h1>
        <p style={{ color: '#fff', textAlign: 'center' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="news-container">
      <h1 className="news-header">Latest Gaming News</h1>
      <div className="news-grid">
        {news.map((item, index) => (
          <article key={item.id || index} className="news-item">
            <div className="news-image-container">
              <img
                src={item.image}
                alt={item.title}
                className="news-image"
                onError={(e) => { e.target.src = '/placeholder-news.jpg'; }}
              />
            </div>
            <div className="news-content">
              <h2 className="news-title">{item.title}</h2>
              <p className="news-description">{item.short}</p>
              <div className="news-meta">
                By {item.author} on {new Date(item.date).toLocaleDateString()}
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-link"
              >
                Read More →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default News;