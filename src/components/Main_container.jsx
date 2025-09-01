import React, { useState, useEffect } from "react";
import api from '../api';
import "../search_filter.css";
import Game_cards from "./Game_cards";

import dap from "../assets/imgi_14_dawn-of-ages-1k2f9.jpg";
import nfs from "../assets/imgi_20_need-for-speed-most-wanted-1lnma.jpg";
import nfs_payback from "../assets/imgi_22_need-for-speed-payback-7dqwz.jpg";
import nfs_v from "../assets/need-for-speed-heat.jpg";
import preserve from "../assets/preserve.png";
import ravenquest from "../assets/ravenquest.png";
import thronefall from "../assets/thronefall.png"
import biped from "../assets/biped.jpg"
import titan_quest from "../assets/titan_quest.jpg"
import transformers_racing from "../assets/transformers_racing.jpg"
import NFL from "../assets/NFL.webp";
import GTA5 from "../assets/GTA5.jpg";
import madcar from "../assets/madcar.png";
import F1 from "../assets/F1.jpg";
import Faaast_penguin from "../assets/Faaast_penguin.png";
import while_true_learn from "../assets/while_true_learn.jpeg";
import Rumble_race from "../assets/Rumble_race.png";
import rocket_league from "../assets/rocket_league.jpeg";



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