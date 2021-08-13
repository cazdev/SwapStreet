import React, { Component , useState} from '../../../node_modules/react';
import {Link} from "react-router-dom";
import './homePage.css';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import '../../styles/custom.css'

import mower from '../../img/lawn.jpeg'

class HomePage extends Component {
  constructor(props) {
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
  
  render() {
    if(this.state.searchResults.length === 0){
      this.state = {
        searchResults : this.props.jobs
      };
    }
 
    let jobList = this.state.searchResults.map(job => {
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
    })
    
    return (
      <div className= "homePage">
        <div class="row row-cols-1  row-cols-lg-3 row-cols-md-2 mb-3  ">
        </div>
        <div class="row align-items-center g-5 py-5 hero-bg">
       
      <div class="col-md-9">
        <h1 class="lh-1 mb-3  ">Help is just a click away</h1>
        <p class="lead mb-4">Just a click away from getting the services you need. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius vel lacus id facilisis. Nunc vel sapien non lectus condimentum sollicitudin eget non dolor. Nam in porttitor risus. </p>
        <div class="row">
        <div class="col-md-7">
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search for services..." aria-label="Search"
            id="Search"
            onChange={this.searchData}
          />
        </form>
        </div>
        </div>
      </div>
    </div>
     <div class="row row-cols-1  row-cols-lg-3 row-cols-md-2 mb-3  ">
      <div class="col-md">
        <div class="card mb-4  shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 ">Plumbing and Electrical</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title txt-blue">50 coins<small class="text-muted fw-light"></small></h1>
            <ul class="mt-3 mb-4">
              <li>Blocked Drains</li>
              <li>Tap and Toilet Repair</li>
              <li>Fixed Upfront no Surprise</li>
              <li>Help center access</li>
            </ul>

            
            <p>This business servicing Canberra is a local SME in the Plumbers & Gas Fitters category. </p>
            <div class="row">
                <div class="col">
                <Link to="/job"><button type="button" class="btn btn-link">More details <i class="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                
                </div>
            </div>
          </div>
        </div>
        </div>
        <div class="col-md">
       <div class="card mb-4  shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 ">Lawn Mowing</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title txt-blue">10 coins<small class="text-muted fw-light"></small></h1>
            <ul class="mt-3 mb-4">
              <li>Mowing Lawn</li>
              <li>Weeding</li>
              <li>Will trim hedges if you are nice</li>
              <li>No dogs</li>
            </ul>

            
            <p>This business helps keep your backyard looking sharp. Contact us today or you'll have a messy lawn! </p>
            <div class="row">
                <div class="col">
                <Link to="/job"><button type="button" class="btn btn-link">More details <i class="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                </div>
            </div>
          </div>
        </div>
        </div>
        <div class="col-md">
        <div class="card mb-4  shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 ">Driver</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title txt-blue">80 coins<small class="text-muted fw-light"></small></h1>
            <ul class="mt-3 mb-4">
              <li>Expert Driver</li>
              <li>Pets allowed in car</li>
              <li>Will start up a conversation if requested</li>
              <li>Baby seat included</li>
            </ul>

            
            <p>This driver is qualified. Will drive anywhere, including from one side of the country to the other.</p>
            <div class="row">
                <div class="col">
                <Link to="/job"><button type="button" class="btn btn-link">More details <i class="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                
                </div>
            </div>
          </div>
        </div>
        </div>
        <div class="col-md">
        <div class="card mb-4  shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 ">Plumbing and Electrical</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title txt-blue">50 coins<small class="text-muted fw-light"></small></h1>
            <ul class="mt-3 mb-4">
              <li>Blocked Drains</li>
              <li>Tap and Toilet Repair</li>
              <li>Fixed Upfront no Surprise</li>
              <li>Help center access</li>
            </ul>

            
            <p>This business servicing Canberra is a local SME in the Plumbers & Gas Fitters category. </p>
            <div class="row">
                <div class="col">
                <Link to="/job"><button type="button" class="btn btn-link">More details <i class="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                
                </div>
            </div>
          </div>
        </div>
        </div>
        <div class="col-md">
        <div class="card mb-4  shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 ">Plumbing and Electrical</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title txt-blue">50 coins<small class="text-muted fw-light"></small></h1>
            <ul class="mt-3 mb-4">
              <li>Blocked Drains</li>
              <li>Tap and Toilet Repair</li>
              <li>Fixed Upfront no Surprise</li>
              <li>Help center access</li>
            </ul>

            
            <p>This business servicing Canberra is a local SME in the Plumbers & Gas Fitters category. </p>
            <div class="row">
                <div class="col">
                <Link to="/job"><button type="button" class="btn btn-link">More details <i class="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                
                </div>
            </div>
          </div>
        </div>
        </div>
        <div class="col-md">
        <div class="card mb-4  shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 ">Plumbing and Electrical</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title txt-blue">50 coins<small class="text-muted fw-light"></small></h1>
            <ul class="mt-3 mb-4">
              <li>Blocked Drains</li>
              <li>Tap and Toilet Repair</li>
              <li>Fixed Upfront no Surprise</li>
              <li>Help center access</li>
            </ul>

            
            <p>This business servicing Canberra is a local SME in the Plumbers & Gas Fitters category. </p>
            <div class="row">
                <div class="col">
                <Link to="/job"><button type="button" class="btn btn-link">More details <i class="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                
                </div>
            </div>
          </div>
        </div>
        </div>
       
     
       </div>
      
       <p class="py-5">&nbsp;</p>
      </div>
      

    )
  }

}

export default HomePage;