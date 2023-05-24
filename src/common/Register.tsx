import axios from "axios";
import React, {useEffect, useState} from "react";
import '../App.css';
import {useNavigate} from "react-router-dom";
import Authenticate from "./Authenticate";



const Register = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication>();
    const navigate = useNavigate();
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordFlag, setPasswordFlag] = useState(true);

    useEffect(() => {
        const authenticate = Authenticate()
        console.log(authenticate)
        if (authenticate) {
            setUserAuthenticity(authenticate)
            navigate('/films');
            window.location.reload();
        }
    }, []);

    const checkError = () => {
        return errorFlag? "block" : "none";
    }
    const postLogin = async (e: any) => {
        e.preventDefault();
        axios.post("http://localhost:4941/api/v1/users/login", {
            email: email,
            password: password
        }).then((response) => {
            setUserAuthenticity(response.data);
            const data = JSON.stringify(response.data);
            sessionStorage.setItem('user', data);
            if (e.target.profileImage.files[0]) {
                putProfileImage(e, response.data.userId, response.data.token);
            } else {
                navigate('/profile');
                window.location.reload();
            }
            setErrorMessage("");
            setErrorFlag(false);
        }).catch((error) => {
            setErrorMessage(error.response.statusText);
            setErrorFlag(true);
        });
    }

    const putProfileImage = (e: any, userId: number, token: string) => {
        e.preventDefault();
        let profileImage = e.target.profileImage.files[0]
        axios.put("http://localhost:4941/api/v1/users/" + userId + "/image", profileImage ,{
            headers: {
                'X-Authorization': token,
                'Content-Type': profileImage.type,
            }
        }).then((response) => {
            navigate('/profile?id=' + userId);
            window.location.reload();
            setErrorMessage("");
            setErrorFlag(false);
        }).catch((error) => {
            console.log(error)
            setErrorMessage(error.response.statusText);
            setErrorFlag(true);
        });
    }

    const postRegister = async (e: any) => {
        e.preventDefault();
        axios.post("http://localhost:4941/api/v1/users/register", {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        }).then((response) => {
            postLogin(e);
            setErrorFlag(false);
        }).catch((error) => {
            setErrorMessage(error.response.statusText);
            setErrorFlag(true);
        });
    }

    const togglePassword = () => {
        setPasswordFlag(!passwordFlag);
    }

    const getPasswordToggle = () => {
        return passwordFlag? "password" as const: "text" as const;
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={postRegister} className="register-form">
                <div className="form-group">
                    <label htmlFor={"firstNameInput"}>First Name</label>
                    <input id ="emailInput" className={"form-control"}
                           onChange={(searchInput) => setFirstName(searchInput.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor={"lastName"}>Last Name</label>
                    <input id ="lastName" className={"form-control"}
                           onChange={(searchInput) => setLastName(searchInput.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor={"registerEmailInput"}>Email address</label>
                    <input type="email" id ="registerEmailInput" className={"form-control"}
                           onChange={(searchInput) => setEmail(searchInput.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor={"passwordInput"}>Password</label>
                    <div style={{display: "flex"}}>
                        <input type={""+getPasswordToggle()} id ="passwordInput" className={"form-control"}
                               onChange={(searchInput) => setPassword(searchInput.target.value)}/>
                        <a className="button" role="button" onClick={togglePassword}>
                            <i className="bi bi-eye iconSize"></i>
                        </a>
                    </div>

                </div>
                <div className="form-group invalid-feedback" style={{display: checkError()}}>
                    <label>{errorMessage.toString()}</label>
                </div>
                <div className="form-group">
                    <label>Profile picture</label>
                    <input className={"form-control"} type={"file"} name="profileImage"></input>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-outline-dark form-control" data-mdb-ripple-color="dark">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;