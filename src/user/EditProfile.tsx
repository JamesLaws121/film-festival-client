import axios from "axios";
import React from "react";
import '../App.css';
import {Link} from "react-router-dom";



const EditProfile = () => {
    return (
        <div className={"col"}>
            <button type="button" className="btn btn-outline-dark form-control" data-mdb-ripple-color="dark">
                <Link to="/profile" className="nav-link">Back</Link>
            </button>
            <h2 className="mb-2">Edit Profile</h2>
            <form>
                <div className={"row mb-2"}>
                    <label className="small mb-1">Profile picture</label>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                         style={{width: "150px"}} alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"></img>
                    <input className={"form-control"} type={"file"}></input>
                </div>


                <div className={"row mb-2"}>
                    <div className={"col-sm-6"}>
                        <label className="small mb-1">First name</label>
                        <input className={"form-control"} type={"text"} placeholder={"first name"}></input>
                    </div>
                    <div className={"col-sm-6"}>
                        <label className="small mb-1">Last name</label>
                        <input className={"form-control"} type={"text"} placeholder={"last name"}></input>
                    </div>
                </div>

                <div className={"row mb-2"}>
                    <label className="small mb-1">Email</label>
                    <input className={"form-control"} type={"email"} placeholder={"email address"}></input>
                </div>

                <div className={"row mb-2"}>
                    <label className="small mb-1">Password</label>
                    <input className={"form-control"} type={"password"}></input>
                    <label className="small mb-1">Confirm password</label>
                    <input className={"form-control"} type={"password"}></input>
                </div>

                <button type="submit" className="btn btn-outline-dark form-control" data-mdb-ripple-color="dark">
                    <Link to="/profile" className="nav-link">Save Changes</Link>
                </button>
            </form>
        </div>
    )
}

export default EditProfile;