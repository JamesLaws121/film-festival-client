import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./Pages/Home";
import Films from "./Pages/Films";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav className="navbar">
            <ul className="nav-ul">
              <li className = "nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className = "nav-item">
                <Link to="/films" className="nav-link">Films</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/films" element={<Films/>}/>
            <Route path="*" element={<Home/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
