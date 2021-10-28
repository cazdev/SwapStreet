//          AUTHORS - JOSHUA ARCHER , RUSHAN BARAL
//          Macquarie University Student\
//          Date created: 23/10/2021
//          Last Update: 28/10/2021

import react, { useState, useEffect } from 'react'
import axios from 'axios'

import {getListPhotos} from './index'
const JobPhotos = (currentUser) => {
    const job_id = currentUser.jobDetails
    const [photoData, setPhotoData] = useState('')
    const [photoArray, setPhotoArray] = useState([])
    const getJobPhoto = async () => {
        const photos = await getListPhotos(job_id)
        if(photos) {
            let photoStrings = []
            photos.map(pho => {
                var base64Flag = `data:${pho.photo.contentType};base64,`;
                var imageStr = arrayBufferToBase64(pho.photo.data.data);
                photoStrings.push(base64Flag + imageStr)
            })
            setPhotoArray(photoStrings)
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
    
      if(photoArray.length > 0) {
        return (<>
            Job Photos:
            <div class="row">
                {photoArray.map(pho => <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                    <img
                    src={pho} alt="..." width="100" height="100"
                    class="w-100 shadow-1-strong rounded mb-4"
                    alt=""
                    />
                </div>)}
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