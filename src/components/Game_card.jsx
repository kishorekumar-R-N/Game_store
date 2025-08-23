import React from "react";
import "../search_filter.css";
import yarn_guardians from "../assets/yarn-guardians.png";

function Game_card({ title, genre, price, image, min_req }) {
    const g_card = (min_req?.graphics_card || "").split(" ");
    const user_os = 8;
    const user_prcs = 5;
    const user_ram = 8;
    const grps_card = "GTX 1650";
    const user_g_card = grps_card.split(" ");
    const disk = 50;

    const playable =
        min_req &&
        min_req.os_version <= user_os &&
        parseInt(min_req?.processor?.intel?.charAt(1)) <= user_prcs &&
        min_req.RAM <= user_ram &&
        (
            user_g_card[0].startsWith("RTX") ||
            (
                g_card.length > 1 &&
                user_g_card.length > 1 &&
                parseInt(g_card[1]) <= parseInt(user_g_card[1]) &&
                user_g_card[0].startsWith(g_card[0])
            )
        ) &&
        min_req.disk <= disk;
    return (
        <>
            <div className="cards">
                <img src={image || yarn_guardians} alt={title} />
                <div className="details">
                    <h5 className="genre">{genre}</h5>
                    <h4 className="title">{title}</h4>
                    <h5 className="price">${price}</h5>
                </div>
                <button className="btn-31">
                    <span className="text-container">
                        <span className="text">{playable ? "Playable" : "Not playable"}</span>
                    </span>
                </button>
            </div>
        </>
    );
}
export default Game_card;