import React from 'react';
import './headingBar.css'
import {
    Link,
    withRouter
} from "react-router-dom";

import logo from '../img/swap.png'

import {logout, isAuthenticated} from '../auth/index'

const HeadingBar = ({ history }) => {
  //const {user} = isAuthenticated()
  const UserLogout = () => {
    logout()
    console.log("working")
    window.location.reload();
  }

  return (
    <div>
    {/*<header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        
        <h1><img src={logo} width="30" className=""/><span className="px-3">swap street</span></h1>
      </a>

      <ul className="nav nav-pills">
        <li className="nav-item"><Link to="/" className="nav-link active" aria-current="page">Home</Link></li>
        <li className="nav-item"><Link to="/" className="nav-link">About</Link></li>
        {isAuthenticated() ? (<><li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
        <li className="nav-item"><Link to="/" className="nav-link">Logout</Link></li></>) :
        (<li className="nav-item"> <Link to="/login" className="nav-link">Login/Sign Up</Link></li>)}
        
      </ul>
      </header>*/}

      <div className="navbar-container fixed-top">
        <nav className="navbar navbar-expand-lg navbar-light rounded bg-light" aria-label="Eleventh navbar example">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand"><h1><img src={logo} width="30" className=""/><span className="px-3">swap street</span></h1></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsExample09">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link to="/" className="nav-link" aria-current="page">Home</Link></li>
                <li className="nav-item"><Link to="/mailer" className="nav-link">Contact us</Link></li>
                <li className="nav-item"><Link to="/tandc" className="nav-link">T&C</Link></li>
                <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
                {isAuthenticated() ? (<><li className="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
                <li className="nav-item" onClick={UserLogout}><Link to="/" className="nav-link">Logout</Link></li></>) :
                (<li className="nav-item"> <Link to="/login" className="nav-link">Login/Sign Up</Link></li>)}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
);
}

export default withRouter(HeadingBar);