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
    const navigate = useNavigate();

    const postRegister = () => {
        console.log("HERE");
        axios.post("https://seng365.csse.canterbury.ac.nz/api/v1/users/register", {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        }).then((response) => {
            console.log(response);
            setUserId(response.data.userId)
            navigate('/profile')
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
        console.log("here")
    }


    return (
        <div>
            <h1>Register</h1>
            <form>
                <div className="form-group">
                    <label htmlFor={"firstNameInput"}>First Name</label>
                    <input id ="emailInput" className={"form-control"}
                           onChange={(searchInput) => setFirstName(searchInput.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor={"emailInput"}>Last Name</label>
                    <input id ="emailInput" className={"form-control"}
                           onChange={(searchInput) => setLastName(searchInput.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor={"emailInput"}>Email address</label>
                    <input type="email" id ="emailInput" className={"form-control"}
                           onChange={(searchInput) => setEmail(searchInput.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor={"passwordInput"}>Password</label>
                    <input type="password" id ="passwordInput" className={"form-control"}
                           onChange={(searchInput) => setPassword(searchInput.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => postRegister()}>Register</button>
            </form>
        </div>
    )
}

export default Register;