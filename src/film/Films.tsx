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

            <div style={{display: "flex"}}>
                <FilmTable />
            </div>

        </div>
    )
}


export default Films;