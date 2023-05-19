import axios from "axios";
import React, {useState} from "react";
import '../App.css';
import {useNavigate} from "react-router-dom";



const Register = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication>();
    const navigate = useNavigate();

    const checkError = () => {
        return errorMessage? "block" : "none";
    }

    const postRegister = async (e: any) => {
        e.preventDefault();
        axios.post("https://seng365.csse.canterbury.ac.nz/api/v1/users/register", {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        }).then((response) => {
            setUserAuthenticity(response.data.userId);
            const data = JSON.stringify(response.data);
            sessionStorage.setItem('user', data);
            navigate('/profile');
            setErrorMessage("");
            window.location.reload();
        }).catch((error) => {
            setErrorMessage(error);
        });
    }


    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={postRegister}>
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
                    <input type="password" id ="passwordInput" className={"form-control"}
                           onChange={(searchInput) => setPassword(searchInput.target.value)}/>
                </div>
                <div className="form-group invalid-feedback" style={{display: checkError()}}>
                    <label>Incorrect Email and password</label>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}

export default Register;