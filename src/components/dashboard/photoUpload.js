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
    const [photoPath, setPhotoPath] = useState("http://localhost:3000/")
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newUser.photo);
        formData.append('userID', currentUser)
        
        

        axios.post('http://localhost:3001/api/users/photo', formData)
             .then(res => {
                console.log(URL.createObjectURL(newUser.photo));
                //setPhotoPath(photoPath + res.data.photo.photo)
                setPhotoPath(URL.createObjectURL(newUser.photo))
                
             })
             .catch(err => {
                console.log(err);
             });
    }

    

    const handlePhoto = (e) => {
        setNewUser({photo: e.target.files[0]});
        
          

    }

    return (
        <div> 
        <img src={photoPath} alt="..." width="100" height="100"></img>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            
                <input 
                id="photo-id"
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />

            <input 
                type="submit"
            />
        </form></div>
    );
}

export default Photo;