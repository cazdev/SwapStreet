import axios from 'axios'
export const getListPhotos = (photoID) => {
    const photoList = axios.get(`/api/jobs/photos/${photoID}`)
    .then(res => {
        if(res.error) {
            console.log("cant fetch user images")
            return
        } else {
            const validPhotos = res.data
            return validPhotos
        }
    })
    return photoList
}