import { API } from '../config'
import axios from 'axios';

export const register = (user) => {
    // console.log(name, email, password);
    return (
        fetch(`${API}/register`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
    )
}

/*export const login = (user) => {
    // console.log(name, email, password);
    return (
        fetch(`${API}/login`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
    )
}*/

export const login = (user) => {
    const hi = axios.post(`http://localhost:3001/api/login`,user)
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
    return hi
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
        /*next();
        return fetch(`${API}/logout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));*/
    }
};

export const isAuthenticated = () => {
    //localStorage.clear()
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        console.log(JSON.parse(localStorage.getItem('jwt')));
        return true;
    } else {
        return false;
    }
};

