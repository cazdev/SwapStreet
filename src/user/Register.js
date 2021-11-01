//          AUTHORS - RUSHAN BARAL, JOSHUA DODANDUWA
//          Macquarie University Students\

import React, { useState, useRef } from 'react';
import Layout from '../components/Layout'
import { Link, useParams } from 'react-router-dom'
import { updateUser, register, authenticate, isAuthenticated, logout } from '../auth/index'
import Photo from '../components/dashboard/photoUpload'
import OpenStreetMapProvider from '../components/map/openStreetMapProvider';

const Register = () => {
    const id = useParams().id
    const user = isAuthenticated().user
    const timeoutRef = useRef();

    const UserLogout = () => {
        logout()
        console.log("working")
    }
    const [uploadUserId, setUploadUserId] = useState("")

    const [values, setValues] = useState(id ? 
        {
            name: user.name,
            email: user.email,
            address: user.address,
            about: user.about,
            password: '',
            error: [],
            success: false
        } :
        {
        name:'',
        email: '',
        address: '',
        about: '',
        password: '',
        error: [],
        success: false
    })

    const { name, email, address, about, password, error, success } = values;

    const prov = OpenStreetMapProvider();
    const [results, setResults] = useState([])
    const [loc, setLoc] = useState(typeof address === "string" ? address : address.label)

    const handleChange = name => event => {
        if (name === 'address') {
            async function srch(val) {
                const res = await prov.search({ query: val });
                console.log(res)
                setResults(res)
                if(res.length === 1) {
                    setValues({ ...values, error: [], [name]: {x: res[0].x, y: res[0].y, label: event.target.value} });
                } else {
                    setValues({ ...values, error: [], [name]: {x: 100000, y: 100000, label: event.target.value} });
                }
            } 
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                srch(event.target.value)
            }, 800);
            setLoc(event.target.value)
            console.log(results)
        } else {
            setValues({ ...values, error: [], [name]: event.target.value });
        }
        
    }

    const clickSubmit = async (event) => {
        // prevent browser from reloading
        event.preventDefault();
        let valErrors = []
        if(name === '') {
            valErrors.push('name field empty')
        }
        if(email === '') {
            valErrors.push('email field empty')
        }
        if(email !== '' && email.indexOf('@') === -1) {
            valErrors.push('invalid email. Must at least include @')
        }
        if((typeof address === "string" && address === '') || !address.label) {
            valErrors.push('address field empty')
        }
        if(password === '') {
           valErrors.push('password field empty')
        }
        if (valErrors.length > 0) {
            setValues({ ...values, error: valErrors}); 
            return
        }
        try {
        let spin = document.getElementById('submitload')
        let btnmsg = document.getElementById('submitbtn').firstChild
        spin.classList.add('spinner-border')
        btnmsg.nodeValue = 'Saving Info...'
        setValues({ ...values, error: [] });
        let userRegistered = id ? await updateUser({id, name, email, address, about, password}).catch((errMsg) => {
            console.log(errMsg)
            spin.classList.remove('spinner-border')
            btnmsg.nodeValue = 'Save Changes'
            setValues({...values, error: ['Failed to Update account: ' + errMsg.message]});
        }) : await register({name, email, address, about, password}).catch((errMsg) => {
            console.log(errMsg)
            spin.classList.remove('spinner-border')
            btnmsg.nodeValue = 'Register'
            setValues({...values, error: ['Failed to Update account: ' + errMsg.message]});
        })
        console.log(userRegistered)
        if(!userRegistered) {
            console.log("Please fill out all required fields")
            setValues({...values, error: ['invalid user']});
        } else {
            setUploadUserId(userRegistered.user._id)
            setValues({...values,
                error: [],
                success: true
            })
        }
    }
    catch (error) {
        console.log(error)
        setValues({...values, error: ['Error: ' + error.message]});
    }
    };


    const registerForm = () => (
        <><form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control " value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Address</label>
                <input list="locations" className="form-control" id="locationInput" onChange={handleChange('address')} value={loc}/>
                    <datalist id="locations">
                        {results.map((item, index) => (
                                <option>{item.label}</option>))}
                </datalist>
            </div>

            <div className="form-group">
                <label className="text-muted">About yourself (Optional)</label>
                <textarea rows="3" onChange={handleChange('about')} className="form-control" value={about} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <Photo currentUser={id ? id: null} uploadUserId={uploadUserId} setUploadUserId={setUploadUserId}/>
            {id ? (<div className="py-4">
            <button onClick={clickSubmit} className="btn btn-primary mr-2" id="submitbtn">
                Save Changes
                <span class="spinner-border-sm" role="status" aria-hidden="true" id="submitload"></span>
            </button>
            <Link to="/dashboard">
                <button className="btn btn-outline-secondary">
                    Cancel
                </button>
            </Link>
            </div>) : (<><div className="py-4">
            <button onClick={clickSubmit} className="btn btn-primary" id="submitbtn">
                Register
                <span class="spinner-border-sm" role="status" aria-hidden="true" id="submitload"></span>
            </button>
            </div>
            <p class="mt-2">Already have an account? <Link to="/login" className="pl-5">Sign in</Link></p></>)}
        </form></>
    )

    const showError = () => (
        <ul className="alert alert-danger" style={{ display: error.length > 0 ? '' : 'none' }}>
                {error.map(err => (
                    <li>{err}</li>
                ))}
        </ul>
    );

    const showSuccess = () => {
        if(success && uploadUserId === '') {
            let spin = document.getElementById('submitload')
            let btnmsg = document.getElementById('submitbtn').firstChild
            spin.classList.remove('spinner-border')
            btnmsg.nodeValue = 'Success!'
        }
        return(<div className="alert alert-info" style={{ display: success && uploadUserId === '' ? '' : 'none' }}>
            {id ? <>Profile updated.</> : <>New account is created.</>} Please <Link to="/login" onClick={UserLogout}>log in</Link>
        </div>
        );
    }


    return (
        <Layout title={id ? "Update Profile" : "Register"} description={id ? "Update your profile" : 'Register for a new account'} className='container col-md-8 offset-md-2'>
            {showSuccess()}
            {showError()}
            {registerForm()}
        </Layout>
    )
}

export default Register;