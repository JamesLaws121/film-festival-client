import axios from "axios";
import React from "react";
import '../App.css';



const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <form>
            <div className="form-group">
                <label htmlFor={"emailInput"}>Email address</label>
                <input type="email" id ="emailInput" className={"form-control"}/>
            </div>
            <div className="form-group">
                <label htmlFor={"passwordInput"}>Password</label>
                <input type="password" id ="passwordInput" className={"form-control"}/>
            </div>
            <button type="submit" className="btn btn-primary">login</button>
            </form>
        </div>
    )
}

export default Login;