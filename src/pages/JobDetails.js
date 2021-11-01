import stopword from 'stopword';
import React, { useState, useEffect } from 'react'
import logo from '../img/swap.png'
import handshake from '../img/handshake.png'
import { useParams, useHistory, Link } from 'react-router-dom';
import { getJob, allJobs, updateJob } from '../jobAPIRequests';
import { getUser, isAuthenticated } from '../auth';
import { getUserComments, addComment, deleteComment } from '../commentAPIRequests';
import MapComp from '../components/map/map';
import ReactStars from 'react-rating-stars-component';
import JobPhotos from './JobPhotos'
import ReviewSummary from '../components/dashboard/UserReview/ReviewSummary';
const JobDetails = () => {

  const history = useHistory()
  const [jobId, setJobId] = useState(useParams().id)
  const [similarJobList, setSimilarJobList] = useState([])
  const [job, setJob] = useState({})
  const [user, setUser] = useState({})
  const [userComments, setUserComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(0)

  const userProf = isAuthenticated().user

  function findSimilarJobs(currentJob, allJobs) {
    const activeJobs = allJobs.filter(job => job !== currentJob && (job.status === 0 && currentJob.clientUserId === "" ? job.clientUserId === "" : job.providerUserId === ""))
    const curJobWords = stopword.removeStopwords((currentJob.title).concat(currentJob.description).split(/[\s/]+/))
    let simJobs = []
    for (let i = 0; i < activeJobs.length; i++) {
      let checkJob = stopword.removeStopwords((activeJobs[i].title).concat(activeJobs[i].description).split(/[\s/]+/))
      for (let j = 0; j < checkJob.length; j++) {
        if (curJobWords.includes(checkJob[j])) {
          simJobs.push(activeJobs[i])
          break
        }
      }
    }
    simJobs.sort(() => Math.random() - 0.5);
    if (simJobs.length < 3) {
      const actFilt = activeJobs.filter(job => !simJobs.includes(job))
      actFilt.sort(() => Math.random() - 0.5);
      for (let i = 0; i < actFilt.length; i++) {
        simJobs.push(actFilt[i])
        if (simJobs.length === 3) break;
      }
    }
    setSimilarJobList(simJobs)
  }

  useEffect(async () => {
    const jobs = await allJobs()
    const j = jobs.find(job => job._id === jobId)
    setJob(j)
    const u = await getUser((j.status < 2 && j.clientUserId === "") || (userProf && j.clientUserId === userProf._id && j.providerUserId !== "") ? j.providerUserId : j.clientUserId)
    setUser(u)
    const uc = await getUserComments(u._id)
    //console.log(uc)
    setUserComments(uc)
    findSimilarJobs(j, jobs)
  }, [jobId])

  const buyProvideJob = async (event) => {
    if (!isAuthenticated()) {
      history.push("/login")
    } else {
      const submitted = job.providerUserId === "" ? (await updateJob({ ...job, providerUserId: userProf._id, status: 2 }).catch((error) => {
        //console.log(error.response.data.error)
        alert(error.response.data.error);
      })) : (await updateJob({ ...job, clientUserId: userProf._id, status: 2 }).catch((error) => {
        //console.log(error.response.data.error)
        alert(error.response.data.error);
      }))
      //console.log(submitted)
      history.push("/dashboard")
    }
  }

  const addCom = async () => {
    const submitted = await addComment({ review: newComment, rating: newRating, providerUserId: job.providerUserId === user._id || job.clientUserId === "" ? job.providerUserId: job.clientUserId, clientUserId: userProf._id }).catch((error) => {
      //console.log(error.response.data.error)
      alert(error.response.data.error);
    })
    if (submitted) {
      setUserComments([...userComments, submitted])
    }
  }
  const deleteCom = async (id) => {
    deleteComment({ _id: id })
    const filtered = userComments
    //console.log("filtered comments: ", filtered.filter(u => u._id !== id))
    setUserComments(filtered.filter(u => u._id !== id))
  }

  const swapFav = async () => {
    if (!isAuthenticated()) {
      history.push("/login")
    } else {
      const submitted = job.providerUserId === "" ? (await updateJob({ ...job, swapReqUserId: userProf._id, status: 1 }).catch((error) => {
        //console.log(error.response.data.error)
        alert(error.response.data.error);
      })) : (await updateJob({ ...job, swapReqUserId: userProf._id, status: 1 }).catch((error) => {
        //console.log(error.response.data.error)
        alert(error.response.data.error);
      }))
      //console.log(submitted)
      history.push("/dashboard")
    }
  }
  //console.log(job)

  return (<>
    <div class="row g-5">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">

            <h1 class="lh-1 mb-3 txt-blue">{job.title}</h1>
            <p class="lead">{job.description}</p>
            {isAuthenticated() && job.location && <p class="lead">{typeof job.location === "string" ? job.location : job.location.label}</p>}
            {job.skill !== undefined && job.skill.length > 0 && (<><p class="lead">Skills needed</p>
              <ul className='cont'>
                {job.skill && job.skill.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </>)}
            {job._id && <JobPhotos jobDetails={job._id} setUploadJobId={()=> console.log("yo")} uploadJobId={''}/>}
            <br/>
            {!userProf || (userProf && job.status === 0 && userProf._id !== job.clientUserId && userProf._id !== job.providerUserId) ?
              (<div class="d-grid gap-2 mt-3 d-md-flex justify-content-md-start">
                <button onClick={(e) => buyProvideJob(e)} type="button" class="btn btn-primary btn-sm px-4 me-md-2">{job.price} Swapstreet Coins</button>
                <button onClick={(e) => swapFav()} type="button" class="btn btn-outline-secondary btn-sm px-4">Swap Services</button>
              </div>) : (<>Cannot purchase or swap your own item, others will be able to though</>)}
          </div>

          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                <hr />
                {isAuthenticated() && (<div class="p-3 b ">
                <Link to={`/profile/${user._id}`}><h2> About {user.name} <button type="button" className="btn btn-link"><i className="bi bi-arrow-right-circle icn-2x"></i></button></h2></Link>
                  <ul className="mt-3 mb-4 cont">
                    <li>{user.email}</li>
                    {user.address && <li>{typeof user.address === "string" ? user.address : user.address.label}</li>}
                    {user.about !== "" && <li>{user.about}</li>}
                  </ul>
                  <hr/>
                  {userComments && (<><h2>Reviews</h2>
                    <ReviewSummary
                    totalRatings = {userComments.map(u => u.rating).reduce(function (a, b) {
                      return a + b;
                    }, 0)} 
                    totalReview = {userComments.length}
                  />

                    <ul className="reviews">
                      {userComments.map(com => <li className="review spchbub" key={com._id}>
                      <Link to={`/profile/${com.clientUserId}`}><button type="button" className="btn btn-link">user profile <i className="bi bi-arrow-right-circle icn-2x"></i></button></Link>
                        <ReactStars 
                          size={15}
                          color={'#cccccc'}
                          activeColor={'#ffb302'}
                          edit={false}
                          a11y={true}
                          isHalf={true}
                          emptyIcon={<i className='fa fa-star' />}
                          halfIcon={<i className='fa fa-star-half-alt' />}
                          value={com.rating}
                        />
                        {com.review} 
                        {com.clientUserId === userProf._id && <button onClick={(e) => deleteCom(com._id)} type="button" className="btn btn-link"><i className="bi bi-trash-fill icn-2x"></i></button>}
                        <div className="row">
                        </div>
                      </li>)}

                    </ul>
                    <br className="clearfix"/>
                  </>)}
                  {userProf._id !== user._id && (userComments.filter(u => u.clientUserId === userProf._id).length < 1)
                    &&
                    <form>
                      <div className="form-group">

                        <h2 className="mt-4">Comment on {user.name}'s services</h2>
                        <span className="rate">Rate:</span> <ReactStars classNames="txt-blue"
                          count={5}
                          onChange={(e) => setNewRating(e)}
                          size={15}
                          color={'#cccccc'}
                          value={newRating}
                        />
                        
                        <span className='clearfix'> </span>Comment:
                        <textarea rows="2" onChange={(e) => setNewComment(e.target.value)} className="form-control mt-2" value={newComment} id="txtcom" />
                      </div>
                      <div className='d-flex flex-wrap align-items-center mt-2'>
                        
                      </div>
                      <button onClick={addCom} type="button" class="btn btn-primary btn-sm px-4 mt-2 me-md-2">Add Comment</button>
                    </form>}
                </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 job-image">
        <div className="map-container">
          {job.location && <MapComp jobList={isAuthenticated() ? [job] : []} />}
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <h2 class="txt-blue">Similar Favours</h2>
        <hr />
      </div>
    </div>
    <div class="row g-4 py-3 row-cols-1 row-cols-md-3">
      {similarJobList.map((job, index) => {
        if (index < 3) return (
          <div key={job._id} class="col d-flex align-items-start">
            <div class="icon-square bg-light txt-blue flex-shrink-0 me-3"><i class="bi bi-bricks"></i>
            </div>
            <div>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <Link onClick={(e) => setJobId(job._id)} to={`/job/${job._id}`} class="btn btn-outline-secondary btn-sm px-4">
                See Favour
              </Link>
            </div>
          </div>
        )
      })}
    </div>

  </>
  );
}

export default JobDetails;