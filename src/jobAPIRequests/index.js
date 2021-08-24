import axios from 'axios';


export const allJobs = () => {
    var jobs
    try {
        jobs = axios.get("http://localhost:3001/api/jobs")
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
    }
    catch(error) {

    }
    return jobs
}

export const getJob = (id) => {
    const job = axios.get(`http://localhost:3001/api/jobs/${id}`)
    .then(response => {
        //console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        } else {
            const validJob = response.data
            return validJob
        }
    })
    return job
}

export const deleteJob = (id) => {
    const jobs = axios.delete(`http://localhost:3001/api/jobs/${id}`)
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

export const userJobs = (userId) => {
    const jobs = axios.get(`http://localhost:3001/api/userjobs/${userId}`)
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

export const addJob = (content) => {
    const job = axios.post(`http://localhost:3001/api/jobs`, content)
    .then(response => {
        console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        } else {
            const validJob = response.data
            return validJob
        }
    })
    return job
}

export const updateJob = (content) => {
    const job = axios.put(`http://localhost:3001/api/jobs/${content._id}`, content)
    .then(response => {
        //console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        } else {
            const validJob = response.data
            return validJob
        }
    })
    return job
}

