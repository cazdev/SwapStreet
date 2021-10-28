import { API } from '../config'
import axios from 'axios';


export const getUserReviews = (id) => {
const reviews = axios.get(`/api/userreview/${id}`)

    .then(response => {
        console.log(response.data)
        if(response.error) {
            console.log("Your request could not be processed. Please try again.")
            return
        } else {
            const validReviews = response.data
            return validReviews
        }
    })
    return reviews
}


    
export const addReview = (content) => {
console.log(content)
    const review = axios.post(`/api/reviews/${content.providerUserId}`,content)
        .then(response => {
            console.log(response.data)
            if(response.error) {
                console.log("Your request could not be processed. Please try again.")
                return
            } else {
                const validReview = response.data
                return validReview
        }
    })
    return review
}


