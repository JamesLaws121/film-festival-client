import axios from "axios";
import React, {useEffect, useState} from "react";
import '../App.css';
import {useNavigate} from "react-router-dom";
import Authenticate from "./Authenticate";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication>();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [errorFlag, setErrorFlag] = useState(false);

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
            navigate('/profile');
            setErrorMessage("");
            setErrorFlag(false);
            window.location.reload();
        }).catch((error) => {
            setErrorMessage(error.response.statusText);
            setErrorFlag(true);
        });
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={postLogin}>
                <div className="form-group">
                    <label htmlFor={"loginEmailInput"}>Email address</label>
                    <input type="email" id ="loginEmailInput" className={"form-control"}
                           onChange={(searchInput) => setEmail(searchInput.target.value)} required/>
                </div>
                <div className="form-group">
                    <label htmlFor={"loginPasswordInput"}>Password</label>
                    <input type="password" id ="loginPasswordInput" className={"form-control"}
                           onChange={(searchInput) => setPassword(searchInput.target.value)} required/>
                </div>
                <div className="form-group invalid-feedback" style={{display: checkError()}}>
                    <label>{errorMessage.toString()}</label>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login;