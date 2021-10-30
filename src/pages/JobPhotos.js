//          AUTHORS - JOSHUA ARCHER , RUSHAN BARAL, JOSHUA DODANDUWA
//          Macquarie University Student\
//          Date created: 23/10/2021
//          Last Update: 28/10/2021

import react, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import { getListPhotos } from './index'
const JobPhotos = ({ jobDetails, uploadJobId, setUploadJobId }) => {
    const history = useHistory()
    const job_id = jobDetails
    const [photoArray, setPhotoArray] = useState([])
    const [editProfile, setEditProfile] = useState(false)
    const [retrieved, setRetrieved] = useState(false)
    const [newJob, setNewJob] = useState([])
    const getJobPhoto = async () => {
        const photos = await getListPhotos(job_id)
        if (photos) {
            let photoStrings = []
            let changePhotos = []
            photos.map(pho => {
                var base64Flag = `data:${pho.photo.contentType};base64,`;
                var imageStr = arrayBufferToBase64(pho.photo.data.data);
                photoStrings.push({ photo: base64Flag + imageStr, jobID: job_id, _id: pho._id })
                changePhotos.push({ photo: base64Flag + imageStr, jobID: job_id, _id: pho._id })
            })
            setPhotoArray(photoStrings)
            setNewJob(changePhotos)
            setRetrieved(true)
        }

        //RUSHAN to edit. The current photo list is being stored as a list of photos. (Done)
        //I am rendering just the very last photo and there are no limits yet. It would be good if we could have a limit (Done)
        //on how many photos people could upload. You also need to fix the bottom where, if (Done)
        //photoPath, the upload button disappears. If you need help message me. (Done) 

    }
    const arrayBufferToBase64 = (buffer) => {
        var binary = ''
        var bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b) => binary += String.fromCharCode(b))
        return window.btoa(binary)
    }
    /*const [newJob, setNewJob] = useState(
        {

            photo: '',
            jobID: job_id
        }
    );*/

    const handlePhoto = (e) => {
        if (e.target.files[0]) {
            if (newJob.length >= 4) {
                alert("Cannot upload more than 4 photos. Please delete an existing one if desired.")
                return
            }
            let newArray = newJob.concat({ photo: e.target.files[0], jobID: job_id });
            newArray = [...newJob, { photo: e.target.files[0], jobID: job_id }];
            setNewJob(newArray);
            console.log('newArray', newArray)
        }
    }

    const submitPhotos = async () => {

        let ogPhotosIn = newJob.filter(nj => typeof nj.photo === "string")
        //console.log(ogPhotosIn)
        let deletePhotos = photoArray.filter(o => !ogPhotosIn.some(i=> i._id === o._id))
        //console.log(deletePhotos)
        if (deletePhotos.length > 0) {
            for (let i = 0; i < deletePhotos.length; i++) {
                await axios.delete(`/api/jobs/photos/${deletePhotos[i]._id}`)
                .then(res => {
                    console.log("deleted " + i);
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }

        for (let i = 0; i < newJob.length; i++) {
            if (typeof newJob[i].photo !== "string") {
                const formData = new FormData();
                formData.append('photo', newJob[i].photo);
                formData.append('jobID', uploadJobId)

                await axios.post('/api/jobs/photos', formData)
                    .then(res => {
                        console.log("successfully uploaded " + i + " photo")
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
        console.log("done")
        history.push(`/job/${uploadJobId}`)
    }

    useEffect(() => {
        if (window.location.pathname.indexOf('providefavour') !== -1
            || window.location.pathname.indexOf('needfavour') !== -1) {
            setEditProfile(true)
        }
        getJobPhoto()
    }, [])

    useEffect(() => {
        if (uploadJobId !== '') {
            submitPhotos()
        }

    }, [uploadJobId])
    //console.log(newJob)

    if (!editProfile) {
        return (
            <div class="row">
                {photoArray.length > 0 ? photoArray.map(pho => 
                <div class="col-lg-6 col-md-12 mb-4 mb-lg-0 ">
                    <div className="img-cell" style={{backgroundImage: `url(${pho.photo})`}}></div>
                </div>)
            : !retrieved && <div>
            Loading photos...
            </div>}
        </div>)
    }
    else {
        return (
            <div>
                <label className='mt-3'>Photos</label>
                {newJob.length > 0 ? newJob.map(nf =>
                    <>
                    <div className='row'>
                        <div className='col-lg-3 col-md-6'>
                        <div className="img-cell" style={{backgroundImage: typeof nf.photo === "string" ? `url(${nf.photo})` : `url(${URL.createObjectURL(nf.photo)})`}}>
                        </div>
                        </div>
                        <div className='col-md-3'>
                        <button type="button" className="btn btn-link" onClick={(e) => setNewJob(newJob.filter(n => n !== nf))}><i className="bi bi-trash icn-2x"></i></button>
                        </div>
                    </div>
                    </>)
                    : 
                    !retrieved && <div>
                        Loading photos...
                    </div>}
                {retrieved && <label class="btn-secondary btn btn-outline-secondary btn-sm bg-white">
                    Add Photo
                    <input
                        id="photo-id"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={handlePhoto} />
                </label>}
            </div>)
    }
}
export default JobPhotos;