import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route
  } from "react-router-dom"; 

import UserProfile from "./userProfile/userProfile";
import Header from "./HeadingBar";
import ChangeInfo from "./userProfile/changeInfo";
import HomePage from "./homePage/homePage"
import Dashboard from "./dashboard/dashboard"
import JobPage from "./jobPage/jobPage"
import About from './about/about';
import Mailer from './mailer/mailer';
import JobDataFill from "./dataFill/dataFillPage"
import Register from '../user/Register';
import Login from '../user/Login';
import PrivateRoute from '../auth/PrivateRoute'
import { isAuthenticated } from "../auth/index";
import JobDetails from '../pages/JobDetails';


class dataRouter extends Component {

    constructor(props) {
        super(props);
        if(isAuthenticated()){
            /*const {
                user: { _id, name, email, address, balance, about, role }
              } = isAuthenticated();*/
            this.state = {
              location: null,
              userID: "_id",
              name: "name",
              balance: "balance",
              jobs: []
            };
        } else {
            this.state = {
                location: null,
                userID: null,
                name: null,
                balance: null,
                jobs: []
              };
        }
        

    
    }

    /*componentDidMount(){
        this.updateJobs()
    }

    updateJobs(){
        fetch('http://localhost:3200/jobs?fetch=true')
            .then( resp => resp.json())
            .then((data)=> {
                this.setState({
                    jobs: data
                })
        })
    }


    handleSelect(e) {
        console.log(e);
        this.setState({location : e})
    }*/

    /* */

    render() {
        return (
            <BrowserRouter>
                <Header userID={this.state.userID} name={this.state.name} balance={this.state.balance}/>
                <div className="app"> 
                
                    <Switch>
                        <Route path="/changeinfo">
                            <ChangeInfo/>
                        </Route>

                        <Route path="/datafill">
                            <JobDataFill/>
                        </Route>

                        <Route path='/login' exact component={Login}/>
                        <Route path='/register' exact component={Register}/>
                        <Route path='/editprofile/:id' exact component={Register}/>
                        {/*<PrivateRoute component={UserProfile} path="/profile" exact />*/}


                        <Route path = "/providefavour"><JobDataFill path={"/providefavour"}/></Route>
                        <Route path = "/needfavour"><JobDataFill path={"/needfavour"}/></Route>
                        <Route path = "/editneedfavour/:id"><JobDataFill path={"/editneedfavour"}/></Route>
                        <Route path = "/editprovidefavour/:id"><JobDataFill path={"/editprovidefavour"}/></Route>

                        {/*<PrivateRoute component={Dashboard} path="/dashboard" jobs={this.state.jobs} userID={this.state.userID} exact />*/}
                        <Route exact path="/dashboard"><Dashboard/></Route>
                        <Route exact path="/profile/:id/:favtype/:swapid"><UserProfile/></Route>
                        <Route exact path="/about"><About/></Route>
                        <Route exact path="/mailer"><Mailer/></Route>
                        <Route path = "/job/:id"><JobDetails/></Route>
                        {/*<Route exact path = "/job" render={(props) => <JobPage {...props} userID={this.state.userID}/> }/>*/}

                        <Route path="/">
                            <HomePage /*jobs={this.state.jobs} userID={this.state.userID}*//>
                        </Route>
                    </Switch>

                    
                </div>
            </BrowserRouter>
        );
    }
}

export default dataRouter;