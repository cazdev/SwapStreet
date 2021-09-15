import stopword from 'stopword';
import React, { useState, useEffect } from 'react'
import logo from '../img/swap.png'
import handshake from '../img/handshake.png'
import { useParams, useHistory, Link } from 'react-router-dom';
import { getJob, allJobs, updateJob } from '../jobAPIRequests';
import { getUser, isAuthenticated } from '../auth';
import { getUserComments, addComment } from '../commentAPIRequests';
import MapComp from '../components/map/map';

const JobDetails = () => {

  const history = useHistory()
  const [jobId, setJobId] = useState(useParams().id)
  const [similarJobList, setSimilarJobList] = useState([])
  const [job, setJob] = useState({})
  const [user, setUser] = useState({})
  const [userComments, setUserComments] = useState([])
  const [newComment, setNewComment] = useState("")

  const userProf = isAuthenticated().user

  function findSimilarJobs(currentJob, allJobs) {
    const activeJobs = allJobs.filter(job => job !== currentJob && (job.status === 0 && currentJob.clientUserId === "" ? job.clientUserId === "" : job.providerUserId === ""))
    const curJobWords = stopword.removeStopwords((currentJob.title).concat(currentJob.description).split(" "))
    let simJobs = []
    for(let i = 0; i < activeJobs.length; i++) {
      let checkJob = stopword.removeStopwords((activeJobs[i].title).concat(activeJobs[i].description).split(" "))
      for(let j = 0; j < checkJob.length; j++) {
        if(curJobWords.includes(checkJob[j])) {
          simJobs.push(activeJobs[i])
          break
        }
      }
    }
    simJobs.sort(() => Math.random() - 0.5);
    if(simJobs.length < 3) {
      const actFilt = activeJobs.filter(job => !simJobs.includes(job))
      actFilt.sort(() => Math.random() - 0.5);
      for(let i = 0; i < actFilt.length; i++) {
        simJobs.push(actFilt[i])
        if(simJobs.length === 3) break;
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
    const submitted = await addComment({ comment: newComment, providerUserId: job.providerUserId, clientUserId: userProf._id }).catch((error) => {
      //console.log(error.response.data.error)
      alert(error.response.data.error);
    })
    if (submitted) {
      setUserComments([...userComments, submitted])
      const tarea = document.getElementById("txtcom")
      tarea.disabled = true
    }
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
    <div class="row g-5 py-5">
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-12">

            <h1 class="lh-1 mb-3 txt-blue">{job.title}</h1>
            <p class="lead">{job.description}</p>
            {job.location && <p class="lead">{typeof job.location === "string" ? job.location : job.location.label}</p>}
            {job.skill !== undefined && job.skill.length > 0 && (<><p class="lead">Skills needed</p>
              <ul>
                {job.skill && job.skill.map((skill,index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </>)}
            {!userProf || (userProf && job.status === 0 && userProf._id !== job.clientUserId && userProf._id !== job.providerUserId) ?
              (<div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <button onClick={(e) => buyProvideJob(e)} type="button" class="btn btn-primary btn-sm px-4 me-md-2">{job.price} Swapstreet Coins</button>
                <button onClick={(e) => swapFav()} type="button" class="btn btn-outline-secondary btn-sm px-4">Swap Services</button>
              </div>) : (<></>)}
          </div>

          <div class="col-md-12">
            <div class="row py-5">
              <div class="col-md-12">
                <hr />
                <div class="p-3 b ">
                  <h2> About {user.name}</h2>
                  <ul className="mt-3 mb-4">
                    <li>{user.email}</li>
                    {user.address && <li>{typeof user.address === "string" ? user.address : user.address.label}</li>}
                    {user.about !== "" && <li>{user.about}</li>}
                  </ul>
                  {userComments && (<><h2>Reviews</h2>
                    <ul className="mt-3 mb-4">
                      {userComments.map(com => <li key={com._id}>{com.comment}</li>)}
                    </ul>
                  </>)}
                  {isAuthenticated() && job.clientUserId === "" && userProf._id !== job.clientUserId && userProf._id !== job.providerUserId && (
                    <form>
                      <div className="form-group">
                        <label className="text-muted">Comment on {user.name}'s services</label>
                        <textarea rows="2" onChange={(e) => setNewComment(e.target.value)} className="form-control" value={newComment} id="txtcom" />
                      </div>
                      <button onClick={addCom} type="button" class="btn btn-primary btn-sm px-4 mt-2 me-md-2">Add Comment</button>
                    </form>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 job-image">
        <div className="map-container">
          {job.location && <MapComp jobList={[job]} />}
        </div>
      </div>
    </div>
    <div class="row ">
      <div class="col">
        <h2 class="txt-blue">Similar Services</h2>
        <hr />
      </div>
    </div>
    <div class="row g-4 py-3 row-cols-1 row-cols-md-3">
      {similarJobList.map((job, index) => {
      if(index < 3) return (
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
    <p class="py-5">&nbsp;</p>

  </>
  );
}

export default JobDetails;