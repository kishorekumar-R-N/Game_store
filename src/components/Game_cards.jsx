
import React, { useEffect, useState } from "react";
import "../search_filter.css";
import Game_card from "./Game_card";

function Game_cards({ games }) {
    const [gameSpecs, setGameSpecs] = useState({});

    useEffect(() => {
        // Fetch systemSpecs for each game from its detailsJsonUrl
        async function fetchAllSpecs() {
            const specsMap = {};
            await Promise.all(
                games.map(async (g) => {
                    if (g.detailsJsonUrl) {
                        try {
                            const res = await fetch(g.detailsJsonUrl);
                            if (res.ok) {
                                const data = await res.json();
                                specsMap[g._id] = data.systemSpecs || null;
                            } else {
                                specsMap[g._id] = null;
                            }
                        } catch {
                            specsMap[g._id] = null;
                        }
                    } else {
                        specsMap[g._id] = null;
                    }
                })
            );
            setGameSpecs(specsMap);
        }
        if (games.length > 0) fetchAllSpecs();
    }, [games]);

    return (
        <>
            <div className="Game_List">
                {games.length === 0 && <p>No games found.</p>}
                {games.map((g) => (
                    <Game_card
                        key={g._id || g.title}
                        _id={g._id}
                        title={g.title}
                        genre={g.genre}
                        price={g.price}
                        image={g.image}
                        min_req={gameSpecs[g._id]}
                    />
                ))}
            </div>
        </>
    );
}

export default Game_cards;