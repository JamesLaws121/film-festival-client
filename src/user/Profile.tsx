import axios from "axios";
import React from "react";
import '../App.css';
import {Link} from "react-router-dom";



const Profile = () => {
    return (
        <div className={"card"}>
            <h2 className="mb-2">User Name</h2>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                 alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"></img>
            <h4 className="mb-2">Email address</h4>

            <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark">
                <Link to="/editProfile" className="nav-link">Edit profile</Link>
            </button>

        </div>
    )
}

export default Profile;