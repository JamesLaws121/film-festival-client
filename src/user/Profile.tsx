import axios from "axios";
import React, {useEffect, useState} from "react";
import '../App.css';
import {Link} from "react-router-dom";



const Profile = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        GetProfile();
    }, [])
    const GetProfile = () => {
        axios.get('https://seng365.csse.canterbury.ac.nz/api/v1/users/')
            .then((response) => {
                setEmail(response.data.email);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
            }, (error) => {
                console.log(error);
            })
    }

    return (
        <div className={"card"}>
            <h2 className="mb-2">User Name</h2>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                 alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2"></img>
            <h4 className="mb-2">{email}</h4>
            <p>{firstName}</p>
            <p>{lastName}</p>

            <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark">
                <Link to="/editProfile" className="nav-link">Edit profile</Link>
            </button>

        </div>
    )
}

export default Profile;