import { API } from '../config'
import axios from 'axios';

export const register = (user) => {
    const log = axios.post(`http://localhost:3001/api/register`,user)
    .then(response => {
        console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        } else {
            const validUser = response.data
            return validUser
        }
    })
    return log
}

export const login = (user) => {
    const log = axios.post(`http://localhost:3001/api/login`,user)
    .then(response => {
        //console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        } else {
            const validUser = response.data
            console.log(response.data)
            return validUser
        }
    })
    return log
}

export const updateUser = (user) => {
    console.log(user)
    const log = axios.put(`http://localhost:3001/api/users/${user.id}`,user)
    .then(response => {
        //console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        } else {
            const validUser = response.data
            return validUser
        }
    })
    return log
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
    }
};

export const getUser = (userId) => {
    const user = axios.get(`http://localhost:3001/api/users/${userId}`)
    .then(response => {
        //console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        } else {
            const validUser = response.data
            return validUser
        }
    })
    return user
}

export const isAuthenticated = () => {
    //localStorage.clear()
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

export const allUsers = () => {
    const users = axios.get(`http://localhost:3001/api/users/`)
    .then(response => {
        //console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        } else {
            const validUsers = response.data
            return validUsers
        }
    })
    return users
}

export const allPhotos = () => {
    const users = axios.get(`http://localhost:3001/api/photos/`)
    .then(response => {
        //console.log(response.data)
        if(response.error) {
            console.log("error")
            return
        } else {
            const validUsers = response.data
            return validUsers
        }
    })
    return users
}
export const getOnlyUserPhotos = (userID) => {
    const userPhotos = axios.get(`http://localhost:3001/api/photos/${userID}`) 
    .then(res => {
        if(res.error) {
            console.log("cant fetch user images")
            return
        } else {
            const validPhotos = res.data
            return validPhotos
        }
    })
    return userPhotos
}

