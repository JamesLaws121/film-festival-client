import axios from "axios";
import React from "react";
import FilmTable from "../components/GetFilms";
import GetFilms from "../components/GetFilms";


const Films = () => {
    return (
        <div>
            <h1>Films</h1>
            <div className="searchBar">
                <input type="search" placeholder="search" id="searchInput"/>
                <button></button>
            </div>

            <GetFilms />
        </div>
    )
}


export default Films;