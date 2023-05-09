import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Films from "./film/Films";
import Users from "./user/Users";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
                        <Link to="/users" className="nav-link">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/films" element={<Films/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="*" element={<Films/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
