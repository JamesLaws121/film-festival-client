import axios from "axios";
import React, {useContext, useState} from "react";
import '../App.css';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userAuthenticity, setUserId] = useState <UserAuthentication>();

    const postLogin= () => {
        console.log("here")
        axios.post("https://seng365.csse.canterbury.ac.nz/api/v1/users/login", {
            email: email,
            password: password
        }).then((response) => {
            console.log(response);
            console.log(response.data);
            setUserId(response.data.userId);
            const data = JSON.stringify(response.data);
            console.log(data);
            sessionStorage.setItem('user', data);
        });
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
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
                <button type="submit" className="btn btn-primary" onClick={() => postLogin()}>Login</button>
            </form>
        </div>
    )
}

export default Login;