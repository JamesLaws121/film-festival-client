import axios from "axios";
import React, {useEffect, useState} from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useSearchParams} from "react-router-dom";
import {forEach} from "react-bootstrap/ElementChildren";
import defaultImage from "../static/john-travolta.gif";

const ViewFilm = () => {
    const [searchParams] = useSearchParams();
    let id = searchParams.get("id");

    const [film, setFilm] = useState <IndividualFilm>();
    const [reviews, setReviews] = useState <Array<FilmReview>>([]);
    const [similarFilmsDirector, setSimilarFilmsDirector] = useState <Array<Film>>([]);
    const [similarFilmsGenre, setSimilarFilmsGenre] = useState <Array<Film>>([]);
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        GetFilm();
        GetReviews();
    }, [])

    useEffect(() => {
        getFilmsByGenre();
        getFilmsByDirector();
    }, [film])


    const GetFilm = () => {
        axios.get("https://seng365.csse.canterbury.ac.nz/api/v1/films/" + id)
            .then((response) => {
                setFilm(response.data);
                setErrorFlag(false);
                setErrorMessage("");
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    }

    const getFilmsByGenre = () => {
        if (film == null) {
            return
        }
        axios.get("https://seng365.csse.canterbury.ac.nz/api/v1/films?genreIds=" + film.genreId)
            .then((response) => {
                setSimilarFilmsGenre(response.data.films);
                setErrorFlag(false);
                setErrorMessage("");
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    }
    const getFilmsByDirector = () => {
        if (film == null) {
            return
        }
        axios.get("https://seng365.csse.canterbury.ac.nz/api/v1/films?directorId=" + film.directorId)
            .then((response) => {
                setSimilarFilmsDirector(response.data.films);
                setErrorFlag(false);
                setErrorMessage("");
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    }

    const similarList = () => {
        if (errorFlag) {
            return (
                <div>
                    <div style={{color: "red"}}>
                        {errorMessage}
                    </div>
                </div>
            ) } else {
            let similarFilms = similarFilmsDirector.concat(similarFilmsGenre);
            similarFilms = similarFilms.filter(value => value.filmId != film?.filmId)
            let idList = new Array();
            similarFilms = similarFilms.filter((elem, index, self) => {
                if (idList.includes(elem.filmId)) {
                    return false;
                } else {
                    idList.push(elem.filmId);
                    return true;
                }
            })
            return (similarFilms.map((value: Film) =>
                <div className="card col-2 film-card shadow" key={value.filmId}>
                    <img src={"https://seng365.csse.canterbury.ac.nz/api/v1/films/" + value.filmId + "/image"}
                         className="card-img-top" onError={(target) => target.currentTarget.src = defaultImage}></img>
                    <div className="card-body film-card-body">
                        <h5 className="card-title">{value.title}</h5>
                        <p className="card-text">{value.ageRating}</p>
                        <p className="card-text">Release: {value.releaseDate.toString().split('T')[0]}</p>
                        <p className="card-text">Director: {value.directorFirstName + " " + value.directorLastName}</p>
                        <p className="card-text">{parseFloat(value.rating)*10 + "%"}</p>
                    </div>
                    <a href={"/film?id=" + value.filmId} className="stretched-link"></a>
                </div>
                )
            )
        }
    }

    const GetReviews = () => {
        axios.get("https://seng365.csse.canterbury.ac.nz/api/v1/films/" + id +"/reviews")
            .then((response) => {
                setReviews(response.data);
                setErrorFlag(false);
                setErrorMessage("");
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    }
    const ReviewList = () => {
        if (errorFlag) {
            return (
                <div>
                    <div style={{color: "red"}}>
                        {errorMessage}
                    </div>
                </div>
            ) } else {
            return (reviews.map((value: FilmReview) =>
                    <div className="col-4 shadow card film-card" key={value.reviewerId}>
                        <div className={"row"}>
                            <div className={"col-6"}>
                                <img src={"https://seng365.csse.canterbury.ac.nz/api/v1/users/" + value.reviewerId + "/image"}
                                     className="card-img" onError={(target) => target.currentTarget.src = defaultImage}></img>
                            </div>
                            <div className="col-6 film-card-body">
                                <h5 className="card-title">{parseFloat(value.rating)*10 + "%"}</h5>
                                <p className="card-text">{value.reviewerFirstName + " " + value.reviewerLastName}</p>
                                <p className="card-text">{value.review}</p>
                            </div>
                        </div>

                    </div>
                )
            )
        }
    }
    if(errorFlag || film == null) {
        return (
            <div>
                <div style={{color: "red"}}>
                    {errorMessage}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className={"row"} style={{justifyContent: "center"}}>
                    <div className={"card film-card shadow col-6"} key={film.filmId}>
                        <img src={"https://seng365.csse.canterbury.ac.nz/api/v1/films/" + film.filmId + "/image"}
                             className="card-img-top" onError={(target) => target.currentTarget.src = defaultImage}></img>
                        <div className="card-body film-card-body">
                            <h5 className="card-title">{film.title}</h5>
                            <p className="card-text">{film.ageRating}</p>
                            <p className="card-text">{film.description}</p>
                            <p className="card-text">Release: {film.releaseDate.toString().split('T')[0]}</p>
                            <p className="card-text">Director: {film.directorFirstName + " " + film.directorLastName}</p>
                            <p className="card-text">{parseFloat(film.rating) * 10 + "% From " + film.numReviews + " reviews"}</p>
                        </div>
                        <a href={"/film?id=" + film.filmId} className="stretched-link"></a>
                    </div>
                </div>

                <div className={"row"} style={{justifyContent: "center"}}>
                    <h4>Reviews</h4>
                    {ReviewList()}
                </div>
                <div className={"row"} style={{justifyContent: "center"}}>
                    <h4>Similar films</h4>
                    {similarList()}
                </div>
            </div>

        )
    }
}


export default ViewFilm;