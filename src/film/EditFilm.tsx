import axios from "axios";
import React from "react";
import '../App.css';



const EditFilm = () => {
    return (
        <div>
            <h1>Edit Film</h1>
            <form>
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
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default EditFilm;