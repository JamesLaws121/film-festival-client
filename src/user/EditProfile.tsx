import axios from "axios";
import React, {useEffect, useState} from "react";
import '../App.css';
import {Link, useNavigate} from "react-router-dom";
import Authenticate from "../common/Authenticate";



const EditProfile = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication | null>();
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const authenticate = Authenticate()
        if (authenticate) {
            setUserAuthenticity(authenticate)
        } else {
            navigate('/films');
            window.location.reload();
        }
    }, [navigate]);

    useEffect(() => {
        GetProfile();
    }, [userAuthenticity, errorMessage])

    const checkError = () => {
        return errorFlag? "block" : "none";
    }

    const GetProfile = () => {
        if (!userAuthenticity) {
            return;
        }
        axios.get('http://localhost:4941/api/v1/users/' + userAuthenticity.userId, {
            headers: {
                'X-Authorization': userAuthenticity?.token,
            }
        }).then((response) => {
                setEmail(response.data.email);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
            setErrorFlag(false);
        }).catch((error) => {
            setErrorMessage(error.response.statusText);
            setErrorFlag(true);
        });
    }

    const patchUser = async (e: any) => {
        e.preventDefault();
        let data = {
            email: e.target.email.value,
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            password: null,
            currentPassword: null

        }
        if (e.target.newPassword.value !== "") {
            data = {
                email: e.target.email.value,
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                password: e.target.newPassword.value,
                currentPassword: e.target.currentPassword.value
            }
        }
        axios.patch("http://localhost:4941/api/v1/users/" + userAuthenticity?.userId, data,{
            headers: {
                'X-Authorization': userAuthenticity?.token,
            }
        }).then((response) => {

            if (e.target.profileImage.files[0]) {
                putProfileImage(e);
            } else {
                navigate('/profile');
                window.location.reload();
            }
            setErrorMessage("");
            setErrorFlag(false);
        }).catch((error) => {
            console.log(error)
            setErrorMessage(error.response.statusText);
            setErrorFlag(true);
        });
    }

    const putProfileImage = (e: any) => {
        e.preventDefault();
        let profileImage = e.target.profileImage.files[0]
        axios.put("http://localhost:4941/api/v1/users/" + userAuthenticity?.userId + "/image", profileImage ,{
            headers: {
                'X-Authorization': userAuthenticity?.token,
                'Content-Type': profileImage.type,
            }
        }).then((response) => {
            navigate('/profile?id=' + userAuthenticity?.userId);
            window.location.reload();
            setErrorMessage("");
            setErrorFlag(false);
        }).catch((error) => {
            console.log(error)
            setErrorMessage(error.response.statusText);
            setErrorFlag(true);
        });
    }

    return (
        <div className={"col"}>
            <button type="button" className="btn btn-outline-dark form-control" data-mdb-ripple-color="dark">
                <Link to="/profile" className="nav-link">Back</Link>
            </button>
            <h2 className="mb-2">Edit Profile</h2>
            <form onSubmit={patchUser}>

                <div className={"row mb-2"}>
                    <div className={"col-6"}>
                        <label>Profile picture</label>
                        <input className={"form-control"} type={"file"} name="profileImage"></input>
                    </div>
                </div>

                <div className={"row mb-2"}>
                    <div className={"col-6"}>
                        <label className="small mb-1">First name</label>
                        <input className={"form-control"} type={"text"} defaultValue={firstName} name="firstName"></input>
                    </div>
                    <div className={"col-6"}>
                        <label className="small mb-1">Last name</label>
                        <input className={"form-control"} type={"text"} defaultValue={lastName} name="lastName"></input>
                    </div>
                </div>

                <div className={"row mb-4"}>
                    <div className={"col-12"}>
                        <label className="small mb-1">Email</label>
                        <input className={"form-control"} type={"email"} defaultValue={email} name="email"></input>
                    </div>

                </div>

                <div className={"row mb-2"}>
                    <div className={"col-12"}>
                        <label className="small mb-1" htmlFor="currentPassword">Current Password</label>
                        <input className={"form-control"} type={"password"} id="currentPassword" name="currentPassword"></input>
                    </div>
                </div>

                <div className={"row mb-5"}>
                    <div className={"col-12"}>
                        <label className="small mb-1">New password</label>
                        <input className={"form-control"} type={"password"} name="newPassword"></input>
                    </div>
                </div>

                <div className={"row mb-5"}>
                    <div className={"col-12"}>
                        <div className="form-group invalid-feedback" style={{display: checkError()}}>
                            <label>{errorMessage.toString()}</label>
                        </div>
                    </div>
                </div>


                <div className={"row"}>
                    <div className={"col-12"}>
                        <button type="submit" className="btn btn-outline-dark form-control" data-mdb-ripple-color="dark">Save changes</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;