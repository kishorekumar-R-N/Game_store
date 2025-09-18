import React, { useEffect, useState } from "react";
import "../search_filter.css";
import yarn_guardians from "../assets/yarn-guardians.png";
import { Link } from "react-router-dom";
import { fetchUserSpecs } from "../utils/userSpecs";

function Game_card({ _id, title, genre, price, image, min_req }) {
    const [userSpecs, setUserSpecs] = useState(null);
    const [playable, setPlayable] = useState(null);


    useEffect(() => {
        fetchUserSpecs().then(specs => {
            console.log("Fetched userSpecs:", specs);
            setUserSpecs(specs);
        });
    }, []);

    useEffect(() => {
        console.log("userSpecs for card:", userSpecs);
        console.log("min_req for card:", min_req);
        if (!userSpecs || !min_req) {
            setPlayable(null);
            return;
        }

        // Map and parse fields from min_req
        // RAM
        let minRam = 0;
        if (min_req.RAM) {
            minRam = parseInt(min_req.RAM);
        } else if (min_req.Memory) {
            // e.g., "12 GB RAM"
            const match = min_req.Memory.match(/(\d+)/);
            minRam = match ? parseInt(match[1]) : 0;
        }
        // Disk/Storage
        let minDisk = 0;
        if (min_req.disk) {
            minDisk = parseInt(min_req.disk);
        } else if (min_req.Storage) {
            // e.g., "70 GB SSD" or "72 GB available space"
            const match = min_req.Storage.match(/(\d+)/);
            minDisk = match ? parseInt(match[1]) : 0;
        }
        // Processor (just check if user has any processor string and it's not empty)
        let procOk = false;
        if (userSpecs.processor) {
            const userProc = userSpecs.processor.intel || userSpecs.processor.amd || "";
            const minProc = min_req.Processor || min_req.Processor || min_req.processor || "";
            // Simple substring check (not perfect, but better than nothing)
            if (userProc && minProc && userProc.toLowerCase().includes(minProc.split("/")[0].trim().toLowerCase().split(" ")[2])) {
                procOk = true;
            } else {
                procOk = true; // fallback: always true for now
            }
        }
        // RAM and Disk comparison
        const ramOk = parseInt(userSpecs.RAM) >= minRam;
        const userDisk = parseInt(userSpecs.disk || userSpecs.storage);
        const diskOk = userDisk >= minDisk;
        console.log("ramOk", ramOk, "diskOk", diskOk, "procOk", procOk);
        setPlayable(ramOk && diskOk && procOk);
    }, [userSpecs, min_req]);

    return (
        <>
            <Link to={_id ? `/game/${_id}` : "#"} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="cards">
                    <img src={image || yarn_guardians} alt={title} />
                    <div className="details">
                        <h5 className="genre">{genre}</h5>
                        <h4 className="title">{title}</h4>
                        <h5 className="price">${price}</h5>
                    </div>
                    <button className="btn-31">
                        <span className="text-container">
                            <span className="text">{playable === null ? "Checking..." : playable ? "Playable" : "Not playable"}</span>
                        </span>
                    </button>
                </div>
            </Link>
        </>
    );
}
export default Game_card;