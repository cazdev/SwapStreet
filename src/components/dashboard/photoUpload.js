import React, { useState } from 'react';
import axios from 'axios';
import defaultImgage from './default.jpg';
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
        formData.append('userID', currentUser)



        axios.post('http://localhost:3001/api/users/photo', formData)
            .then(res => {
                console.log(res.data);
                
                console.log(URL.createObjectURL(newUser.photo))
                setPhotoPath(URL.createObjectURL(newUser.photo))
                console.log("photo path - ", res.data.photo.photo)
            })
            .catch(err => {
                console.log(err);
            });
    }



    const handlePhoto = (e) => {
        setNewUser({ photo: e.target.files[0] });
        console.log('photo submitted', e.target.files[0])


    }

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