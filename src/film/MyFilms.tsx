import axios from "axios";
import React from "react";
import '../App.css';
import Films from "./Films";



const MyFilms = () => {
    return (
        <div>
            <h1>My Films</h1>
            <body>
            {Films()}
            </body>
        </div>
    )
}

export default MyFilms;