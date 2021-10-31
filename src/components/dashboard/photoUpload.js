//          AUTHORS - JOSHUA ARCHER, RUSHAN BARAL, JOSHUA DODANDUWA
//          Macquarie University Student\
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImgage from './default.jpg';

import { allPhotos, getOnlyUserPhotos } from '../../auth/index'


const Photo = ({ currentUser, uploadUserId, setUploadUserId }) => {

    const [newUser, setNewUser] = useState(
        {

            photo: defaultImgage,
            userID: currentUser,
            _id: ''
        }
    );
    const [photoPath, setPhotoPath] = useState({
        photo: defaultImgage,
        userID: currentUser,
        _id: ''
    })
    const [editProfile, setEditProfile] = useState(false)
    const submitPhoto = async () => {
        //e.preventDefault();
        if (photoPath._id !== newUser._id) {
            await axios.delete(`/api/userphotos/${uploadUserId}`)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if ((photoPath._id !== '' && newUser._id !== '' && photoPath._id === newUser._id) || newUser.photo === '' || newUser.photo === defaultImgage) {
            setUploadUserId('')
            return
        }
        const formData = new FormData();
        formData.append('photo', newUser.photo);
        formData.append('userID', uploadUserId)

        axios.post('/api/users/photo', formData)
            .then(res => {
                setUploadUserId('')
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }



    const handlePhoto = (e) => {
        if (e.target.files[0]) {
            //console.log('photo submitted', e.target.files[0])
            setNewUser({ photo: e.target.files[0], userID: currentUser, _id: '' });
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
        let u = photos[0]
        //console.log("complete list of photos", u)

        if (u) {
            var base64Flag = `data:${u.photo.contentType};base64,`;
            var imageStr = arrayBufferToBase64(u.photo.data.data);
            //console.log(base64Flag + imageStr)
            setPhotoPath({...photoPath, photo: base64Flag + imageStr, _id: u._id})
            setNewUser({...newUser, photo: base64Flag + imageStr, _id: u._id})
        }
    }

    useEffect(() => {
        if (window.location.pathname.indexOf('editprofile') !== -1 || window.location.pathname.indexOf('register') !== -1) {
            setEditProfile(true)
        }
        getPhoto()
    }, [])

    useEffect(() => {
        if (uploadUserId !== '') {
            submitPhoto()
        }

    }, [uploadUserId])


    //console.log(newUser)
    if (!editProfile) {
        return (<>
            {!editProfile && <div class="row">
                <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                    {photoPath && <img src={photoPath.photo} className='prof-img'></img>}
                </div>
            </div>}
        </>)
    }
    return (
        <div>
            {newUser.photo !== '' &&
                (<div className='mt-3'>
                    <img className='prof-img' src={typeof newUser.photo === "string" ? newUser.photo : URL.createObjectURL(newUser.photo)} alt="preview image" />
                    {newUser.photo !== defaultImgage && <button type="button" className="btn btn-link" onClick={(e) => setNewUser({photo: '', userID: currentUser, _id: ''})}><i className="bi bi-trash icn-2x"></i></button>}
                </div>)}
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