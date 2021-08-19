import React, { Component, useState } from 'react';
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { isAuthenticated } from '../../auth/index';
import { addJob } from '../../jobAPIRequests';

const JobDataFill = (props) => {

    /*constructor(props) {
        super(props);
        this.state = {
            type: this.props.location.pathname
        }
        
    }



    componentDidMount(){
        this.state.type === "/edit" ? this.updateVariables() : this.newJob()
    }


    // let price = req.query.price;
    // let location = req.query.location;

    submitData(event) {

        console.log(this.jobStatus.value);

        event.preventDefault();

        let url = new URL("http://localhost:3200/jobs?" + (this.state.type === "/edit" ? "replace" : "add") + "=true")
        if(this.state.type === "/edit"){
            url.searchParams.set("replaceID", this.replaceID)
        }
        url.searchParams.set("userID", this.props.userID)
        url.searchParams.set("jobStatus", this.jobStatus.value)
        url.searchParams.set("chosenUserID", this.chosenUserID.value ? this.chosenUserID.value : "null")
        url.searchParams.set("title", this.title.value)
        url.searchParams.set("description", this.desc.value)
        url.searchParams.set("price", this.price.value)
        url.searchParams.set("location", this.location.value)

        fetch(url.href).then(() =>
            {
                fetch('http://localhost:3200/jobs?fetch=true&userID=' + this.props.userID)
                .then( resp => resp.json())
                .then((data)=> {
                        this.setState({
                            jobs: data
                        })
                })
            }
        )
    }

    newJob(){
        this.jobStatus = 1
        this.chosenUserID = ""
    }

    updateVariables(){
        var job = this.props.location.state.job;
        this.replaceID = job._id;
        this.jobStatus.value = job.jobStatus;
        this.chosenUserID.value = job.chosenUserID;
        this.title.value = job.title;
        this.desc.value = job.description;
        this.price.value = job.price;
        this.location.value = job.location;
    }


    /*

                    {this.props.location.pathname == "/edit" && <div className="form-group">
                        <label>Edit The Job</label>
                        <input type="text" className="form-control" id="inputType" ref={this.inputType = "Edit"} placeholder="Enter User ID" disabled value=""/>
                    </div>}
                    

    render() {*/

    const history = useHistory()
    const { user: { _id, name, email, address, about, coins } } = isAuthenticated();

    const [values, setValues] = useState({
        providerUserId: props.path === "/providefavour" ? _id : '',
        clientUserId: props.path === "/needfavour" ? _id : '',
        title: '',
        description: '',
        skills: [],
        price: '',
        location: ''
    })

    const handleChange = name => event => {
        if (name === 'skills') {
            let skillArray = event.target.value.split(",")
            setValues({ ...values, [name]: skillArray });
        } else {
            setValues({ ...values, [name]: event.target.value });
        }
        
    }

    const formHandler = async (event) => {
        event.preventDefault()
        const submitted = await addJob(values).catch((error) => {
            console.log(error.response.data.error)
            alert(error.response.data.error);
        })
        console.log(submitted)
        history.push("/dashboard")
    }

    return (
        <div style={{ margin: "10px" }}>

            <form onSubmit={formHandler}>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" id="titleInput" placeholder="Enter Title" onChange={handleChange('title')} value={values.title} />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" id="descInput" placeholder="Enter Description" onChange={handleChange('description')} value={values.description} />
                </div>
                <div className="form-group">
                    <label>Skills (separate with commas)</label>
                    <input type="text" className="form-control" id="locationInput" placeholder="Enter Skills" onChange={handleChange('skills')} />
                </div>

                <div className="form-group">
                    <label>Job Price</label>
                    <input type="number" className="form-control" id="priceInput" placeholder="Enter Price" onChange={handleChange('price')} value={values.price} />
                </div>

                {props.path === "/needfavour" && (<div className="form-group">
                    <label>Location</label>
                    <input type="text" className="form-control" id="locationInput" placeholder="Enter Location"  onChange={handleChange('location')} value={values.location}/>
                </div>)}

                <span>
                    <button type="submit" className="btn btn-primary btn-lg active">{props.path === "/edit" ? "Apply" : "Create"}</button>
                    <Link to="/dashboard">
                        <button className="btn btn-danger btn-lg active">
                            Cancel
                        </button>
                    </Link>
                </span>

            </form>

        </div>
    );
}

export default JobDataFill;