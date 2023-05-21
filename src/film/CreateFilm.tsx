import axios from "axios";
import React, {useState} from "react";
import '../App.css';
import {useNavigate} from "react-router-dom";



const CreateFilm = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [genreId, setGenreId] = useState("");
    const [runtime, setRuntime] = useState("");
    const [ageRating, setAgeRating] = useState("");


    const checkError = () => {
        return errorMessage? "block" : "none";
    }
    const postCreate= async (e: any) => {
        e.preventDefault();
        axios.post("http://localhost:4941/api/v1/films", {
            title: e.title,
            description: e.description,
            releaseDate: e.releaseDate,
            genreId: e.genreId,
            runtime: e.runtime,
            ageRating: e.ageRating
        }).then((response) => {
            setUserAuthenticity(response.data.userId);
            const data = JSON.stringify(response.data);
            sessionStorage.setItem('user', data);
            navigate('/profile');
            window.location.reload();
            setErrorMessage("");
        }).catch((error) => {
            setErrorMessage(error.response.statusText);
        });
    }

    return (
        <div>
            <h1>Create Film</h1>
            <form onSubmit={postCreate}>
                <div className="card container py-5">
                <div className="row g-2">
                    <div className="form-group col-md-6">
                        <label className="medium mb-1" htmlFor="titleInput">Title</label>
                        <input type="text" className="form-control" id="titleInput" placeholder="Title"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="medium mb-1" htmlFor="descriptionInput">Description</label>
                        <input type="text" className="form-control" id="descriptionInput" placeholder="Description"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="medium mb-1" htmlFor="releaseInput">Release Date</label>
                        <input type="text" className="form-control" id="releaseInput" placeholder="Release Date"></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="medium mb-1" htmlFor="runtimeInput">Release Date</label>
                        <input type="text" className="form-control" id="runtimeInput" placeholder="Runtime"></input>
                    </div>

                    <div className="form-group col-md-6">
                        <label className="medium mb-1" htmlFor="genreInput">Genre</label>
                        <select className="form-control" id="genreInput">
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="medium mb-1" htmlFor="ageInput">Age Rating</label>
                        <select className="form-control" id="ageInput">
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div className="form-group col-md-12 py-3">
                        <label htmlFor="imageInput">Film image</label>
                        <input type="file" className="form-control" id="imageInput"></input>
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

export default CreateFilm;