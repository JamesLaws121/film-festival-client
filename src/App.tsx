import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Films from "./film/Films";
import Profile from "./user/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Register from "./common/Register";
import Login from "./common/Login";
import EditFilm from "./film/EditFilm";
import CreateFilm from "./film/CreateFilm";
import MyFilms from "./film/MyFilms";
import ViewFilm from "./film/ViewFilm";
import EditProfile from "./user/EditProfile";
import Authenticate from "./common/Authenticate";
import ReviewFilm from "./film/ReviewFilm";
import axios from "axios/index";
import Logout from "./common/Logout";


const App = () => {
    const [userAuthenticity, setUserAuthenticity] = useState <UserAuthentication | null>();

    useEffect(() => {
        setUserAuthenticity(Authenticate())
    }, []);


    const logout = () => {
        if (userAuthenticity) {
            const loggedOut = Logout(userAuthenticity.token);
            setUserAuthenticity(null);
        }
    }
    const getNavBar = () => {
        if (userAuthenticity !== null) {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/films" className="nav-link">Films</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">Profile</Link>
                            </li>
                            <div className="dropdown">
                                <li className="nav-item">
                                    <Link to="/myFilms" className="nav-link">Manage your films</Link>
                                </li>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li className="nav-item"><Link to="/myFilms" className="nav-link">My Films</Link></li>
                                    <li className="nav-item"><Link to="/createfilm" className="nav-link">Create Film</Link></li>
                                </ul>
                            </div>
                            <li className="nav-item">
                                <Link to="/films" className="nav-link" onClick={() => logout()}>Logout</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        } else {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/films" className="nav-link">Films</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )
        }

    }

    return (
        <div className="App">
            <Router>
                {getNavBar()}
                <Routes>
                    <Route path="/film" element={<ViewFilm/>}/>
                    <Route path="/myfilms" element={<MyFilms/>}/>
                    <Route path="/editfilm" element={<EditFilm/>}/>
                    <Route path="/createfilm" element={<CreateFilm/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/editProfile" element={<EditProfile/>}/>
                    <Route path="/films" element={<Films/>}/>
                    <Route path="/reviewfilm" element={<ReviewFilm/>}/>
                    <Route path="*" element={<Films/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;