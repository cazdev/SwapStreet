//          AUTHOR - JOSHUA ARCHER 
//          Macquarie University Student\
//          Date created: 23/10/2021

import react, { useState, useEffect } from 'react'
import axios from 'axios'

import {getListPhotos} from './index'
const JobPhotos = (currentUser) => {
    const job_id = currentUser.jobDetails
    console.log("current user is:",currentUser.jobDetails)
    
    console.log('current job', job_id)
    const [photoList, setPhotoList] = useState([])
    const [lastPhoto, setLastPhoto] = useState([])
    const [photoType, setPhotoType] = useState('image/png')
    const [photoData, setPhotoData] = useState('')
    const getJobPhoto = async () => {
        console.log("photo id is: ", job_id)
        const photos = await getListPhotos(job_id)
        setPhotoList(photos)
        console.log(photos)
        console.log('list---', photos)

        //this find the first photo.
        //const pho = photos.find(p => p.jobID === job_id)
        //this finds the last
        if(photos) {
            const pho = await photos[photos.length - 1]
            setLastPhoto(pho)
            console.log("last photo is: ", pho)
            if(pho) {
                var base64Flag = `data:${pho.photo.contentType};base64,`;
                var imageStr = arrayBufferToBase64(pho.photo.data.data);
                console.log(base64Flag + imageStr)
                setPhotoPath(base64Flag + imageStr)
            }
            
        
        }

        //RUSHAN to edit. The current photo list is being stored as a list of photos. 
        //I am rendering just the very last photo and there are no limits yet. It would be good if we could have a limit
        //on how many photos people could upload. You also need to fix the bottom where, if 
        //photoPath, the upload button disappears. If you need help message me. 

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
    const [photoPath, setPhotoPath] = useState('')

    const handlePhoto = (e) => {
        setNewJob({ photo: e.target.files[0] });
        console.log('photo submitted', e.target.files[0])


    }

    const handleSubmit = (e) => {
        
        console.log("being submitted at - id: " + job_id.jobDetails)
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newJob.photo);
        formData.append('jobID', job_id.jobDetails)
        console.log('photo submitted')

        axios.post('http://localhost:3001/api/jobs/photos', formData)
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
        <div>Job Photos
            <ul>
        <img src={photoPath} alt="..." width="100" height="100"></img> </ul>
        </div>
    </>)}
    else {
        return (<>
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
        </>) 
    }
}
export default JobPhotos;
