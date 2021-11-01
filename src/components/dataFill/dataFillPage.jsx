//          AUTHORS - RUSHAN BARAL, JOSHUA DODANDUWA
//          Macquarie University Students\

import React, { Component, useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useParams, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { isAuthenticated } from '../../auth/index';
import { updateJob, addJob, getJob } from '../../jobAPIRequests';
import OpenStreetMapProvider from '../map/openStreetMapProvider';
import JobPhotos from '../../pages/JobPhotos';

const JobDataFill = (props) => {

    const history = useHistory()
    const jobId = useParams().id
    const [uploadJobId, setUploadJobId] = useState("")
    const timeoutRef = useRef();

    const { user: { _id, name, email, address, about, coins } } = isAuthenticated();

    
    const prov = OpenStreetMapProvider();
    const [results, setResults] = useState([])
    const [loc, setLoc] = useState('')
    const [errors, setErrors] = useState([])

    const [values, setValues] = useState({
        providerUserId: props.path === "/providefavour" || props.path === "/editprovidefavour" ? _id : '',
        clientUserId: props.path === "/needfavour" || props.path === "/editneedfavour" ? _id : '',
        title: '',
        description: '',
        skill: [],
        price: '',
        location: {
            x:100000,
            y:100000,
            label: ''
        }
    })

    useEffect(async () => {
        if(props.path === "/editneedfavour" || props.path === "/editprovidefavour") {
            const jobEdit = await getJob(jobId)
            setValues({...values, 
                title: jobEdit.title, 
                description: jobEdit.description, 
                skill: jobEdit.skill, 
                price: jobEdit.price, 
                location: jobEdit.location})

            setLoc(jobEdit.location ? jobEdit.location.label : '')
        } else if (props.path === "/needfavour" || props.path === "/providefavour") {
            setValues({...values, location: address})
            setLoc(address.label)
        }
      }, [])

    const handleChange = name => event => {
        setErrors([])
        if (name === 'skill') {
            let skillArray = event.target.value.split(",")
            setValues({ ...values, [name]: skillArray });
        } else if (name === 'location') {
            async function srch(val) {
                const res = await prov.search({ query: val });
                console.log(res)
                setResults(res)
                if(res.length === 1) {
                    setValues({ ...values, [name]: {x: res[0].x, y: res[0].y, label: event.target.value} });
                } else {
                    setValues({ ...values, [name]: {x: 100000, y: 100000, label: event.target.value} });
                }
            }
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                srch(event.target.value)
            }, 800);
            setLoc(event.target.value)
            console.log(results)
        } else {
            setValues({ ...values, [name]: event.target.value });
        }
        
    }

    const formHandler = async (event) => {
        event.preventDefault()
        let valErrors = []
        if(values.title === '') {
            valErrors.push('title field empty')
        }
        if(values.description === '') {
            valErrors.push('description field empty')
        }
        if(values.price === '') {
            valErrors.push('price field empty')
        }
        if(values.price < 0) {
            valErrors.push('jobs cannot have a negative price')
        }
        if(valErrors.length > 0) {
            setErrors(valErrors)
            return
        }
        let spin = document.getElementById('submitload')
        let btnmsg = document.getElementById('submitbtn').firstChild
        spin.classList.add('spinner-border')
        btnmsg.nodeValue = 'Saving...'
        console.log(values)
        if(props.path === "/needfavour" || props.path === "/providefavour") {
            const submitted = await addJob(values).catch((error) => {
                spin.classList.remove('spinner-border')
                btnmsg.nodeValue = 'Create Favour'
                console.log(error.response.data.error)
                setErrors([error.response.data.error])
                return
            })
            console.log(submitted)
            setUploadJobId(submitted._id)
        }
        if(props.path === "/editneedfavour" || props.path === "/editprovidefavour") {
            const submitted = await updateJob({...values, _id: jobId}).catch((error) => {
                spin.classList.remove('spinner-border')
                btnmsg.nodeValue = 'Save Changes'
                console.log(error.response.data.error)
                setErrors([error.response.data.error])
                return
            })
            console.log(submitted)
            setUploadJobId(jobId)
        }
    }

    return (
        <div style={{ margin: "10px" }}>
            <div className="row">
                <div className="col-md-10">
                <h1 class="txt-blue">
                {props.path === "/needfavour" || props.path === "/providefavour" ? <>New Favour</> :<>Edit Favour</>}
            </h1>
            <ul className="alert alert-danger" style={{ display: errors.length > 0 ? '' : 'none' }}>
                {errors.map((err,idx) => (
                    <li key={idx}>{err}</li>
                ))}
            </ul>
            <form onSubmit={formHandler}>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" id="titleInput" placeholder="Enter Title" onChange={handleChange('title')} value={values.title} />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="5" className="form-control" id="descInput" placeholder="Enter Description" onChange={handleChange('description')} value={values.description} />
                </div>
                <div className="form-group">
                    <label>Skills (separate with commas)</label>
                    <input type="text" className="form-control" id="locationInput" placeholder="Enter Skills" onChange={handleChange('skill')} value={values.skill && values.skill.toString()} />
                </div>

                <div className="form-group">
                    <label>Job Price</label>
                    <input type="number" className="cell-sm form-control" id="priceInput" placeholder="Enter Price" onChange={handleChange('price')} value={values.price} />
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input list="locations" className="form-control" id="locationInput" placeholder="Enter Location"  onChange={handleChange('location')} value={loc}/>
                    <datalist id="locations">
                        {results.map((item, index) => (
                                <option>{item.label}</option>))}
                    </datalist>
                </div>
                <JobPhotos jobDetails={jobId} setUploadJobId={setUploadJobId} uploadJobId={uploadJobId}/>
                <div className="py-4">
                    <button type="submit" id="submitbtn" className="btn btn-primary mr-2">{props.path === "/needfavour" || props.path === "/providefavour" ? "Create Favour" : "Save Changes"}
                        <span class="spinner-border-sm" role="status" aria-hidden="true" id="submitload"></span>
                    </button>
                    <Link to="/dashboard">
                        <button className="btn btn-outline-secondary">
                            Cancel
                        </button>
                    </Link>
                </div>

            </form>
            </div>
            </div>
            <p className="py-5">&nbsp;</p>

        </div>
    );
}

export default JobDataFill;