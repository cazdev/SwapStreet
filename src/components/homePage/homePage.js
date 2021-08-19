import React, { Component , useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import './homePage.css';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import '../../styles/custom.css'

import { allJobs } from '../../jobAPIRequests/index'

import mower from '../../img/lawn.jpeg'

const HomePage = () => {
  /*constructor(props) {
    super(props);

    this.state = {
      searchResults : this.props.jobs
    };

  }

  handleSelect (e) {
    this.setState({location : e})
  }

  searchData = e => {
    const queryResult = e.target.value;

    if(e === ""){
        this.state = {
          searchResults : this.props.jobs
        };
        return;
    }

    let data = []

    this.props.jobs.forEach(e => {
        if(e.description.toLowerCase().search(queryResult.toLowerCase()) !== -1 
        || e.title.toLowerCase().search(queryResult.toLowerCase()) !== -1
        || e.location.toLowerCase().search(queryResult.toLowerCase()) !== -1){
            data.push(e);
        }
    });

    this.setState({ searchQuery: e.target.value, searchResults: data })
  }
  
  handleSubmit = e => {
    e.preventDefault()
  }
  
  if(this.state.searchResults.length === 0){
    this.state = {
      searchResults : this.props.jobs
    };
  }*/

  /*let jobList = this.state.searchResults.map(job => {
    return (job.userID != this.props.userID && job.jobStatus !== 4 &&
      <Link className="job" to={{pathname: "/job", state: {job: job, prevLocation : "/"}}}>
      <div className="homeCard border-dark mb-3">
        <div className="homeCardBody text-dark">
            <h5 className="card-title">{job.title}</h5>
            <p className="card-text">{job.description}</p>
        </div>
        <div className="card-footer bg-transparent border-dark">
          <p className="homeJobLocation">Location: {job.location}</p>
          <p className="homeJobCost">Cost: {job.price}</p>
        </div>
      </div>
      </Link>
    );
  })*/

  const [jobList, setJobList] = useState([])

  useEffect(async () => {
    const jobs = await allJobs()
    setJobList(jobs)
  }, [])

    
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
            id="Search"
          />
        </form>
        </div>
        </div>
      </div>
    </div>
     <div className="row row-cols-1  row-cols-lg-3 row-cols-md-2 mb-3  ">
     {jobList.map(job => (
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
                <Link to="/job"><button type="button" className="btn btn-link">More details <i className="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                
                </div>
            </div>
          </div>
        </div>
        </div>))}
        
     
       </div>
      
       <p className="py-5">&nbsp;</p>
      </div>
      

    )
}

export default HomePage;