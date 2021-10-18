
import React, { Component, useState, useEffect } from 'react';
import './userProfile.css';
// @ts-ignore
//import profilePic from '../../resources/userProfile/default-user.jpg'
import "./sideBar.css"
import './sideBarNav.css'
import "./userInfo.css"
import {  Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { isAuthenticated, getUser } from "../../auth/index";
import { useParams, useHistory } from 'react-router-dom';
import { userJobs, getJob, updateJob } from '../../jobAPIRequests';
import { getUserComments } from '../../commentAPIRequests';



const Profile = () => {

    const history = useHistory()
    const useId = useParams().id
    const favType = useParams().favtype
    const swapId = useParams().swapid

  const {
    user: { _id, name, email, address, about, coins }
  } = isAuthenticated();

  /*let rating = 0;
  
  fetch('http://localhost:3200/rating?total=true&chosenUserID=' + _id)
  .then( resp => resp.json())
  .then((data)=> {
     rating = data.total
  })*/

  const [jobList, setJobList] = useState([])
  const [swapUser, setSwapUser] = useState({})
  const [swapUserComments, setSwapUserComments] = useState([])

  useEffect(async () => {
    let j = await userJobs(useId)
    console.log(favType)
    if(favType === "requested") {
        j = j.filter(jb => jb.status === 0 && jb.clientUserId === useId)
    } else {
        j = j.filter(jb => jb.status === 0 && jb.providerUserId === useId)
    }
    console.log(j)
    setJobList(j)
    setSwapUser(await getUser(useId))
    let com = await getUserComments(useId)
    setSwapUserComments(com.filter(c => c.providerUserId))
  }, [])

  const swapJobs = async (jobswap) => {
    let old = await getJob(swapId)
    console.log(old)
    let j1 = old.clientUserId ? await updateJob({_id: swapId, price: 0, clientUserId: old.clientUserId, providerUserId: useId, status: 2}) : await updateJob({_id: swapId, price: 0, clientUserId: useId, providerUserId: old.providerUserId, status: 2})
    console.log(j1)

    console.log(jobswap)
    let j2 = jobswap.clientUserId ? await updateJob({_id: jobswap._id, price: 0, clientUserId: jobswap.clientUserId, providerUserId: _id, status: 2}) : await updateJob({_id: jobswap._id, price: 0, clientUserId: _id, providerUserId: jobswap.providerUserId, status: 2})
    console.log(j2)
    history.goBack()
  }


  return (
      <div className="container">

          {Object.entries(swapUser).length !== 0 && (<div class="col-md">
            <h2>About {swapUser.name} </h2>
            <p>email: {swapUser.email}</p>
            <p>address: {typeof swapUser.address === "string" ? swapUser.address: swapUser.address.label}</p>
            {about && <p>about: {swapUser.about}</p>}
          </div>)}
          <hr/>
          {swapUserComments && (<><h2>Reviews</h2>

           
          <div class="reviews">
            <ul className="mt-3 mb-4">
              {swapUserComments.map(com => <li class="review" key={com._id}>{com.comment}</li>)}
            </ul>
            </div>
          </>)}

<div className="row mb-3">
            {jobList.length > 0 ?
            (jobList.map(job => (
              <div key={job._id} className="col-md-4">
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
                       <i class="bi bi-arrow-left-right" onClick={(e) => swapJobs(job)}></i>
                        </div>
                    </div>
                  </div>
                </div>
              </div>))) : (
                <p className="no-data">No favours to display</p>
              )}
          </div>

        {/*<div className="sidebar">
            <div className="card-body">
                <div className="sidebarnav">
                    <Link to='/'>
                        <h2 className="titles">Search for Jobs</h2>
                    </Link>
                </div>
                <div className="sidebarnav">
                    <Link to={`/editprofile/${_id}`}>
                        <h2 className="titles">Change Personal Information</h2>
                    </Link>
                </div>
        
                <div className="sidebarnav">
                    <Link to='/dashboard'>
                        <h2 className="titles">Dashboard</h2>
                    </Link>
                </div>
            </div>
        </div>


        <div className="userinfo">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Hello {name},</h5>
                    <p className="card-text">View or change your information.</p>
                    <p className="card-text">{about}</p>
                </div>
            </div>

            <div className="card-group">
                <div className="card">
                    <div className="card-header">
                        Account Information
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <h5>Contact Information</h5>
                                    <p>{name}</p>
                                    <p>{email}</p>
                                </blockquote>
                            </div>
                        </div>  
                        <div className="col-sm-6">
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <h5>Address</h5>
                                    <p>{address}</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class='card'>
                <div class="card-body">
                    <h5 clas="card-title">Your Balance</h5>
                </div>
                <blockquote className="blockquote balance">
                    <h5>${coins}</h5>
                </blockquote>

            </div>

            

         

  </div>*/}
        


        </div>
  )
}

export default Profile;