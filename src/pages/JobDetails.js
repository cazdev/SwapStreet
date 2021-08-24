import React, { useState, useEffect } from 'react'
import logo from '../img/swap.png'
import handshake from '../img/handshake.png'
import { useParams, useHistory } from 'react-router-dom';
import { getJob, updateJob } from '../jobAPIRequests';
import { getUser, isAuthenticated } from '../auth';
import { getUserComments, addComment } from '../commentAPIRequests';

const JobDetails = () => {

  const history = useHistory()
  const jobId = useParams().id
  const [job, setJob] = useState({})
  const [user, setUser] = useState({})
  const [userComments, setUserComments] = useState([])
  const [newComment, setNewComment] = useState("")

  const userProf = isAuthenticated().user

  useEffect(async () => {
    const j = await getJob(jobId)
    setJob(j)
    const u = await getUser((j.status < 2 && j.clientUserId === "") || (userProf && j.clientUserId === userProf._id && j.providerUserId !== "") ? j.providerUserId : j.clientUserId)
    setUser(u)
    const uc = await getUserComments(u._id)
    console.log(uc)
    setUserComments(uc)
  }, [])

  const buyProvideJob = async (event) => {
    if(!isAuthenticated()) {
      history.push("/login")
    } else {
      const submitted = job.providerUserId === "" ? (await updateJob({...job, providerUserId: userProf._id, status: 2}).catch((error) => {
        console.log(error.response.data.error)
        alert(error.response.data.error);
      })) : (await updateJob({...job, clientUserId: userProf._id, status: 2}).catch((error) => {
        console.log(error.response.data.error)
        alert(error.response.data.error);
      }))
      console.log(submitted)
      history.push("/dashboard")
    }
  }

  const addCom = async () => {
    const submitted = await addComment({comment: newComment, providerUserId: userComments[0].providerUserId, clientUserId: userProf._id }).catch((error) => {
      console.log(error.response.data.error)
      alert(error.response.data.error);
    })
    if(submitted){
      setUserComments([...userComments, submitted])
      const tarea = document.getElementById("txtcom")
      tarea.disabled = true
    }
  }

  const swapFav = async () => {
    if(!isAuthenticated()) {
      history.push("/login")
    } else {
      const submitted = job.providerUserId === "" ? (await updateJob({...job, swapReqUserId: userProf._id, status: 1}).catch((error) => {
        console.log(error.response.data.error)
        alert(error.response.data.error);
      })) : (await updateJob({...job, swapReqUserId: userProf._id, status: 1}).catch((error) => {
        console.log(error.response.data.error)
        alert(error.response.data.error);
      }))
      console.log(submitted)
      history.push("/dashboard")
    }
  }

  console.log(job)

  return (<>
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6 job-image">
        <img src={handshake} class="d-block mx-lg-auto img-fluid" alt="" width="700" height="500" loading="lazy" />
      </div>
      <div class="col-md-6">
        <h1 class="lh-1 mb-3 txt-blue">{job.title}</h1>
        <p class="lead">{job.description}</p>
        {job.location && <p class="lead">{job.location}</p>}
        {job.skill !== undefined && job.skill.length > 0 && (<><p class="lead">Skills needed</p>
        <ul>
          {job.skill && job.skill.map(skill => (
            <li>{skill}</li>
          ))}
        </ul>
        </>)}
        {!userProf || (userProf && job.status === 0 && userProf._id !== job.clientUserId && userProf._id !== job.providerUserId) ? 
        (<div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button onClick={(e) => buyProvideJob(e)} type="button" class="btn btn-primary btn-sm px-4 me-md-2">{job.price} Swapstreet Coins</button>
          <button onClick={(e) => swapFav()} type="button" class="btn btn-outline-secondary btn-sm px-4">Swap Services</button>
        </div>) :(<></>)}
      </div>
    </div>

    <div class="row py-5">
    <div class="col-md-6">
        <div class="p-3 b border">
          <h2> About {user.name}</h2>
          <ul className="mt-3 mb-4">
              <li>{user.email}</li>
              <li>{user.address}</li>
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
                <textarea rows="2" onChange={(e) => setNewComment(e.target.value)} className="form-control" value={newComment} id="txtcom"/>
            </div>
          <button onClick={addCom} type="button" class="btn btn-primary btn-sm px-4 mt-2 me-md-2">Add Comment</button>
          </form>)}
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
      <div class="col d-flex align-items-start">
        <div class="icon-square bg-light txt-blue flex-shrink-0 me-3"><i class="bi bi-bricks"></i>
        </div>
        <div>
          <h2>Building</h2>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="/" class="btn btn-outline-secondary btn-sm px-4">
            Get Service
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square bg-light txt-blue flex-shrink-0 me-3"><i class="bi bi-shop"></i>
        </div>
        <div>
          <h2>Grocery Shopping</h2>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="/" class="btn btn-outline-secondary btn-sm px-4">
            Get Service
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square bg-light txt-blue flex-shrink-0 me-3"><i class="bi bi-cart"></i>
        </div>
        <div>
          <h2>Baby Sitting</h2>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="/" class="btn btn-outline-secondary btn-sm px-4">
            Get Service
          </a>
        </div>
      </div>
    </div>
    <p class="py-5">&nbsp;</p>

  </>
  );
}

export default JobDetails;