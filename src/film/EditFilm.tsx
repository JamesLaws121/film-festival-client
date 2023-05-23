import axios from "axios";
import React, {useEffect, useState} from "react";
import '../App.css';
import {useNavigate, useSearchParams} from "react-router-dom";
import Authenticate from "../common/Authenticate";



const EditFilm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [filmGenres, setFilmGenres] = useState <Array<Genre>>([]);
    const [film, setFilm] = useState <IndividualFilm>();
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication | null>();

    useEffect(() => {
        const tmpFilmId = searchParams.get("id");
        const authenticate = Authenticate()
        if (authenticate && tmpFilmId !== null) {
            setUserAuthenticity(authenticate);
            GetFilm(tmpFilmId);
            GetFilmGenres();
        } else {
            navigate('/films');
            window.location.reload();
        }
    }, [navigate, searchParams]);

    const checkError = () => {
        return errorFlag? "block" : "none";
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

    function getGenreContent() {
        return (filmGenres.map((genre) =>
                <option key={"genre"+genre.genreId}  value={genre.genreId}>{genre.name}</option>
            )
        )
    }

    function getAgeRatingContent() {
        return (["G", "PG", "M", "R13", "R16", "R18", "TBC"].map((rating) =>
                <option key={rating}  value={rating}>{rating}</option>
            )
        )
    }

    const GetFilm = (filmId: string) => {
        axios.get("http://localhost:4941/api/v1/films/" + filmId)
            .then((response) => {
                let film = response.data;
                film.filmId = parseInt(filmId);
                setFilm(film);

                setErrorFlag(false);
                setErrorMessage("");
            }, (error) => {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            })
    }

    const patchEdit = async (e: any) => {
        e.preventDefault();
        if (!film) {
            setErrorFlag(true);
            setErrorMessage("Error in film Id, please try again in a few minutes.")
            return
        }
        axios.patch("http://localhost:4941/api/v1/films/" + film.filmId, {
            title: e.target.title.value,
            description: e.target.description.value,
            releaseDate: e.target.releaseDate.value.replace('T', ' ') + ":00",
            genreId: parseInt(e.target.genreId.value),
            runtime: parseInt(e.target.runtime.value),
            ageRating: e.target.ageRating.value,
        },{
            headers: {
                'X-Authorization': userAuthenticity?.token,
            }
        }).then((response) => {
            if (e.target.filmImage.files[0]) {
                putFilmImage(e);
            } else {
                navigate('/film?id=' + film.filmId);
                window.location.reload();
            }
            setErrorMessage("");
            setErrorFlag(false);
        }).catch((error) => {
            setErrorMessage(error.response.statusText);
            setErrorFlag(true);
        });
    }

    const putFilmImage= async (e: any) => {
        if (!film) {
            setErrorFlag(true);
            setErrorMessage("Error in film Id, please try again in a few minutes.")
            return
        }
        e.preventDefault();
        let filmImage = e.target.filmImage.files[0]
        axios.put("http://localhost:4941/api/v1/films/" + film.filmId + "/image", filmImage ,{
            headers: {
                'X-Authorization': userAuthenticity?.token,
                'Content-Type': filmImage.type,
            }
        }).then((response) => {
            console.log(response.data)
            navigate('/film?id=' + film.filmId);
            window.location.reload();
            setErrorMessage("");
            setErrorFlag(false);
        }).catch((error) => {
            setErrorMessage(error.response.statusText);
            setErrorFlag(true);
        });
    }

    return (
        <div>
            <h1>Edit Film</h1>
            <form onSubmit={patchEdit}>
                <div className="card container py-5">
                    <div className="row g-2">
                        <div className="form-group col-md-6">
                            <label className="medium mb-1" htmlFor="titleInput">Title</label>
                            <input type="text" className="form-control" id="titleInput" defaultValue={film?.title} name="title"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="medium mb-1" htmlFor="descriptionInput">Description</label>
                            <input type="text" className="form-control" id="descriptionInput" defaultValue={film?.description} name="description"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="medium mb-1" htmlFor="releaseInput">Release Date</label>
                            <input type='datetime-local' id="releaseInput" className="form-control" name="releaseDate"  defaultValue={film?.releaseDate.slice(0, -5)}/>
                        </div>

                        <div className="form-group col-md-6">
                            <label className="medium mb-1" htmlFor="runtimeInput">Runtime</label>
                            <input type="text" className="form-control" id="runtimeInput" defaultValue={film?.runtime.toString()} name="runtime"></input>
                        </div>

                        <div className="form-group col-md-6">
                            <label className="medium mb-1" htmlFor="genreInput">Genre</label>
                            <select className="form-control select" id="genreInput" name="genreId" defaultValue={film?.genreId.toString()}>
                                {getGenreContent()}
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="medium mb-1" htmlFor="ageInput">Age Rating</label>
                            <select className="form-control select" id="ageInput" name="ageRating" defaultValue={film?.ageRating.toString()}>
                                {getAgeRatingContent()}
                            </select>
                        </div>
                        <div className="form-group col-md-3 py-3 edit-image-box">
                            <label htmlFor="imageInput"><h3>Film image</h3></label>
                            <input type="file" className="form-control" id="imageInput" name="filmImage"/>
                        </div>
                        <div className="form-group invalid-feedback" style={{display: checkError()}}>
                            <label>{errorMessage.toString()}</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditFilm;