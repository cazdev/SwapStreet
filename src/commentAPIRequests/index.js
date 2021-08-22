import { API } from '../config'
import axios from 'axios';

export const getUserComments = (id) => {
    const comments = axios.get(`http://localhost:3001/api/usercomments/${id}`)
    .then(response => {
        console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        } else {
            const validComments = response.data
            return validComments
        }
    })
    return comments
}

export const addComment = (content) => {
    console.log(content)
    const comment = axios.post(`http://localhost:3001/api/comments/${content.providerUserId}`,content)
    .then(response => {
        console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        } else {
            const validComment = response.data
            return validComment
        }
    })
    return comment
}