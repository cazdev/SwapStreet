//          AUTHORS - JOSHUA DODANDUWA
//          Macquarie University Student\

import React, { Component, useState, useEffect } from 'react';
import './userProfile.css';
// @ts-ignore
//import profilePic from '../../resources/userProfile/default-user.jpg'
import "./sideBar.css"
import './sideBarNav.css'
import "./userInfo.css"
import {  Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import ReactStars from 'react-rating-stars-component';
import { isAuthenticated, getUser } from "../../auth/index";
import { useParams, useHistory } from 'react-router-dom';
import { userJobs, getJob, updateJob } from '../../jobAPIRequests';
import Photo from '../dashboard/photoUpload'
//import { getUserComments } from '../../commentAPIRequests';
import { getUserReviews } from '../../reviewAPIRequests';
import ReviewSummary from '../dashboard/UserReview/ReviewSummary'



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
  //const [swapUserComments, setSwapUserComments] = useState([]) 
  const [swapUserReviews, setSwapUserReviews] = useState([])

  useEffect(async () => {
    let j = await userJobs(useId)
    console.log(favType)
    if(favType) {
        if(favType === "requested") {
          j = j.filter(jb => jb.status === 0 && jb.clientUserId === useId)
      } else {
          j = j.filter(jb => jb.status === 0 && jb.providerUserId === useId)
      }
    }
    else {
      j = j.filter(jb => jb.status === 0)
    }
    
    console.log(j)
    setJobList(j)
    setSwapUser(await getUser(useId))
    //let com = await getUserComments(useId)
    let rev = await getUserReviews(useId)
    //setSwapUserComments(com.filter(c => c.providerUserId))
    setSwapUserReviews(rev.filter(r => r.providerUserId))
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

          {Object.entries(swapUser).length !== 0 && (<><div class="col-md">
            <h2>About {swapUser.name} </h2>
            <p>Email: {swapUser.email}</p>
            <p>Address: {typeof swapUser.address === "string" ? swapUser.address: swapUser.address.label}</p>
            {swapUser.about && <p>About: {swapUser.about}</p>}
          </div>
          <Photo currentUser={swapUser._id} setUploadUserId={()=> console.log("yo")} uploadUserId={''}/>
          </>)}
          <hr/>
          {swapUserReviews && (<><h2>Reviews</h2>
            <ReviewSummary
                    totalRatings = {swapUserReviews.map(u => u.rating).reduce(function (a, b) {
                      return a + b;
                    }, 0)} 
                    totalReview = {swapUserReviews.length}
                  />
           
          <div className="reviews">
            <ul className="mt-3 mb-4">
              {swapUserReviews.map(rev => <li className="spchbub" key={rev._id}>{rev.review} 
              <ReactStars 
                size={15}
                color={'#adb5bd'}
                activeColor={'#ffb302'}
                edit={false}
                a11y={true}
                isHalf={true}
                emptyIcon={<i className='fa fa-star' />}
                halfIcon={<i className='fa fa-star-half-alt' />}
                value={rev.rating}
              />
              </li>)}
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
                    <p className="mt-3 mb-4 card-body-scroll">
                      {job.description}
                    </p>
                    <div className="row more">
                      <div className="col-sm-6">
                        <Link to={`/job/${job._id}`}><button type="button" className="btn btn-link">More details <i className="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                       </div>
                       <div className="col-sm-6 txt-right py-2 px-3">
                       {swapId && <i class="bi bi-arrow-left-right" onClick={(e) => swapJobs(job)}></i>}
                        </div>
                    </div>
                  </div>
                </div>
              </div>))) : (
                <p className="no-data">No favours to display</p>
              )}
          </div>
        </div>
  )
}

export default Profile;