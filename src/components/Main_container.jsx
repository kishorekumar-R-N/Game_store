import React, { useState } from "react";
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
  // Simple static data
  const games = [
{ title: "NFS Heat", genre: "Racing", price: 8, image: nfs_v, min_requirements: { os_version: 10, processor: { intel: "i5-3570", amd: "FX-6350" }, RAM: 8, graphics_card: "GTX 650", disk: 50 } },
{ title: "Preserve", genre: "Casual", price: 5, image: preserve, min_requirements: { os_version: 7, processor: { intel: "i3-2100", amd: "Athlon X4 750K" }, RAM: 4, graphics_card: "GT 430", disk: 10 } },
{ title: "Raven Quest", genre: "Casual", price: 12, image: ravenquest, min_requirements: { os_version: 8, processor: { intel: "i3-3220", amd: "FX-4100" }, RAM: 4, graphics_card: "GTX 460", disk: 15 } },
{ title: "Dawn of Ages", genre: "Action", price: 10, image: dap, min_requirements: { os_version: 10, processor: { intel: "i5-2400", amd: "FX-6300" }, RAM: 6, graphics_card: "GTX 660", disk: 40 } },
{ title: "Most Wanted", genre: "Adventure", price: 15, image: nfs, min_requirements: { os_version: 10, processor: { intel: "i5-2500K", amd: "FX-6350" }, RAM: 8, graphics_card: "GTX 750 Ti", disk: 35 } },
{ title: "NFS Payback", genre: "Action", price: 20, image: nfs_payback, min_requirements: { os_version: 10, processor: { intel: "i5-3470", amd: "FX-8350" }, RAM: 8, graphics_card: "GTX 760", disk: 50 } },
{ title: "Thronefall", genre: "Adventure", price: 8, image: thronefall, min_requirements: { os_version: 7, processor: { intel: "i3-2100", amd: "FX-4100" }, RAM: 4, graphics_card: "GTX 460", disk: 15 } },
{ title: "Biped", genre: "Adventure", price: 8, image: biped, min_requirements: { os_version: 7, processor: { intel: "i3-2100", amd: "Athlon X4 740" }, RAM: 4, graphics_card: "GTX 460", disk: 10 } },
{ title: "Transformers Racing", genre: "Racing", price: 8, image: transformers_racing, min_requirements: { os_version: 10, processor: { intel: "i5-2500", amd: "FX-6300" }, RAM: 6, graphics_card: "GTX 650", disk: 25 } },
{ title: "Titan Quest", genre: "Adventure", price: 8, image: titan_quest, min_requirements: { os_version: 7, processor: { intel: "i3-2100", amd: "Athlon II X3" }, RAM: 4, graphics_card: "GTX 460", disk: 20 } },
{ title: "NFL", genre: "Sports", price: 25, image: NFL, min_requirements: { os_version: 10, processor: { intel: "i5-4460", amd: "FX-8350" }, RAM: 8, graphics_card: "GTX 960", disk: 40 } },
{ title: "GTA5", genre: "Action", price: 45, image: GTA5, min_requirements: { os_version: 10, processor: { intel: "i5-3470", amd: "FX-8350" }, RAM: 8, graphics_card: "GTX 660", disk: 72 } },
{ title: "Madcar", genre: "Action", price: 20, image: madcar, min_requirements: { os_version: 10, processor: { intel: "i5-2500", amd: "FX-6300" }, RAM: 8, graphics_card: "GTX 750 Ti", disk: 30 } },
{ title: "F1", genre: "Racing", price: 40, image: F1, min_requirements: { os_version: 10, processor: { intel: "i5-9600K", amd: "Ryzen 5 3600" }, RAM: 16, graphics_card: "GTX 1060", disk: 80 } },
{ title: "While True Learn", genre: "Adventure", price: 7, image: while_true_learn, min_requirements: { os_version: 7, processor: { intel: "i3-2100", amd: "Athlon II X3" }, RAM: 4, graphics_card: "GT 430", disk: 5 } },
{ title: "Faaast Penguin", genre: "Simulation", price: 9, image: Faaast_penguin, min_requirements: { os_version: 7, processor: { intel: "i3-2100", amd: "FX-4100" }, RAM: 4, graphics_card: "GT 440", disk: 8 } },
{ title: "Rumble League", genre: "Racing", price: 12, image: Rumble_race, min_requirements: { os_version: 10, processor: { intel: "i5-2400", amd: "FX-6300" }, RAM: 6, graphics_card: "GTX 660", disk: 30 } },
{ title: "Rocket League", genre: "Simulation", price: 8, image: rocket_league, min_requirements: { os_version: 10, processor: { intel: "i5-2500", amd: "FX-6300" }, RAM: 4, graphics_card: "GTX 660", disk: 20 } }
  ];

  const [genre, setGenre] = useState("");
  const [priceSort, setPriceSort] = useState("");

  // Filter + sort (simple each render)
  const filteredGames =games;

  return (
    <div id="main_container">
      <Game_cards games={filteredGames} />
    </div>
  );
}
export default Main_container;