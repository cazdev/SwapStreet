import axios from 'axios';


export const allJobs = () => {
    const jobs = axios.get("http://localhost:3001/api/jobs")
    .then(response => {
        //console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        } else {
            const validJobs = response.data
            return validJobs
        }
    })
    return jobs
}

