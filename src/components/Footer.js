//          AUTHORS - JOSHUA ARCHER, RUSHAN BARAL, KRITI CHAWLA, JOSHUA DODANDUWA, CHAZ LAMBRECHTSEN
//          Macquarie University Students\
import React from "react";
import {Link, BrowserRouter} from "react-router-dom";

const Footer = () => {

  return(
    <div className="footer">
      <p>
        <b>
          &copy; WeRware Pty Ltd 2020-2021&nbsp;&nbsp;
        </b>
        <i>
          SwapStreet is a software engineering team project in Comp4050 S2 2021, Macqurie University, Read our 
          <Link to="/tandc" > Terms and Conditions</Link>
        </i>
      </p>
    </div>
  );
}

export default Footer;