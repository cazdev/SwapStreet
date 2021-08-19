import React, { Component, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './dashboard.css';

import ActiveListings from './activeListings';
import CurrentJobs from './currentJobs';
import History from './history';
import Info from './info';
//import Datafill from '../dataFill/dataFillPage';
import { isAuthenticated } from "../../auth/index";
import { allJobs, userJobs } from '../../jobAPIRequests/index'


const Dashboard = () => {
    /*constructor(props) {
        super(props);
    }

    

    render() {
        // Get user info if authenticated
        const {
            user: { _id, name, email, address, about, coins }
        } = isAuthenticated();
        

        var uID = this.props.userID

        var myJobs = this.props.jobs
        myJobs = this.props.jobs.filter(function (job) {
           return job.chosenUserID === uID && job.jobStatus !== 4;
        });

        var activeJobs = this.props.jobs
        activeJobs = this.props.jobs.filter(function (job) {
            return job.userID === uID && job.jobStatus !== 4;
        });

        var pastJobs = this.props.jobs
        pastJobs = this.props.jobs.filter(function (job) {
            return (job.userID === uID || job.chosenUserID === uID) && job.jobStatus === 4;
        });*/

    const { user: { _id, name, email, address, about, coins } } = isAuthenticated();
    const [userJobList, setUserJobList] = useState([])

    useEffect(async () => {
        const jobs = await userJobs(_id)
        setUserJobList(jobs)
    }, [])
    console.log(userJobList)

    const toggleTabs = (event) => {
        let newActiveID = event.target.href
        let tabArray = document.getElementsByClassName('htab')
        let tabPageArray = document.getElementsByClassName('hpage')
        for (let i = 0; i < tabArray.length; i++) {
          if (tabArray[i].href === newActiveID) {
              tabArray[i].classList.add("active")
              tabPageArray[i].classList.remove("nodisplaytab")
          } else {
            tabArray[i].classList.remove("active")
            tabPageArray[i].classList.add("nodisplaytab")
          }
        }
    }

    return (
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-sm-2">

                    </div>
                    <div class="col-lg">
                        <h1>Hello {name}</h1>
                        <p>email: {email}</p>
                        <p>address: {address}</p>
                        {about && <p>about: {about}</p>}
                        <p>coins: {coins}</p>
                        <Link to="/needfavour"><button type="button" class="btn btn-success">I need a favour</button></Link>
                        <Link to="/providefavour"><button type="button" class="btn btn-success">I can provide a favour</button></Link>
                    </div>
                    <ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link htab active" aria-current="page" href="#favoursrequested" onClick={(e) => toggleTabs(e)}>Favours Requested</a>
  </li>
  <li class="nav-item">
    <a class="nav-link htab" href="#providedfavours" onClick={(e) => toggleTabs(e)}>Provided Favours</a>
  </li>
  <li class="nav-item">
    <a class="nav-link htab" href="#agreedfavours" onClick={(e) => toggleTabs(e)}>Agreed Favours</a>
  </li>
  <li class="nav-item">
    <a class="nav-link htab" href="#closedfavours" onClick={(e) => toggleTabs(e)}>Closed Favours</a>
  </li>
</ul>

    <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 mb-3 hpage" id="favoursrequested">                
     {userJobList.filter(job => job.providerUserId === "").map(job => (
     <div key={job._id} className="col-md">
        <div className="card mb-4  shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 ">{job.title}</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title txt-blue">{job.price} coins<small className="text-muted fw-light"></small></h1>
            <ul className="mt-3 mb-4">
              <li>{job.description}</li>
            </ul>
            <div className="row">
                <div className="col">
                <Link to={`/job/${job._id}`}><button type="button" className="btn btn-link">More details <i className="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                
                </div>
            </div>
          </div>
        </div>
        </div>))}
       </div>
       <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 mb-3 hpage nodisplaytab" id="providedfavours">                
     {userJobList.filter(job => job.clientUserId === "").map(job => (
     <div key={job._id} className="col-md">
        <div className="card mb-4  shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 ">{job.title}</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title txt-blue">{job.price} coins<small className="text-muted fw-light"></small></h1>
            <ul className="mt-3 mb-4">
              <li>{job.description}</li>
            </ul>
            <div className="row">
                <div className="col">
                <Link to={`/job/${job._id}`}><button type="button" className="btn btn-link">More details <i className="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                
                </div>
            </div>
          </div>
        </div>
        </div>))}
       </div>
       <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 mb-3 hpage nodisplaytab" id="agreedfavours">                
     {userJobList.filter(job => job.providerUserId !== "" && job.clientUserId && job.active).map(job => (
     <div key={job._id} className="col-md">
        <div className="card mb-4  shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 ">{job.title}</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title txt-blue">{job.price} coins<small className="text-muted fw-light"></small></h1>
            <ul className="mt-3 mb-4">
              <li>{job.description}</li>
            </ul>
            <div className="row">
                <div className="col">
                <Link to={`/job/${job._id}`}><button type="button" className="btn btn-link">More details <i className="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                
                </div>
            </div>
          </div>
        </div>
        </div>))}
       </div>
       <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 mb-3 hpage nodisplaytab" id="closedfavours">                
     {userJobList.filter(job => job.providerUserId !== "" && job.clientUserId && !job.active).map(job => (
     <div key={job._id} className="col-md">
        <div className="card mb-4  shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 ">{job.title}</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title txt-blue">{job.price} coins<small className="text-muted fw-light"></small></h1>
            <ul className="mt-3 mb-4">
              <li>{job.description}</li>
            </ul>
            <div className="row">
                <div className="col">
                <Link to={`/job/${job._id}`}><button type="button" className="btn btn-link">More details <i className="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                
                </div>
            </div>
          </div>
        </div>
        </div>))}
       </div>
                    <div class="col-">

                    </div>
                </div>
            </div>
        </div>
    );
}

/*<Link to={{pathname: "/add", state: {prevLocation : "/dashboard"}}}><button className="btn btn-success btn-lg active">Create A New Job</button></Link>
                            <Info uID = {this.props.userID}/>
                            <CurrentJobs jobs={myJobs} userID={this.props.userID}/>
                            <ActiveListings jobs={activeJobs} userID={this.props.userID}/>
        <History jobs={pastJobs} userID={this.props.userID}/>*/

export default Dashboard;
