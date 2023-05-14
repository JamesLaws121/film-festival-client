import React from 'react';
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

const App = () => {
  return (
    <div className="App">
        <Router>
            <nav className="navbar navbar-expand-lg">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/films" className="nav-link">Films</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">Register</Link>
                    </li>

                    <div className="dropdown">
                        <li className="nav-item">
                            <Link to="/myfilms" className="nav-link">Manage your films</Link>
                        </li>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li className="nav-item"><Link to="/myfilms" className="nav-link">My Films</Link></li>
                            <li className="nav-item"><Link to="/editfilm" className="nav-link">Edit Film</Link></li>
                            <li className="nav-item"><Link to="/createfilm" className="nav-link">Create Film</Link></li>
                        </ul>
                    </div>
                </ul>
            </nav>
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
                <Route path="*" element={<Films/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
