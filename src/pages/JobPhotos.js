//          AUTHORS - JOSHUA ARCHER , RUSHAN BARAL
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
        console.log(ogPhotosIn)
        let deletePhotos = photoArray.filter(o => !ogPhotosIn.some(i=> i._id === o._id))
        console.log(deletePhotos)
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
    console.log(newJob)

    if (!editProfile) {
        return (<>
            {!editProfile && <div class="row">
                {photoArray.map(pho => <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                    <img
                        src={pho.photo} alt="..." width="100" height="100"
                        class="w-100 shadow-1-strong rounded mb-4"
                        alt=""
                    />
                </div>)}
            </div>}
        </>)
    }
    else {
        return (
            <div>
                {newJob.map(nf =>
                    <div>
                        <img width="100" height="100" src={typeof nf.photo === "string" ? nf.photo : URL.createObjectURL(nf.photo)} alt="preview image" />
                        <button type="button" className="btn btn-link" onClick={(e) => setNewJob(newJob.filter(n => n !== nf))}><i className="bi bi-x-square icn-2x"></i></button>
                    </div>)}
                <label class="custom-file-upload file-upload-padding">
                    Select Photo
                    <input
                        id="photo-id"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={handlePhoto} />
                </label>
            </div>)
    }
}
export default JobPhotos;