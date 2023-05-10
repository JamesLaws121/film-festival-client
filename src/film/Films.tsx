import axios from "axios";
import React from "react";
import FilmTable from "./FilmTable";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Films = () => {
    return (
        <div>
            <h1>Films</h1>
            <body>
                <div className="container">
                    <div className="input-group search-container form-control">
                        <input type="search" placeholder="search" id="searchInput"/>
                        <button className="search-button">
                            <i className="bi bi-search"></i>
                        </button>

                    </div>
                </div>
            </body>
            <div style={{display: "flex"}}>
                <FilmTable />
            </div>

        </div>
    )
}


export default Films;