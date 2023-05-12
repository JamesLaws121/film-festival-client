import axios from "axios";
import React from "react";
import '../App.css';



const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <div className="form-group">
                    <label htmlFor={"firstNameInput"}>First Name</label>
                    <input id ="emailInput" className={"form-control"}/>
                </div>
                <div className="form-group">
                    <label htmlFor={"emailInput"}>Last Name</label>
                    <input id ="emailInput" className={"form-control"}/>
                </div>
                <div className="form-group">
                    <label htmlFor={"emailInput"}>Email address</label>
                    <input id ="emailInput" className={"form-control"}/>
                </div>
                <div className="form-group">
                    <label htmlFor={"passwordInput"}>Password</label>
                    <input id ="passwordInput" className={"form-control"}/>
                </div>
                <button type="submit" className="btn btn-primary">login</button>
            </form>
        </div>
    )
}

export default Register;