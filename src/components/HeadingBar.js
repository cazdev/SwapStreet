import React from 'react';
import './headingBar.css'
import {
    Link,
    withRouter
} from "react-router-dom";

import logo from '../img/swap.png'

import {logout, isAuthenticated} from '../auth/index'

const HeadingBar = ({ history }) => {
    return (
    <div>
    {/*<header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        
        <h1><img src={logo} width="30" className=""/><span class="px-3">swap street</span></h1>
      </a>

      <ul class="nav nav-pills">
        <li class="nav-item"><Link to="/" class="nav-link active" aria-current="page">Home</Link></li>
        <li class="nav-item"><Link to="/" class="nav-link">About</Link></li>
        {isAuthenticated() ? (<><li class="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
        <li class="nav-item"><Link to="/" className="nav-link">Logout</Link></li></>) :
        (<li class="nav-item"> <Link to="/login" className="nav-link">Login/Sign Up</Link></li>)}
        
      </ul>
</header>*/}
<nav class="navbar navbar-expand-lg navbar-light rounded" aria-label="Eleventh navbar example">
      <div class="container-fluid">
        <Link to="/" className="navbar-brand"><h1><img src={logo} width="30" className=""/><span class="px-3">swap street</span></h1></Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample09">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><Link to="/" class="nav-link" aria-current="page">Home</Link></li>
        <li class="nav-item"><Link to="/" class="nav-link">About</Link></li>
        {isAuthenticated() ? (<><li class="nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
        <li class="nav-item"><Link to="/" className="nav-link">Logout</Link></li></>) :
        (<li class="nav-item"> <Link to="/login" className="nav-link">Login/Sign Up</Link></li>)}
          </ul>
        </div>
      </div>
    </nav>

    </div>
);
}

export default withRouter(HeadingBar);