import axios from "axios";
import React, {useEffect, useState} from "react";
import '../App.css';
import {Link} from "react-router-dom";
import defaultImage from "../static/john-travolta.gif";
import Authenticate from "../common/Authenticate";



const Profile = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication | null>();


    useEffect(() => {
        setUserAuthenticity(Authenticate());
    }, []);

    useEffect(() => {
        GetProfile();
    }, [userAuthenticity]);

    const GetProfile = () => {
        if (!userAuthenticity) {
            return
        }
        axios.get('http://localhost:4941/api/v1/users/' + userAuthenticity.userId ,
            {
                headers: {
                    'X-Authorization': userAuthenticity?.token,
                }
            }).then((response) => {
                setEmail(response.data.email);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
            }, (error) => {
                console.log(error);
            })
    }

    const profileCard = () => {
        if (!userAuthenticity) {
            return (
                <div>
                    <h1> ERROR, Not logged in</h1>
                </div>
            )
        } else {
            return (<div className={"card"}>
                <h2 className="mb-2">{firstName + " " + lastName}</h2>
                <img src={"http://localhost:4941/api/v1/users/" + userAuthenticity.userId + "/image"} alt={"error"}
                     className="card-img-top" onError={(target) => target.currentTarget.src = defaultImage}></img>

                <p>{email}</p>

                <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark">
                    <Link to="/editProfile" className="nav-link">Edit profile</Link>
                </button>

            </div>
            )
        }
    }

    return (
        <div>
            {profileCard()}
        </div>

    )
}

export default Profile;