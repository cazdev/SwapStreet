import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImgage from './default.jpg';

import { allPhotos, getOnlyUserPhotos } from '../../auth/index'


const Photo = ({ currentUser, uploadUserId, setUploadUserId }) => {

    const [newUser, setNewUser] = useState(
        {

            photo: '',
            userID: currentUser
        }
    );
    const [photoPath, setPhotoPath] = useState(defaultImgage)
    const [editProfile, setEditProfile] = useState(false)
    const submitPhoto = async () => {
        //e.preventDefault();
        if(photoPath !== '' && newUser.photo !== '') {
            await axios.delete(`/api/userphotos/${uploadUserId}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }
        if(newUser.photo === '') {
            setUploadUserId('')
            return
        }
        const formData = new FormData();
        formData.append('photo', newUser.photo);
        formData.append('userID', uploadUserId)

        axios.post('/api/users/photo', formData)
            .then(res => {
                console.log(res.data);
                getPhoto()
                setUploadUserId('')
            })
            .catch(err => {
                console.log(err);
            });
    }



    const handlePhoto = (e) => {
        if(e.target.files[0]) {
            //console.log('photo submitted', e.target.files[0])
            setNewUser({...newUser, photo: e.target.files[0] });
        }
    }

    const arrayBufferToBase64 = (buffer) => {
        var binary = ''
        var bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b) => binary += String.fromCharCode(b))
        return window.btoa(binary)
    }

    const getPhoto = async () => {

        const photos = await getOnlyUserPhotos(currentUser)
        //console.log("complete list of photoss", photos)
        
        //const u = photos[photos.length-1]
        const u = photos.find(p => p.userID === currentUser)
        //console.log("complete list of photos", u)

        if(u) {
            var base64Flag = `data:${u.photo.contentType};base64,`;
            var imageStr = arrayBufferToBase64(u.photo.data.data);
            //console.log(base64Flag + imageStr)
            setPhotoPath(base64Flag + imageStr)
        } else {
            setPhotoPath('')
        }
    }
    
    useEffect(() => {
        if(window.location.pathname.indexOf('editprofile') !== -1 || window.location.pathname.indexOf('register') !== -1) {
            setEditProfile(true)
        }
        getPhoto()
    }, [])

    useEffect(() => {
        if(uploadUserId !== '') {
            submitPhoto()
        }
        
      }, [uploadUserId])
    
    
    console.log(newUser)
    return (
        <div className="form-group">
            {photoPath && <img src={photoPath} width="100" height="100"></img>}
            {newUser.photo !== '' && <div>new photo submitted
            <img width="100" height="100" src={URL.createObjectURL(newUser.photo)} alt="preview image" />
            <button type="button" className="btn btn-link" onClick={(e) => setNewUser({...newUser, photo: '' })}><i className="bi bi-x-square icn-2x"></i></button>
            </div>}
            {editProfile &&

                <label class="custom-file-upload file-upload-padding">
                    Select Photo
                    <input 
                    id="photo-id"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="photo"
                    onChange={handlePhoto} />
                </label>
            }
            </div>
    );
}

export default Photo;