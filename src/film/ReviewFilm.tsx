import axios from "axios";
import React, {useEffect, useState} from "react";
import '../App.css';
import {useNavigate, useSearchParams} from "react-router-dom";
import Authenticate from "../common/Authenticate";
import defaultImage from "../static/john-travolta.gif";


const ReviewFilm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [film, setFilm] = useState <IndividualFilm>();
    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication>();
    const [errorMessage, setErrorMessage] = useState("");
    const [errorFlag, setErrorFlag] = useState(false);

    const filmId = searchParams.get("id");

    useEffect(() => {

        let authenticity = Authenticate();
        if (authenticity && filmId) {
            setUserAuthenticity(authenticity);
            GetFilm();
        } else {
            navigate('/films');
            window.location.reload();
        }
    }, []);

    const checkError = () => {
        return errorMessage? "block" : "none";
    }
    const postReview = async (e: any) => {
        e.preventDefault();
        axios.post("http://localhost:4941/api/v1/films/" + filmId + "/reviews", {
            rating: parseInt(e.target.rating.value),
            review: e.target.review.value,

        }, {
            headers: {
                'X-Authorization': userAuthenticity?.token,
            }
        }).then((response) => {
            navigate('/film?id=' + filmId);
            window.location.reload();
            setErrorFlag(false);
        }).catch((error) => {
            setErrorMessage(error.response.statusText);
            setErrorFlag(true);
        });
    }
    const GetFilm = () => {
        axios.get("http://localhost:4941/api/v1/films/" + filmId)
            .then((response) => {
                setFilm(response.data);
                setErrorMessage("");
                setErrorFlag(false);
            }, (error) => {
                setErrorMessage(error.toString());
                setErrorFlag(true);
            })
    }

    if (film) {
        return (
            <div>
                <form onSubmit={postReview}>
                    <h1>Place review</h1>
                    <div className="row g-2" style={{justifyContent: "center"}}>
                        <div className="col-4 card">
                            <img src={"http://localhost:4941/api/v1/films/" + film.filmId + "/image"} alt={"Error"}
                                 className="card-img-top" onError={(target) => target.currentTarget.src = defaultImage}></img>
                            <div className="card-body film-card-body">
                                <h5 className="card-title">{film.title}</h5>
                                <p className="card-text">{film.ageRating}</p>
                                <p className="card-text">{film.description}</p>
                                <p className="card-text">Release: {film.releaseDate.toString().split('T')[0]}</p>
                                <p className="card-text">{parseFloat(film.rating) * 10 + "% From " + film.numReviews + " reviews"}</p>
                            </div>
                        </div>
                        <div className="col-4 card">
                            <div className="form-control mb-4">
                                <label className="medium mb-1" htmlFor="ratingInput">Rating</label>
                                <input type="text" className="form-control" id="titleInput" name="rating"></input>
                            </div>
                            <div className="form-control mb-5">
                                <label className="medium mb-1" htmlFor="reviewInput">Review</label>
                                <textarea rows={10} className="form-control" id="titleInput" name="review"
                                          placeholder="Maximum 150 characters"></textarea>
                            </div>
                            <div className="form-group invalid-feedback" style={{display: checkError()}}>
                                <label>{errorMessage.toString()}</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            <div className="form-group invalid-feedback" style={{display: checkError()}}>
                <label>{errorMessage.toString()}</label>
            </div>
        )
    }

}

export default ReviewFilm;