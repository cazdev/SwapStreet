//          AUTHORS - JOSHUA DODANDUWA
//          Macquarie University Students\

import React, { Component, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import './homePage.css';

import '../../styles/custom.css'
import MapComp from '../map/map';
import { allJobs } from '../../jobAPIRequests/index'
import { isAuthenticated, allUsers } from "../../auth/index";
import mower from '../../img/lawn.jpeg';
import UserReview from '../dashboard/UserReview';
import ReviewSummary from '../dashboard/UserReview/ReviewSummary';

const HomePage = () => {

  const user = isAuthenticated ? isAuthenticated().user : false;

  const [userList, setUserList] = useState([])
  const [jobList, setJobList] = useState([])
  const [ogJobList, setOgJobList] = useState([])

  const fields = ["title","price","description","location","jobID","skills","user"]
  const [searchFields, setSearchFields] = useState(fields)
  const [qry, setQry] = useState("")

  useEffect(async () => {
    const jobs = await allJobs()
    setJobList(jobs)
    setOgJobList(jobs)
    const users = await allUsers()
    setUserList(users)
    console.log(users)
  }, [])

  useEffect(() => {
    console.log("search")
    search()
  }, [searchFields, qry])

  function search() {
    console.log(qry)
    if (qry != "") {
      const userSrch = userList.filter(user => user.name.toLowerCase().search(qry.toLowerCase()) !== -1
      || user.email.toLowerCase().search(qry.toLowerCase()) !== -1
      || user.about.toLowerCase().search(qry.toLowerCase()) !== -1
      || user._id.toLowerCase().search(qry.toLowerCase()) !== -1)
      
      let records = ogJobList.filter(job => (searchFields.includes("title") && job.title.toLowerCase().search(qry.toLowerCase()) !== -1)
        || (searchFields.includes("description") && job.description.toLowerCase().search(qry.toLowerCase()) !== -1)
        || (searchFields.includes("price") && job.price.toString().toLowerCase().search(qry.toLowerCase()) !== -1)
        || (searchFields.includes("location") && job.location.label.toString().toLowerCase().search(qry.toLowerCase()) !== -1)
        || (searchFields.includes("jobID") && job._id.toString().toLowerCase().search(qry.toLowerCase()) !== -1)
        || (searchFields.includes("skills") && job.skill.filter(sk => sk.toString().toLowerCase().includes(qry.toLowerCase())).length > 0)
        || (searchFields.includes("user") && userSrch.map(u => u._id).includes(job.clientUserId))
        || (searchFields.includes("user") && userSrch.map(u => u._id).includes(job.providerUserId)))

      
      console.log(records)
      setJobList(records)
    } else {
      setJobList(ogJobList)
    }
  }

  const toggleTabs = (event) => {
    event.preventDefault()
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
    <div className="homePage">
      <div className="row align-items-center 
         py-5 hero-bg">
      
        <div className="col-md-9">
          {user ? (<><h1 className="lh-1 mb-3  ">Help is just a click away</h1>
          <p className="lead mb-4">Just a click away from getting the services you need. See favours in tabs below or search favours here.</p></>)
          : (<><h1 className="lh-1 mb-3  ">Login to see favours on map</h1>
          <p className="lead mb-4">Or see Active and Favours Requested tab to view the available favours in SwapStreet</p></>)}
          <div className="row">
            <div className="col-md-7">
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search for services..." aria-label="Search"
                  value={qry} onChange={(e) => setQry(e.target.value)}
                  id="Search"
                />
              </form>
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary btn-sm" onClick={e => document.getElementById("filt").classList.contains("nodisplaytab") ?
              document.getElementById("filt").classList.remove("nodisplaytab")
              : document.getElementById("filt").classList.add("nodisplaytab")}>Advanced Search</button>
            </div>
          </div>
        </div>
        <ul id="filt" className="chkbx-row nodisplaytab"> 
        {fields && fields.map((column, index) => (
                      <li class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={"checkBox"+index} checked={searchFields.includes(column)}
                          onChange={(e) => {
                            const checked = searchFields.includes(column);
                            setSearchFields(prev => checked ? prev.filter(sc => sc !== column) : [...prev, column])
                          }
                          } /><label class="custom-control-label" for={"checkBox"+index}>{column}</label>
                        </li>))}
         </ul>
      </div>

      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link htab active" href="#maps" onClick={(e) => toggleTabs(e)}>Favours Map</a>
        </li>
        <li class="nav-item">
          <a class="nav-link htab" aria-current="page" href="#activefavours" onClick={(e) => toggleTabs(e)}>Active Favours</a>
        </li>
        <li class="nav-item">
          <a class="nav-link htab" href="#favoursrequested" onClick={(e) => toggleTabs(e)}>Favours Requested</a>
        </li>

      </ul>

      <div className="row row-cols-1  row-cols-lg-3 row-cols-md-2 mb-3 hpage tab-cont">
      <div className="map-container">
          <MapComp jobList={isAuthenticated() ? jobList.filter(item => item.status === 0): []}/>
           </div>
        
      </div>                   
      <div className="row row-cols-1  row-cols-lg-3 row-cols-md-2 mb-3 hpage nodisplaytab tab-cont" id="activefavours">
        {jobList.filter(job => job.status === 0 && job.providerUserId !== "" && job.clientUserId === "").length > 0 ?
          (jobList.filter(job => job.status === 0 && job.providerUserId !== "" && job.clientUserId === "").map(job => (
            <div key={job._id} className="col-md">
              <div className="card mb-4  shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 ">{job.title}
                  </h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title txt-blue">{job.price} coins<small className="text-muted fw-light"></small></h1>
                  <p className="mt-3 mb-4 card-body-scroll">
                    {job.description}
                  </p>
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
                  <h4 className="my-0 "> {job.title}
        
                   </h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title txt-blue">{job.price} coins <small className="text-muted fw-light"></small></h1>
                  <p className="mt-3 mb-4 card-body-scroll">
                    {job.description}
                  </p>
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