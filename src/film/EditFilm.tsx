import axios from "axios";
import React from "react";
import '../App.css';



const EditFilm = () => {
    return (
        <div>
            <h1>Edit Film</h1>
            <form>
                <section className="vh-100 gradient-custom">
                    <div className="card container py-5">
                        <div className="row g-2">
                            <div className="form-group col-md-6">
                                <label htmlFor="titleInput">Title</label>
                                <input type="text" className="form-control" id="titleInput" placeholder="Title"></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Description</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder="Description"></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="releaseInput">Release Date</label>
                                <input type="text" className="form-control" id="releaseInput" placeholder="Release Date"></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="runtimeInput">Release Date</label>
                                <input type="text" className="form-control" id="runtimeInput" placeholder="Runtime"></input>
                            </div>

                            <div className="form-group col-md-6">
                                <select className="" id="genreInput">
                                    <option selected>Genre</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <select className="" id="ageInput">
                                    <option selected>Age Rating</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="imageInput">Film image</label>
                                <input type="file" className="form-control-lg" id="imageInput"></input>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </section>
            </form>
        </div>
    )
}

export default EditFilm;