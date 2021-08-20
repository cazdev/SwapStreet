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
import { allJobs, userJobs, deleteJob } from '../../jobAPIRequests/index'


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

  const deleteAnActiveJob = async (jobId) => {
    console.log(jobId)
    let submitted = await deleteJob(jobId).catch((error) => {
      console.log(error.response.data.error)
      alert(error.response.data.error);
    })
    console.log(submitted)
    const userJobs = submitted.filter(job => job.clientUserId === _id || job.providerUserId === _id) 
    console.log(userJobs)
    setUserJobList(userJobs)
  }

  return (
    <div>
      <div class="container">
        <div class="row">
          
          <div class="col-md">
            <h2>Hello {name} <Link to={`/editprofile/${_id}`}> <span className="edit-btn"><i className="bi bi-pencil-square">&nbsp;edit</i> </span></Link></h2>
            <p>email: {email}</p>
            <p>address: {address}</p>
            {about && <p>about: {about}</p>}
            <p>coins: {coins}</p>
            <Link to="/needfavour"><button type="button" class="btn btn-sm btn-primary mr-2">I need a favour</button></Link>
            <Link to="/providefavour"><button type="button" class="btn btn-sm btn-primary">I can provide a favour</button></Link>
          </div>
          <ul class="nav nav-tabs mt-5">
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

          <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 mb-3 hpage tab-cont" id="favoursrequested">
            {userJobList.filter(job => job.providerUserId === "" && job.status === 0).length > 0 ?
            (userJobList.filter(job => job.providerUserId === "" && job.status === 0).map(job => (
              <div key={job._id} className="col-md">
                <div className="card mb-4  shadow-sm">
                  <div className="card-header py-3">
                    <h4 className="my-0 ">{job.title}</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title txt-blue">{job.price} coins<small className="text-muted fw-light"></small></h1>
                    <ul className="mt-3 mb-4 card-body-scroll">
                      <li>{job.description}</li>
                    </ul>
                    <div className="row more">
                      <div className="col-sm-6">
                        <Link to={`/job/${job._id}`}><button type="button" className="btn btn-link">More details <i className="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                       </div>
                       <div className="col-sm-6 txt-right py-2 px-3">
                       <Link to={`/editneedfavour/${job._id}`}><i className="bi bi-pencil-square px-2"></i></Link>
                       <i className="bi bi-trash" onClick={(e) => deleteAnActiveJob(job._id)}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>))) : (
                <p className="no-data">No favours to display</p>
              )}
          </div>
          <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 mb-3 hpage nodisplaytab tab-cont" id="providedfavours">
            {userJobList.filter(job => job.clientUserId === "" && job.status === 0).length > 0 ?
            (userJobList.filter(job => job.clientUserId === "" && job.status === 0).map(job => (
              <div key={job._id} className="col-md">
                <div className="card mb-4  shadow-sm">
                  <div className="card-header py-3">
                    <h4 className="my-0 ">{job.title}</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title txt-blue">{job.price} coins<small className="text-muted fw-light"></small></h1>
                    <ul className="mt-3 mb-4 card-body-scroll">
                      <li>{job.description}</li>
                    </ul>
                    <div className="row more">
                      <div className="col-sm-6">
                        <Link to={`/job/${job._id}`}><button type="button" className="btn btn-link">More details <i className="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                       </div>
                       <div className="col-sm-6 txt-right py-2 px-3">
                       <Link to={`/editprovidefavour/${job._id}`}><i className="bi bi-pencil-square px-2"></i></Link>
                        <i className="bi bi-trash" onClick={(e) => deleteAnActiveJob(job._id)}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>))) : (
                <p className="no-data">No favours to display</p>
              )}
          </div>
          <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 mb-3 hpage nodisplaytab tab-cont" id="agreedfavours">
            {userJobList.filter(job => job.providerUserId !== "" && job.clientUserId !== "" && job.status === 2).length > 0 ?
            (userJobList.filter(job => job.providerUserId !== "" && job.clientUserId !== "" && job.status === 2).map(job => (
              <div key={job._id} className="col-md">
                <div className="card mb-4  shadow-sm">
                  <div className="card-header py-3">
                    <h4 className="my-0 ">{job.title}</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title txt-blue">{job.price} coins<small className="text-muted fw-light"></small></h1>
                    <ul className="mt-3 mb-4 card-body-scroll">
                      <li>{job.description}</li>
                    </ul>
                    <div className="row more">
                      <div className="col-sm-6">
                        <Link to={`/job/${job._id}`}><button type="button" className="btn btn-link">More details <i className="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                       </div>
                       <div className="col-sm-6 txt-right py-2 px-3">
                       <i class="bi bi-check2-square px-2"></i>
                       <i className="bi bi-trash"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>))) : (
                <p className="no-data">No favours to display</p>
              )}
          </div>
          <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 mb-3 hpage nodisplaytab tab-cont" id="closedfavours">
            {userJobList.filter(job => job.providerUserId !== "" && job.clientUserId !== "" && job.status === 5).length ? 
            (userJobList.filter(job => job.providerUserId !== "" && job.clientUserId !== "" && job.status === 5).map(job => (
              <div key={job._id} className="col-md">
                <div className="card mb-4  shadow-sm">
                  <div className="card-header py-3">
                    <h4 className="my-0 ">{job.title}</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title txt-blue">{job.price} coins<small className="text-muted fw-light"></small></h1>
                    <ul className="mt-3 mb-4 card-body-scroll">
                      <li>{job.description}</li>
                    </ul>
                    <div className="row more">
                      <div className="col">
                        <Link to={`/job/${job._id}`}><button type="button" className="btn btn-link">More details <i className="bi bi-arrow-right-circle icn-2x"></i></button></Link>

                      </div>
                    </div>
                  </div>
                </div>
              </div>))) : (
                <p className="no-data">No favours to display</p>
              )}
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
