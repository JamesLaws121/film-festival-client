import axios from "axios";
import React, {useEffect, useState} from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useSearchParams} from "react-router-dom";
import defaultImage from "../static/john-travolta.gif";
import Authenticate from "../common/Authenticate";

const ViewFilm = () => {
    const [searchParams] = useSearchParams();
    const [film, setFilm] = useState <IndividualFilm>();
    const [reviews, setReviews] = useState <Array<FilmReview>>([]);
    const [similarFilmsDirector, setSimilarFilmsDirector] = useState <Array<Film>>([]);
    const [similarFilmsGenre, setSimilarFilmsGenre] = useState <Array<Film>>([]);
    const [filmGenres, setFilmGenres] = useState <Array<Genre>>([]);
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication | null>();


    useEffect(() => {
        let authenticity = Authenticate();
        setUserAuthenticity(authenticity);

        let filmId = searchParams.get("id");
        const GetFilm = () => {
            axios.get("http://localhost:4941/api/v1/films/" + filmId)
                .then((response) => {
                    setFilm(response.data);
                    setErrorFlag(false);
                    setErrorMessage("");
                }, (error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());
                })
        }
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
        const GetReviews = () => {
            axios.get("http://localhost:4941/api/v1/films/" + filmId +"/reviews")
                .then((response) => {
                    setReviews(response.data);
                    setErrorFlag(false);
                    setErrorMessage("");
                }, (error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());
                })
        }
        GetFilm();
        GetFilmGenres();
        GetReviews();
    }, [searchParams])


    useEffect(() => {
        getFilmsByGenre();
        getFilmsByDirector();
    }, [film])



    const getFilmsByGenre = () => {
        if (film == null) {
            return
        }
        axios.get("http://localhost:4941/api/v1/films?genreIds=" + film.genreId)
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
        axios.get("http://localhost:4941/api/v1/films?directorId=" + film.directorId)
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
            similarFilms = similarFilms.filter(value => value.filmId !== film?.filmId)
            let idList = new Array<number>();
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
                        <img src={"http://localhost:4941/api/v1/films/" + value.filmId + "/image"} alt={"Error"}
                             className="card-img-top" onError={(target) => target.currentTarget.src = defaultImage}></img>
                        <div className="card-body film-card-body">
                            <h5 className="card-title">{value.title}</h5>
                            <p className="card-text">{"Rating: " + value.ageRating}</p>
                            <p className="card-text">{"Genre: " + filmGenres.find(element => element.genreId === value.genreId)?.name}</p>
                            <p className="card-text">Release: {value.releaseDate.toString().split('T')[0]}</p>
                            <h2 className="card-text">{parseFloat(value.rating)*10 + "%"}</h2>
                            <div className="director-values">
                                <img src={"http://localhost:4941/api/v1/users/" + value.directorId + "/image"} alt={"Error"}
                                     className="director-image" onError={(target) => target.currentTarget.src = defaultImage}></img>
                                <p className="card-text">Director: {value.directorFirstName + " " + value.directorLastName}</p>
                            </div>
                        </div>
                        <a href={"/film?id=" + value.filmId} className="stretched-link"> </a>
                    </div>
                )
            )
        }
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
                                <img src={"http://localhost:4941/api/v1/users/" + value.reviewerId + "/image"} alt={"Error"}
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
    const editOption = () => {
        if (userAuthenticity && film && userAuthenticity.userId === film.directorId) {
            return (<a className="btn btn-primary" role="button" href={"/editFilm?id=" + film.filmId}>Edit</a>)
        } else {
            return (
                <div></div>
            )
        }
    }
    const reviewOption = () => {
        if (!userAuthenticity) {
            return (<div><label>Login to place a review</label></div>)
        }
        else {
            if (film && userAuthenticity.userId !== film.directorId) {
                return (<a className="btn btn-primary" role="button" href={"/reviewfilm?id=" + film.filmId}>Place review</a>)
            } else {
                return (<div><label>You can't review your own film.</label></div>)
            }
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
                    <div className={"card film-card shadow col-4"} key={film.filmId}>
                        <img src={"http://localhost:4941/api/v1/films/" + film.filmId + "/image"} alt={"Error"}
                             className="card-img-top" onError={(target) => target.currentTarget.src = defaultImage}></img>
                        <div className="card-body film-card-body">
                            <h5 className="card-title">{film.title}</h5>
                            <p className="card-text">{film.ageRating}</p>
                            <p className="card-text">{film.description}</p>
                            <p className="card-text">Release: {film.releaseDate.toString().split('T')[0]}</p>
                            <p className="card-text">{parseFloat(film.rating) * 10 + "% From " + film.numReviews + " reviews"}</p>
                        </div>
                        {editOption()}
                        {reviewOption()}
                    </div>


                    <h4>Director</h4>
                    <div className={"row"} style={{justifyContent: "center"}}>
                    <div className="col-4 shadow card film-card">
                        <div className={"row"}>
                            <div className={"col-6"}>
                                <img src={"http://localhost:4941/api/v1/users/" + film.directorId + "/image"} alt={"Error"}
                                     className="card-img" onError={(target) => target.currentTarget.src = defaultImage}></img>
                            </div>
                            <div className="col-6 film-card-body">
                                <h2 className="card-text">{film.directorFirstName + " " + film.directorLastName}</h2>
                            </div>
                        </div>
                    </div>
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