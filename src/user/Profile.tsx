import axios from "axios";
import React, {useEffect, useState} from "react";
import '../App.css';
import {Link} from "react-router-dom";
import defaultImage from "../static/john-travolta.gif";



const Profile = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication | null>();


    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("user");
        if (loggedInUser != null && loggedInUser.length != 0) {
            try {
                const foundUser = JSON.parse(loggedInUser);
                setUserAuthenticity(foundUser);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            setUserAuthenticity(null);
        }
    }, []);

    useEffect(() => {
        GetProfile();
    }, [userAuthenticity])

    const GetProfile = () => {
        console.log(userAuthenticity)
        if (userAuthenticity == null) {
            return;
        }
        axios.get('http://localhost:4941/api/v1/users/' + userAuthenticity.userId)
            .then((response) => {
                setEmail(response.data.email);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
            }, (error) => {
                console.log(error);
            })
    }

    if (userAuthenticity == null) {
        return (
            <div>
                <h1> ERROR, Not logged in</h1>
            </div>
        )
    } else {
        return (
            <div className={"card"}>
                <h2 className="mb-2">User Name</h2>
                <img src={"http://localhost:4941/api/v1/user/" + userAuthenticity.userId + "/image"}
                     className="card-img-top" onError={(target) => target.currentTarget.src = defaultImage}></img>

                <h4 className="mb-2">{email}</h4>
                <p>{firstName}</p>
                <p>{lastName}</p>

                <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark">
                    <Link to="/editProfile" className="nav-link">Edit profile</Link>
                </button>

            </div>
        )
    }

}

export default Profile;