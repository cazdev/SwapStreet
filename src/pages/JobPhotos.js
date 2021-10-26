import react, { useState, useEffect } from 'react'
import axios from 'axios'
const JobPhotos = (job_id) => { 
    const getJobPhoto = async () => {
        const jobID = job_id.jobDetails
        console.log('fetching job photos for user : ', jobID)
        
        const jobPhotos = await axios.get(`http://localhost:3001/api/jobs/photos/${jobID}`)
        .then(res => {
            console.log("returned from getjobphotos", res)
        }).catch(err => console.log(err))
        
    }
    const [newJob, setNewJob] = useState(
        {

            photo: '',
            jobID: job_id.jobDetails
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
        <div>Job Photos</div>
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
