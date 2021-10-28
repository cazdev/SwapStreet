//          AUTHORS - JOSHUA ARCHER , RUSHAN BARAL
//          Macquarie University Student\
//          Date created: 23/10/2021
//          Last Update: 28/10/2021

import react, { useState, useEffect } from 'react'
import axios from 'axios'
import './JobPhotos.css'

import {getListPhotos} from './index'
const JobPhotos = (currentUser) => {
    const job_id = currentUser.jobDetails
    const [photoList, setPhotoList] = useState([])
    const [lastPhoto, setLastPhoto] = useState([])
    const [lastPhoto1, setLastPhoto1] = useState([])
    const [photoType, setPhotoType] = useState('image/png')
    const [photoData, setPhotoData] = useState('')
    const [photoPath, setPhotoPath] = useState('')
    const [photoPath1, setPhotoPath1] = useState('')
    const [photoPath2, setPhotoPath2] = useState('')
    const [photoPath3, setPhotoPath3] = useState('')
    const getJobPhoto = async () => {
        //console.log("photo id is: ", job_id)
        const photos = await getListPhotos(job_id)
        //console.log("photos are: ",photos)
        //console.log('list---', photos)

        //this find the first photo.
        //const pho = photos.find(p => p.jobID === job_id)
        //this finds the last
        if(photos) {
            const pho = await photos[photos.length - 1]
            const pho1 = await photos[photos.length - 2]
            const pho2 = await photos[photos.length - 3]
            const pho3 = await photos[photos.length - 4]
            setLastPhoto(pho)
            setLastPhoto1(pho1)
            //console.log("last photo is: ", pho)
            if(pho) {
                var base64Flag = `data:${pho.photo.contentType};base64,`;
                var imageStr = arrayBufferToBase64(pho.photo.data.data);
                setPhotoPath(base64Flag + imageStr)
            }

            if(pho1) {
                var base64Flag = `data:${pho1.photo.contentType};base64,`;
                var imageStr = arrayBufferToBase64(pho1.photo.data.data);
                setPhotoPath1(base64Flag + imageStr)
            }

            if(pho2) {
                var base64Flag = `data:${pho2.photo.contentType};base64,`;
                var imageStr = arrayBufferToBase64(pho2.photo.data.data);
                setPhotoPath2(base64Flag + imageStr)
            }

            if(pho3) {
                var base64Flag = `data:${pho3.photo.contentType};base64,`;
                var imageStr = arrayBufferToBase64(pho3.photo.data.data);
                setPhotoPath3(base64Flag + imageStr)
            }
            
        
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
    const [newJob, setNewJob] = useState(
        {
            
            photo: '',
            jobID: job_id
        }
    );

    const handlePhoto = (e) => {
        setNewJob({ photo: e.target.files[0] });
        //console.log('photo submitted', e.target.files[0])


    }

    const handleSubmit = (e) => {
        
        //console.log("being submitted at - id: " + job_id)
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newJob.photo);
        formData.append('jobID', job_id)
        //console.log('photo submitted')

        axios.post('/api/jobs/photos', formData)
            .then(res => {
                console.log("returned photo data", res.data);
                getJobPhoto()
            })
            .catch(err => {
                console.log(err);
            });
    }
    useEffect(() => {
        getJobPhoto()
      }, [])
    
      if(photoPath) {
        return (<>
            Job Photos:
            <div class="row">
                <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                    <img
                    src={photoPath} alt="..." width="100" height="100"
                    class="w-100 shadow-1-strong rounded mb-4"
                    alt=""
                    />

                    <img
                    src={photoPath1} alt="..." width="100" height="100"
                    class="w-100 shadow-1-strong rounded mb-4"
                    alt=""
                    />
                </div>

                <div class="col-lg-4 mb-4 mb-lg-0">
                    <img
                    src={photoPath2} alt="..." width="100" height="100"
                    class="w-100 shadow-1-strong rounded mb-4"
                    alt=""
                    />

                    <img
                    src={photoPath3} alt="..." width="100" height="100"
                    class="w-100 shadow-1-strong rounded mb-4"
                    alt=""
                    />
                </div>
            </div>
            <div>  
                <form  onSubmit={handleSubmit} encType='multipart/form-data'>
    
                    <label class="custom-file-upload file-upload-padding">
                        Select Photo
                        <input 
                        id="photo-id"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={handlePhoto} />
                    </label>
                    <label class="custom-file-upload">
                        <input 
                        type="submit"/>
                    </label>
                </form></div>
        </>)}
    if(photoPath) {
    return (<>
        <div>Job Photos:
            <ul>
        <img src={photoPath} alt="..." width="100" height="100"></img>
        </ul>
        </div>
        <div>
            
            <form  onSubmit={handleSubmit} encType='multipart/form-data'>

                <label class="custom-file-upload file-upload-padding">
                    Select Photo
                    <input 
                    id="photo-id"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="photo"
                    onChange={handlePhoto} />
                </label>
                <label class="custom-file-upload">
                    <input 
                    type="submit"/>
                </label>
            </form></div>
    </>)}
    else {
        return (<>
            <div>
            Add some photos to help understand your job better:
                
            <form  onSubmit={handleSubmit} encType='multipart/form-data'>

                <label class="custom-file-upload file-upload-padding">
                    Select Photo
                    <input 
                    id="photo-id"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="photo"
                    onChange={handlePhoto} />
                </label>
                <label class="custom-file-upload">
                    <input 
                    type="submit"/>
                </label>
            </form></div>
        </>) 
    }
}
export default JobPhotos;