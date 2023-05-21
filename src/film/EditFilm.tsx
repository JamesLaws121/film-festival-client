import axios from "axios";
import React, {useEffect, useState} from "react";
import '../App.css';
import CreateFilm from "./CreateFilm";
import {useNavigate, useSearchParams} from "react-router-dom";
import Authenticate from "../common/Authenticate";



const EditFilm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    let filmId = searchParams.get("id");
    const [filmGenres, setFilmGenres] = useState <Array<Genre>>([]);
    const [film, setFilm] = useState <IndividualFilm>();
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication | null>();

    useEffect(() => {
        if (Authenticate()) {
            setUserAuthenticity(Authenticate())
            GetFilmGenres();
        } else {
            navigate('/films');
            window.location.reload();
        }
    }, []);

    const checkError = () => {
        return errorMessage? "block" : "none";
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

    const patchEdit = async (e: any) => {
        e.preventDefault();
        console.log(userAuthenticity?.token)
        axios.post("http://localhost:4941/api/v1/films", {
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
            if (e.target.filmImage) {
                putFilmImage(e);
            } else {
                navigate('/film?id=' + response.data.filmId);
                window.location.reload();
            }

            setErrorMessage("");
        }).catch((error) => {
            setErrorMessage(error.response.statusText);
        });
    }

    const putFilmImage= async (e: any) => {
        e.preventDefault();
        console.log(userAuthenticity?.token)
        axios.put("http://localhost:4941/api/v1/films" + userAuthenticity?.userId + "/image", {
            file :e.target.filmImage.value,
        },{
            headers: {
                'X-Authorization': userAuthenticity?.token,
                'Content-Type': "image/jpeg",
            }
        }).then((response) => {
            console.log(response.data)
            navigate('/film?id=' + response.data.filmId);
            window.location.reload();
            setErrorMessage("");
        }).catch((error) => {
            setErrorMessage(error.response.statusText);
        });
    }

    return (
        <div>
            <h1>Create Film</h1>
            <form onSubmit={patchEdit}>
                <div className="card container py-5">
                    <div className="row g-2">
                        <div className="form-group col-md-6">
                            <label className="medium mb-1" htmlFor="titleInput">Title</label>
                            <input type="text" className="form-control" id="titleInput" placeholder="Title" name="title"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="medium mb-1" htmlFor="descriptionInput">Description</label>
                            <input type="text" className="form-control" id="descriptionInput" placeholder="Description" name="description"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="medium mb-1" htmlFor="releaseInput">Release Date</label>
                            <input type='datetime-local' id="releaseInput" className="form-control" name="releaseDate"/>
                        </div>

                        <div className="form-group col-md-6">
                            <label className="medium mb-1" htmlFor="runtimeInput">Runtime</label>
                            <input type="text" className="form-control" id="runtimeInput" placeholder="Runtime" name="runtime"></input>
                        </div>

                        <div className="form-group col-md-6">
                            <label className="medium mb-1" htmlFor="genreInput">Genre</label>
                            <select className="form-control select" id="genreInput" name="genreId">
                                {getGenreContent()}
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="medium mb-1" htmlFor="ageInput">Age Rating</label>
                            <select className="form-control select" id="ageInput" name="ageRating">
                                {getAgeRatingContent()}
                            </select>
                        </div>
                        <div className="form-group col-md-12 py-3">
                            <label htmlFor="imageInput">Film image</label>
                            <input type="file" className="form-control" id="imageInput" name="filmImage"></input>
                        </div>
                        <div className="form-group invalid-feedback" style={{display: checkError()}}>
                            <label>{errorMessage.toString()}</label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default EditFilm;