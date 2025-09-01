import React from "react";
import "../homepage.css";
import {Link} from "react-router-dom";

function Search_div({ searchTerm, setSearchTerm }){
    return(
        <>
            <div className="search_div">
                <button className="discover-btn" onClick={() => {
                    document.getElementById('main_container').scrollIntoView({ behavior: 'smooth' });
                }}><h4>Discover</h4></button>
                <h4>Browser</h4>
                <h4>News</h4>
            </div>
        </>
    )
}
export default Search_div;