import React from "react";
import "../search_filter.css";
import Game_card from "./Game_card";

function Game_cards({ games }){
    return(
        <>
            <div className="Game_List">
                {games.length === 0 && <p>No games found.</p>}
                {games.map(g=>(
                    <Game_card
                      key={g.title}
                      title={g.title}
                      genre={g.genre}
                      price={g.price}
                      image={g.image}
                      min_req={g?.min_requirements}
                    />
                    
                ))}
            </div>
        </>
    )
}
export default Game_cards;