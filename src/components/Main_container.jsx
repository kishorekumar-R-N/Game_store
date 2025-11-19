import React, { useState, useEffect } from "react";
import api from '../api';
import "../search_filter.css";
import Game_cards from "./Game_cards";

function Main_container({ searchTerm }) {

  const [games, setGames] = useState([]);
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await api.get('/games');
        setGames(res.data.games || []);
      } catch (err) {
        setGames([]);
      }
    };
    fetchGames();
  }, []);

  const filteredGames = games;

  return (
    <div id="main_container">
      <Game_cards games={filteredGames} />
    </div>
  );
}
export default Main_container;