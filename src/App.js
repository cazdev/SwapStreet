import React from "react";
import DataRouter from "./components/dataRouter"
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import "bootstrap-icons/font/bootstrap-icons.css"

function App() {
    
    return(
        <div className="App container mt-0">
           <DataRouter/>
           <Footer/>
       </div>
    )
}

export default App;

