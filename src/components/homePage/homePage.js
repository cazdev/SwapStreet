import React, { Component , useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import './homePage.css';

import '../../styles/custom.css'

import { allJobs } from '../../jobAPIRequests/index'
import { isAuthenticated } from "../../auth/index";
import mower from '../../img/lawn.jpeg'

const HomePage = () => {
  
  const user = isAuthenticated ? isAuthenticated().user : false;

  const [jobList, setJobList] = useState([])
  const [ogJobList, setOgJobList] = useState([])

  useEffect(async () => {
    const jobs = await allJobs()
    setJobList(jobs)
    setOgJobList(jobs)
  }, [])

  function search(qry) {
    console.log(qry)
    if (qry != "") {
      let records = ogJobList.filter(job => job.description.toLowerCase().search(qry.toLowerCase()) !== -1 
      || job.title.toLowerCase().search(qry.toLowerCase()) !== -1
      || job.location.toLowerCase().search(qry.toLowerCase()) !== -1
      || job.price.toString().toLowerCase().search(qry.toLowerCase()) !== -1)
      console.log(records)
      setJobList(records)
    } else {
      setJobList(ogJobList)
    }
  }

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
      <div className= "homePage">
        <div className="row row-cols-1  row-cols-lg-3 row-cols-md-2 mb-3  ">
        </div>
        <div className="row align-items-center g-5 py-5 hero-bg">
       
      <div className="col-md-9">
        <h1 className="lh-1 mb-3  ">Help is just a click away</h1>
        <p className="lead mb-4">Just a click away from getting the services you need. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius vel lacus id facilisis. Nunc vel sapien non lectus condimentum sollicitudin eget non dolor. Nam in porttitor risus. </p>
        <div className="row">
        <div className="col-md-7">
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search for services..." aria-label="Search"
            onChange={(e) => search(e.target.value)}
            id="Search"
          />
        </form>
        </div>
        </div>
      </div>
    </div>
    <ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link htab active" aria-current="page" href="#activefavours" onClick={(e) => toggleTabs(e)}>Active Favours</a>
  </li>
  <li class="nav-item">
    <a class="nav-link htab" href="#favoursrequested" onClick={(e) => toggleTabs(e)}>Favours Requested</a>
  </li>
</ul>

     <div className="row row-cols-1  row-cols-lg-3 row-cols-md-2 mb-3 hpage tab-cont" id="activefavours">
     {jobList.filter(job => job.status === 0 && job.providerUserId !== "" && job.clientUserId === "").length > 0 ? 
     (jobList.filter(job => job.status === 0 && job.providerUserId !== "" && job.clientUserId === "").map(job => (
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

       <div className="row row-cols-1  row-cols-lg-3 row-cols-md-2 mb-3 hpage nodisplaytab tab-cont" id="favoursrequested">
     {jobList.filter(job => job.status === 0 && job.providerUserId === "" && job.clientUserId !== "").length > 0 ? 
     (jobList.filter(job => job.status === 0 && job.providerUserId === "" && job.clientUserId !== "").map(job => (
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
      
       <p className="py-5">&nbsp;</p>
      </div>
      

    )
}

export default HomePage;