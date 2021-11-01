//          AUTHORS - KRITI CHAWLA, JOSHUA DODANDUWA
//          Macquarie University Students\
import { API } from '../config'
import axios from 'axios';

export const getUserComments = (id) => {
    const comments = axios.get(`/api/usercomments/${id}`)
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
    const comment = axios.post(`/api/comments/${content.providerUserId}`,content)
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

export const deleteComment = (content) => {
    console.log(content)
   axios.delete(`/api/comments/${content._id}`)
    .then(response => {
        console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        }
        return
    })
}