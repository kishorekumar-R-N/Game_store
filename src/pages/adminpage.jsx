import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit2, Trash2, Plus, BarChart3, Users, DollarSign, Calendar, Eye, EyeOff, Download, Upload } from 'lucide-react';

// Sample initial data
import api from '../api';
// Main App component
const Admin = () => {
    // State variables for game data, form inputs, and UI controls
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [newGame, setNewGame] = useState({ 
        title: '', 
        genre: '', 
        price: '', 
        releaseDate: '', 
        imageUrl: '',
        description: '',
        developer: '',
        publisher: '',
        rating: '',
        platform: '',
        featured: false,
        inStock: true,
        stockCount: 100
    });
    const [loading, setLoading] = useState(false);
    
    // UI state for enhanced features

    const [editingGame, setEditingGame] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGenre, setFilterGenre] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showForm, setShowForm] = useState(false);
    const [selectedGames, setSelectedGames] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
    const [stats, setStats] = useState({
        totalGames: 0,
        totalValue: 0,
        avgPrice: 0,
        genres: {},
        featuredCount: 0
    });

    // Fetch all games from the backend on mount
    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                const res = await api.get('/games');
                setGames(res.data.games || []);
            } catch (err) {
                setGames([]);
            }
            setLoading(false);
        };
        fetchGames();
    }, []);

    // Calculate statistics whenever games change
    useEffect(() => {
        calculateStats(games);
    }, [games]);

    // Filter and search games
    useEffect(() => {
        let filtered = games.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                game.developer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                game.publisher?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = !filterGenre || game.genre === filterGenre;
            const matchesPrice = (!priceFilter.min || Number(game.price) >= Number(priceFilter.min)) &&
                               (!priceFilter.max || Number(game.price) <= Number(priceFilter.max));
            
            return matchesSearch && matchesGenre && matchesPrice;
        });

        // Sort games
        filtered.sort((a, b) => {
            let aVal = a[sortBy];
            let bVal = b[sortBy];
            
            if (sortBy === 'price') {
                aVal = Number(aVal);
                bVal = Number(bVal);
            }
            
            if (sortOrder === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        setFilteredGames(filtered);
    }, [games, searchTerm, filterGenre, sortBy, sortOrder, priceFilter]);

    // Calculate statistics
    const calculateStats = (gamesData) => {
        const totalGames = gamesData.length;
        const totalValue = gamesData.reduce((sum, game) => sum + Number(game.price || 0), 0);
        const avgPrice = totalGames > 0 ? totalValue / totalGames : 0;
        const featuredCount = gamesData.filter(game => game.featured).length;
        
        const genres = {};
        gamesData.forEach(game => {
            if (game.genre) {
                genres[game.genre] = (genres[game.genre] || 0) + 1;
            }
        });

        setStats({
            totalGames,
            totalValue,
            avgPrice,
            genres,
            featuredCount
        });
    };

    // Get unique genres for filter dropdown
    const getUniqueGenres = () => {
        return [...new Set(games.map(game => game.genre).filter(Boolean))];
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const gameData = editingGame ? setEditingGame : setNewGame;
        gameData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    // Generate unique ID
    const generateId = () => {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    };

    // Handle adding/updating a game (CRUD with backend)
    const handleAddGame = async (e) => {
        e.preventDefault();
        const gameData = editingGame || newGame;
        if (!gameData.title.trim() || !gameData.genre.trim() || !gameData.price) {
            alert('Please fill in the required fields: Title, Genre, and Price.');
            return;
        }
        setLoading(true);
        try {
            if (editingGame) {
                // Update game
                const res = await api.put(`/games/${editingGame._id}`, {
                    title: gameData.title,
                    description: gameData.description,
                    image: gameData.imageUrl,
                    price: Number(gameData.price),
                    genre: gameData.genre,
                    detailsJsonUrl: gameData.detailsJsonUrl
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setGames(prev => prev.map(g => g._id === editingGame._id ? res.data.game : g));
                setEditingGame(null);
            } else {
                // Add new game
                const res = await api.post('/games', {
                    title: newGame.title,
                    description: newGame.description,
                    image: newGame.imageUrl,
                    price: Number(newGame.price),
                    genre: newGame.genre,
                    detailsJsonUrl: newGame.detailsJsonUrl
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setGames(prev => [res.data.game, ...prev]);
            }
            setNewGame({ 
                title: '', genre: '', price: '', releaseDate: '', imageUrl: '',
                description: '', developer: '', publisher: '', rating: '', platform: '',
                featured: false, inStock: true, stockCount: 100
            });
            setShowForm(false);
        } catch (err) {
            alert('Failed to save game. Please check your input and try again.');
        }
        setLoading(false);
    };

    // Handle deleting a game (CRUD with backend)
    const handleDeleteGame = async (gameId) => {
        if (!confirm('Are you sure you want to delete this game?')) return;
        setLoading(true);
        try {
            await api.delete(`/games/${gameId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setGames(prev => prev.filter(game => game._id !== gameId));
            setSelectedGames(prev => prev.filter(id => id !== gameId));
        } catch (err) {
            alert('Failed to delete game. Please check your input and try again.');
        }
        setLoading(false);
    };

    // Handle bulk actions
    const handleBulkDelete = () => {
        if (!selectedGames.length || !confirm(`Delete ${selectedGames.length} selected games?`)) return;
        
        setGames(prevGames => prevGames.filter(game => !selectedGames.includes(game.id)));
        setSelectedGames([]);
    };

    const handleBulkFeature = (featured) => {
        if (!selectedGames.length) return;
        
        setGames(prevGames => 
            prevGames.map(game => 
                selectedGames.includes(game.id) 
                    ? { ...game, featured }
                    : game
            )
        );
        setSelectedGames([]);
    };

    // Export data as JSON
    const handleExportData = () => {
        const dataStr = JSON.stringify(games, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'games_export.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    // Handle file import
    const handleImportData = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedGames = JSON.parse(event.target.result);
                    if (Array.isArray(importedGames)) {
                        setGames(importedGames);
                        alert('Games imported successfully!');
                    } else {
                        alert('Invalid file format. Please select a valid JSON file.');
                    }
                } catch (error) {
                    alert('Error reading file. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
        e.target.value = '';
    };

    // Handle game selection
    const handleGameSelect = (gameId, isSelected) => {
        if (isSelected) {
            setSelectedGames(prev => [...prev, gameId]);
        } else {
            setSelectedGames(prev => prev.filter(id => id !== gameId));
        }
    };

    const handleSelectAll = () => {
        if (selectedGames.length === filteredGames.length) {
            setSelectedGames([]);
        } else {
            setSelectedGames(filteredGames.map(game => game.id));
        }
    };

    const currentGame = editingGame || newGame;

    return (
        <div className="admin-page">
            <style>
                {`
                /* Base Styles */
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                
                * {
                  box-sizing: border-box;
                }
                
                .admin-page {
                  min-height: 100vh;
                  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
                  padding: 1rem;
                }
                
                .container {
                  max-width: 1400px;
                  margin: 0 auto;
                  display: flex;
                  flex-direction: column;
                  gap: 1.5rem;
                }
                
                /* Card Styles */
                .card {
                  background: rgba(30, 30, 30, 0.95);
                  backdrop-filter: blur(10px);
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  border-radius: 12px;
                  padding: 1.5rem;
                  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                }
                
                .header-card {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  border: none;
                }
                
                .title {
                  font-size: 2.5rem;
                  font-weight: 800;
                  margin: 0 0 0.5rem 0;
                }
                
                .subtitle {
                  opacity: 0.9;
                  font-size: 1.1rem;
                }
                
                /* Stats Dashboard */
                .stats-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                  gap: 1rem;
                  margin-bottom: 1rem;
                }
                
                .stat-card {
                  background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
                  padding: 1.5rem;
                  border-radius: 12px;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  text-align: center;
                  transition: transform 0.2s ease;
                }
                
                .stat-card:hover {
                  transform: translateY(-2px);
                }
                
                .stat-icon {
                  margin: 0 auto 0.5rem;
                  padding: 12px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  border-radius: 12px;
                  width: fit-content;
                }
                
                .stat-value {
                  font-size: 1.8rem;
                  font-weight: 700;
                  color: #ffffff;
                  margin: 0.5rem 0;
                }
                
                .stat-label {
                  color: #a0a0a0;
                  font-size: 0.9rem;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                
                /* Controls */
                .controls {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 1rem;
                  align-items: center;
                  margin-bottom: 1.5rem;
                }
                
                .search-input, .filter-select {
                  padding: 0.75rem 1rem;
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  background: rgba(40, 40, 40, 0.8);
                  color: #ffffff;
                  border-radius: 8px;
                  outline: none;
                  transition: all 0.2s ease;
                }
                
                .search-input:focus, .filter-select:focus {
                  border-color: #667eea;
                  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
                }
                
                .btn {
                  padding: 0.75rem 1.5rem;
                  border: none;
                  border-radius: 8px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s ease;
                  display: inline-flex;
                  align-items: center;
                  gap: 0.5rem;
                  text-decoration: none;
                }
                
                .btn-primary {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                }
                
                .btn-primary:hover {
                  transform: translateY(-1px);
                  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                }
                
                .btn-secondary {
                  background: rgba(60, 60, 60, 0.8);
                  color: #ffffff;
                  border: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                .btn-secondary:hover {
                  background: rgba(80, 80, 80, 0.8);
                }
                
                .btn-danger {
                  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
                  color: white;
                }
                
                .btn-danger:hover {
                  transform: translateY(-1px);
                  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
                }
                
                .btn-success {
                  background: linear-gradient(135deg, #51cf66 0%, #40c057 100%);
                  color: white;
                }
                
                .file-input {
                  display: none;
                }
                
                /* Form Styles */
                .form-overlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(0, 0, 0, 0.8);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  z-index: 1000;
                  padding: 1rem;
                }
                
                .form-modal {
                  background: #1e1e1e;
                  border-radius: 16px;
                  padding: 2rem;
                  width: 100%;
                  max-width: 600px;
                  max-height: 90vh;
                  overflow-y: auto;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .form-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 1.5rem;
                  padding-bottom: 1rem;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .form-title {
                  font-size: 1.5rem;
                  font-weight: 700;
                  color: #ffffff;
                  margin: 0;
                }
                
                .close-btn {
                  background: none;
                  border: none;
                  color: #a0a0a0;
                  font-size: 1.5rem;
                  cursor: pointer;
                  padding: 0.5rem;
                  border-radius: 6px;
                  transition: all 0.2s ease;
                }
                
                .close-btn:hover {
                  background: rgba(255, 255, 255, 0.1);
                  color: #ffffff;
                }
                
                .form-grid {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 1rem;
                }
                
                @media (min-width: 768px) {
                  .form-grid {
                    grid-template-columns: 1fr 1fr;
                  }
                }
                
                .form-group {
                  display: flex;
                  flex-direction: column;
                  gap: 0.5rem;
                }
                
                .form-group-full {
                  grid-column: 1 / -1;
                }
                
                .form-label {
                  font-weight: 600;
                  color: #ffffff;
                  font-size: 0.9rem;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                
                .form-input, .form-textarea, .form-select {
                  padding: 0.75rem;
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  background: rgba(40, 40, 40, 0.8);
                  color: #ffffff;
                  border-radius: 8px;
                  outline: none;
                  transition: all 0.2s ease;
                  font-size: 1rem;
                }
                
                .form-textarea {
                  resize: vertical;
                  min-height: 80px;
                }
                
                .form-input:focus, .form-textarea:focus, .form-select:focus {
                  border-color: #667eea;
                  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
                }
                
                .checkbox-group {
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                }
                
                .checkbox {
                  width: 18px;
                  height: 18px;
                }
                
                .form-actions {
                  display: flex;
                  gap: 1rem;
                  margin-top: 2rem;
                  padding-top: 1rem;
                  border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                /* Game Grid/List */
                .view-controls {
                  display: flex;
                  align-items: center;
                  gap: 1rem;
                  margin-bottom: 1rem;
                }
                
                .bulk-actions {
                  display: flex;
                  gap: 0.5rem;
                  align-items: center;
                  margin-bottom: 1rem;
                }
                
                .selected-count {
                  color: #667eea;
                  font-weight: 600;
                }
                
                .game-grid {
                  display: grid;
                  gap: 1.5rem;
                }
                
                .grid-view {
                  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                }
                
                .list-view {
                  grid-template-columns: 1fr;
                }
                
                .game-card {
                  background: rgba(40, 40, 40, 0.8);
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  border-radius: 12px;
                  overflow: hidden;
                  transition: all 0.3s ease;
                  position: relative;
                }
                
                .game-card:hover {
                  transform: translateY(-4px);
                  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
                  border-color: rgba(102, 126, 234, 0.5);
                }
                
                .game-card.selected {
                  border-color: #667eea;
                  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
                }
                
                .card-select {
                  position: absolute;
                  top: 1rem;
                  left: 1rem;
                  z-index: 10;
                }
                
                .featured-badge {
                  position: absolute;
                  top: 1rem;
                  right: 1rem;
                  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
                  color: #000;
                  padding: 0.25rem 0.5rem;
                  border-radius: 6px;
                  font-size: 0.75rem;
                  font-weight: 700;
                  text-transform: uppercase;
                }
                
                .game-image {
                  width: 100%;
                  height: 200px;
                  object-fit: cover;
                  transition: transform 0.3s ease;
                }
                
                .game-card:hover .game-image {
                  transform: scale(1.05);
                }
                
                .game-details {
                  padding: 1.5rem;
                  color: #ffffff;
                }
                
                .game-title {
                  font-size: 1.25rem;
                  font-weight: 700;
                  margin: 0 0 0.5rem 0;
                  color: #ffffff;
                }
                
                .game-info {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 0.5rem;
                  margin: 1rem 0;
                  font-size: 0.9rem;
                }
                
                .info-item {
                  color: #a0a0a0;
                }
                
                .info-value {
                  font-weight: 600;
                  color: #ffffff;
                }
                
                .game-description {
                  color: #c0c0c0;
                  line-height: 1.5;
                  margin: 1rem 0;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }
                
                .game-actions {
                  display: flex;
                  gap: 0.5rem;
                  margin-top: 1rem;
                }
                
                .action-btn {
                  flex: 1;
                  padding: 0.5rem;
                  border: none;
                  border-radius: 6px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s ease;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.25rem;
                }
                
                .edit-btn {
                  background: rgba(102, 126, 234, 0.2);
                  color: #667eea;
                  border: 1px solid #667eea;
                }
                
                .edit-btn:hover {
                  background: #667eea;
                  color: white;
                }
                
                .delete-btn {
                  background: rgba(255, 107, 107, 0.2);
                  color: #ff6b6b;
                  border: 1px solid #ff6b6b;
                }
                
                .delete-btn:hover {
                  background: #ff6b6b;
                  color: white;
                }
                
                .loading-spinner-container {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 200px;
                }
                
                .loading-spinner {
                  width: 40px;
                  height: 40px;
                  border: 3px solid rgba(102, 126, 234, 0.3);
                  border-top-color: #667eea;
                  border-radius: 50%;
                  animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
                
                .no-games-text {
                  text-align: center;
                  color: #a0a0a0;
                  padding: 3rem;
                  font-size: 1.1rem;
                }
                
                /* List View Styles */
                .list-view .game-card {
                  display: grid;
                  grid-template-columns: 200px 1fr auto;
                  gap: 1rem;
                  align-items: center;
                }
                
                .list-view .game-image {
                  height: 120px;
                }
                
                .list-view .game-details {
                  padding: 1rem;
                }
                
                .list-view .game-actions {
                  flex-direction: column;
                  min-width: 120px;
                }
                
                /* Responsive Design */
                @media (max-width: 768px) {
                  .controls {
                    flex-direction: column;
                    align-items: stretch;
                  }
                  
                  .form-grid {
                    grid-template-columns: 1fr;
                  }
                  
                  .list-view .game-card {
                    grid-template-columns: 1fr;
                  }
                  
                  .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                  }
                  
                  .title {
                    font-size: 2rem;
                  }
                }
                `}
            </style>

            <div className="container">
                {/* Header */}
                <header className="header-card">
                    <h1 className="title">🎮 Game Store Admin</h1>
                    <p className="subtitle">
                        Advanced game catalog management system • Frontend Demo Version
                    </p>
                </header>

                {/* Statistics Dashboard */}
                <div className="card">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value">{stats.totalGames}</div>
                            <div className="stat-label">Total Games</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <DollarSign size={24} color="white" />
                            </div>
                            <div className="stat-value">${stats.totalValue.toFixed(2)}</div>
                            <div className="stat-label">Total Value</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <BarChart3 size={24} color="white" />
                            </div>
                            <div className="stat-value">${stats.avgPrice.toFixed(2)}</div>
                            <div className="stat-label">Average Price</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <Eye size={24} color="white" />
                            </div>
                            <div className="stat-value">{stats.featuredCount}</div>
                            <div className="stat-label">Featured</div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="card">
                    <div className="controls">
                        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                            <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a0a0a0' }} />
                            <input
                                type="text"
                                placeholder="Search games, developers, publishers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                                style={{ paddingLeft: '45px' }}
                            />
                        </div>
                        
                        <select
                            value={filterGenre}
                            onChange={(e) => setFilterGenre(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">All Genres</option>
                            {getUniqueGenres().map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="filter-select"
                        >
                            <option value="title">Sort by Title</option>
                            <option value="price">Sort by Price</option>
                            <option value="releaseDate">Sort by Release Date</option>
                            <option value="genre">Sort by Genre</option>
                        </select>

                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="btn btn-secondary"
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="number"
                                placeholder="Min $"
                                value={priceFilter.min}
                                onChange={(e) => setPriceFilter(prev => ({ ...prev, min: e.target.value }))}
                                className="search-input"
                                style={{ width: '80px' }}
                            />
                            <input
                                type="number"
                                placeholder="Max $"
                                value={priceFilter.max}
                                onChange={(e) => setPriceFilter(prev => ({ ...prev, max: e.target.value }))}
                                className="search-input"
                                style={{ width: '80px' }}
                            />
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="btn btn-primary"
                        >
                            <Plus size={20} />
                            Add Game
                        </button>

                        <button
                            onClick={handleExportData}
                            className="btn btn-secondary"
                        >
                            <Download size={20} />
                            Export
                        </button>

                        <label className="btn btn-secondary">
                            <Upload size={20} />
                            Import
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImportData}
                                className="file-input"
                            />
                        </label>
                    </div>

                    <div className="view-controls">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            Grid View
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            List View
                        </button>
                        
                        <div style={{ marginLeft: 'auto', color: '#a0a0a0' }}>
                            Showing {filteredGames.length} of {games.length} games
                        </div>
                    </div>

                    {selectedGames.length > 0 && (
                        <div className="bulk-actions">
                            <span className="selected-count">{selectedGames.length} selected</span>
                            <button
                                onClick={handleSelectAll}
                                className="btn btn-secondary"
                                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                            >
                                {selectedGames.length === filteredGames.length ? 'Deselect All' : 'Select All'}
                            </button>
                            <button
                                onClick={() => handleBulkFeature(true)}
                                className="btn btn-success"
                                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                            >
                                <Eye size={16} />
                                Feature
                            </button>
                            <button
                                onClick={() => handleBulkFeature(false)}
                                className="btn btn-secondary"
                                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                            >
                                <EyeOff size={16} />
                                Unfeature
                            </button>
                            <button
                                onClick={handleBulkDelete}
                                className="btn btn-danger"
                                style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                {/* Game List */}
                <div className="card">
                    {loading ? (
                        <div className="loading-spinner-container">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : filteredGames.length === 0 ? (
                        <div className="no-games-text">
                            {games.length === 0 ? 
                                "🎮 No games in your catalog yet! Click 'Add Game' to get started." :
                                "🔍 No games match your current filters. Try adjusting your search criteria."
                            }
                        </div>
                    ) : (
                        <div className={`game-grid ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
                            {filteredGames.map(game => (
                                <div 
                                    key={game.id} 
                                    className={`game-card ${selectedGames.includes(game.id) ? 'selected' : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        className="card-select checkbox"
                                        checked={selectedGames.includes(game.id)}
                                        onChange={(e) => handleGameSelect(game.id, e.target.checked)}
                                    />
                                    
                                    {game.featured && (
                                        <div className="featured-badge">★ Featured</div>
                                    )}
                                    
                                    <img 
                                        src={game.image || game.imageUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop"} 
                                        alt={game.title} 
                                        className="game-image" 
                                        onError={(e) => { 
                                            e.target.onerror = null; 
                                            e.target.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop"; 
                                        }}
                                    />
                                    
                                    <div className="game-details">
                                        <h3 className="game-title">{game.title}</h3>
                                        
                                        {game.description && (
                                            <p className="game-description">{game.description}</p>
                                        )}
                                        
                                        <div className="game-info">
                                            <div className="info-item">
                                                Genre: <span className="info-value">{game.genre}</span>
                                            </div>
                                            <div className="info-item">
                                                Price: <span className="info-value">${Number(game.price).toFixed(2)}</span>
                                            </div>
                                            <div className="info-item">
                                                Release: <span className="info-value">{game.releaseDate || 'TBA'}</span>
                                            </div>
                                            <div className="info-item">
                                                Stock: <span className="info-value">{game.stockCount || 0}</span>
                                            </div>
                                            {game.developer && (
                                                <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                                                    Developer: <span className="info-value">{game.developer}</span>
                                                </div>
                                            )}
                                            {game.publisher && (
                                                <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                                                    Publisher: <span className="info-value">{game.publisher}</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="game-actions">
                                            <button
                                                onClick={() => {
                                                    setEditingGame(game);
                                                    setShowForm(true);
                                                }}
                                                className="action-btn edit-btn"
                                            >
                                                <Edit2 size={16} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteGame(game._id)}
                                                className="action-btn delete-btn"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Game Modal */}
            {showForm && (
                <div className="form-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
                    <div className="form-modal">
                        <div className="form-header">
                            <h2 className="form-title">
                                {editingGame ? 'Edit Game' : 'Add New Game'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingGame(null);
                                    setNewGame({ 
                                        title: '', genre: '', price: '', releaseDate: '', imageUrl: '',
                                        description: '', developer: '', publisher: '', rating: '', platform: '',
                                        featured: false, inStock: true, stockCount: 100
                                    });
                                }}
                                className="close-btn"
                            >
                            </button>
                        </div>
                        
                        <form onSubmit={handleAddGame} className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={currentGame.title}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Genre *</label>
                                <input
                                    type="text"
                                    name="genre"
                                    value={currentGame.genre}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Price *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={currentGame.price}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    className="form-input"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Release Date</label>
                                <input
                                    type="date"
                                    name="releaseDate"
                                    value={currentGame.releaseDate}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Developer</label>
                                <input
                                    type="text"
                                    name="developer"
                                    value={currentGame.developer}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Publisher</label>
                                <input
                                    type="text"
                                    name="publisher"
                                    value={currentGame.publisher}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Platform</label>
                                <select
                                    name="platform"
                                    value={currentGame.platform}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="">Select Platform</option>
                                    <option value="PC">PC</option>
                                    <option value="PlayStation 5">PlayStation 5</option>
                                    <option value="Xbox Series X/S">Xbox Series X/S</option>
                                    <option value="Nintendo Switch">Nintendo Switch</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="Multi-platform">Multi-platform</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Rating</label>
                                <select
                                    name="rating"
                                    value={currentGame.rating}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="">Select Rating</option>
                                    <option value="E">E - Everyone</option>
                                    <option value="E10+">E10+ - Everyone 10+</option>
                                    <option value="T">T - Teen</option>
                                    <option value="M">M - Mature 17+</option>
                                    <option value="AO">AO - Adults Only</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Stock Count</label>
                                <input
                                    type="number"
                                    name="stockCount"
                                    value={currentGame.stockCount}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="form-input"
                                />
                            </div>
                            
                            <div className="form-group form-group-full">
                                <label className="form-label">Image URL</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={currentGame.imageUrl}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            

                            <div className="form-group form-group-full">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    value={currentGame.description}
                                    onChange={handleInputChange}
                                    className="form-textarea"
                                    rows="3"
                                    placeholder="Game description..."
                                />
                            </div>

                            <div className="form-group form-group-full">
                                <label className="form-label">Game Details Link (JSON)</label>
                                <input
                                    type="url"
                                    name="detailsJsonUrl"
                                    value={currentGame.detailsJsonUrl || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="https://raw.githubusercontent.com/youruser/yourrepo/main/GTA_V.json"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <div className="checkbox-group">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={currentGame.featured}
                                        onChange={handleInputChange}
                                        className="checkbox"
                                        id="featured"
                                    />
                                    <label htmlFor="featured" className="form-label">Featured Game</label>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="checkbox-group">
                                    <input
                                        type="checkbox"
                                        name="inStock"
                                        checked={currentGame.inStock}
                                        onChange={handleInputChange}
                                        className="checkbox"
                                        id="inStock"
                                    />
                                    <label htmlFor="inStock" className="form-label">In Stock</label>
                                </div>
                            </div>
                            
                            <div className="form-actions form-group-full">
                                <button type="submit" className="btn btn-primary">
                                    {editingGame ? 'Update Game' : 'Add Game'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingGame(null);
                                        setNewGame({ 
                                            title: '', genre: '', price: '', releaseDate: '', imageUrl: '',
                                            description: '', developer: '', publisher: '', rating: '', platform: '',
                                            featured: false, inStock: true, stockCount: 100
                                        });
                                    }}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;