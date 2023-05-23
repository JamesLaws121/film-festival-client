import axios from "axios";
import React, {useEffect, useState} from "react";
import '../App.css';
import Authenticate from "../common/Authenticate";
import {useNavigate} from "react-router-dom";
import defaultImage from "../static/john-travolta.gif";



const MyFilms = () => {
    const navigate = useNavigate();
    const [films, setFilms] = useState <Array<Film>>([]);
    const [filmsReviewed, setFilmsReviewed] = useState <Array<Film>>([]);
    const [filmsDirected, setFilmsDirected] = useState <Array<Film>>([]);
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [filmGenres, setFilmGenres] = useState <Array<Genre>>([]);
    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication | null>();


    useEffect(() => {
        const authenticity = Authenticate();
        if (authenticity) {
            setUserAuthenticity(authenticity);
            GetFilmsDirected(authenticity.userId);
            GetFilmsReviewed(authenticity.userId);
            GetFilmGenres();
        } else {
            navigate('/films');
            window.location.reload();
        }
    }, [])

    useEffect(() => {
        createFilmsList();
    }, [filmsReviewed, filmsDirected])

    const GetFilmGenres = () => {
        axios.get('http://localhost:4941/api/v1/films/genres')
            .then((response) => {
                setErrorFlag(false);
                setErrorMessage("");
                setFilmGenres(response.data);
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    }

    const createFilmsList = () => {
        setFilms(filmsDirected.concat(filmsReviewed));
    }
    const GetFilmsDirected = (userId: number) => {
        axios.get("http://localhost:4941/api/v1/films?directorId=" + userId)
            .then((response) => {
                setErrorFlag(false);
                setErrorMessage("");
                setFilmsDirected(response.data.films);
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    }

    const GetFilmsReviewed = (userId: number) => {
        axios.get("http://localhost:4941/api/v1/films?reviewerId=" + userId)
            .then((response) => {
                setErrorFlag(false);
                setErrorMessage("");
                setFilmsReviewed(response.data.films);
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    }

    function FilmsList() {
        if (errorFlag) {
            return (
                <div>
                    <div style={{color: "red"}}>
                        {errorMessage}
                    </div>
                </div>
            ) }
        else if(films.length === 0){
            return <div>
                <label>You have not directed or reviewed any films</label>
            </div>}

        else{
            return films.map((value: Film) =>
                <div className="card col-2 film-card shadow" key={value.filmId}>
                    <img src={"http://localhost:4941/api/v1/films/" + value.filmId + "/image"} alt="Error"
                         className="card-img-top" onError={(target) => target.currentTarget.src = defaultImage}></img>
                    <div className="card-body film-card-body">
                        <h5 className="card-title">{value.title}</h5>
                        <p className="card-text">{"Rating: " + value.ageRating}</p>
                        <p className="card-text">{"Genre: " + filmGenres.find(element => element.genreId === value.genreId)?.name}</p>
                        <p className="card-text">Release: {value.releaseDate.toString().split('T')[0]}</p>
                        <h2 className="card-text">{parseFloat(value.rating)*10 + "%"}</h2>
                        <div className="director-values">
                            <img src={"http://localhost:4941/api/v1/users/" + value.directorId + "/image"} alt="Error"
                                 className="director-image" onError={(target) => target.currentTarget.src = defaultImage}></img>
                            <p className="card-text">Director: {value.directorFirstName + " " + value.directorLastName}</p>
                        </div>

                    </div>
                    <a href={"/film?id=" + value.filmId} className="stretched-link"> </a>
                </div>
            )
        }
    }

    return (
        <div style={{width: "100%"}}>
            <h2>My films</h2>

            <div className="row film-cards">
                {FilmsList()}
            </div>


        </div>
    )
}

export default MyFilms;