import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImgage from './default.jpg';

import { allPhotos, getOnlyUserPhotos } from '../../auth/index'


const Photo = (currentUser) => {

    const [newUser, setNewUser] = useState(
        {

            photo: '',
            userID: currentUser
        }
    );
    const [photoPath, setPhotoPath] = useState(defaultImgage)
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newUser.photo);
        formData.append('userID', currentUser.currentUser)
        


        axios.post('/api/users/photo', formData)
            .then(res => {
                console.log(res.data);
                getPhoto()
            })
            .catch(err => {
                console.log(err);
            });
    }



    const handlePhoto = (e) => {
        setNewUser({ photo: e.target.files[0] });
        console.log('photo submitted', e.target.files[0])


    }

    const arrayBufferToBase64 = (buffer) => {
        var binary = ''
        var bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b) => binary += String.fromCharCode(b))
        return window.btoa(binary)
    }

    const getPhoto = async () => {

        const photos = await getOnlyUserPhotos(currentUser.currentUser)
        console.log("complete list of photoss", photos[photos.length-1])
        
        //const u = photos[photos.length-1]
        const u = photos.find(p => p.userID === currentUser.currentUser)
        console.log("complete list of photos", u)

        if(u) {
            var base64Flag = `data:${u.photo.contentType};base64,`;
            var imageStr = arrayBufferToBase64(u.photo.data.data);
            console.log(base64Flag + imageStr)
            setPhotoPath(base64Flag + imageStr)
        }
    }
    
    useEffect(() => {
        getPhoto()
      }, [])
      

    return (
        <div>
            
            <img src={photoPath} alt="..." width="100" height="100"></img>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>

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
    );
}

export default Photo;