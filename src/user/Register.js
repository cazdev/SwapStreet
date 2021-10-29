import React, {useState} from 'react';
import Layout from '../components/Layout'
import { Link, useParams } from 'react-router-dom'
import { updateUser, register, authenticate, isAuthenticated, logout } from '../auth/index'
import Photo from '../components/dashboard/photoUpload'
import OpenStreetMapProvider from '../components/map/openStreetMapProvider';

const Register = () => {
    const id = useParams().id
    const user = isAuthenticated().user

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
            errormsg: '',
            error: false,
            success: false
        } :
        {
        name:'',
        email: '',
        address: '',
        about: '',
        password: '',
        errormsg: '',
        error: false,
        success: false
    })

    const { name, email, address, about, password, errormsg, error, success } = values;

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
                    setValues({ ...values, errormsg: '', error: false, [name]: {x: res[0].x, y: res[0].y, label: event.target.value} });
                } else {
                    setValues({ ...values, errormsg: '', error: false, [name]: {x: 100000, y: 100000, label: event.target.value} });
                }
            } 
            srch(event.target.value)
            setLoc(event.target.value)
            console.log(results)
        } else {
            setValues({ ...values, errormsg: '', error: false, [name]: event.target.value });
        }
        
    }

    const clickSubmit = async (event) => {
        // prevent browser from reloading
        event.preventDefault();
        try {
        setValues({ ...values, error: false });
        let userRegistered = id ? await updateUser({id, name, email, address, about, password}).catch((errMsg) => {
            console.log(errMsg)
            setValues({errormsg: 'Failed to Update account: ' + errMsg.message, error: true});
        }) : await register({name, email, address, about, password}).catch((errMsg) => {
            console.log(errMsg)
            setValues({errormsg: 'Failed to register account: ' + errMsg.message, error: true});
        })
        console.log(userRegistered)
        if(!userRegistered) {
            console.log("Please fill out all required fields")
            setValues({...values, errormsg: 'Invalid user', error: true})
        } else {
            setUploadUserId(userRegistered.user._id)
            setValues({
                name:'',
                email: '',
                address: '',
                about: '',
                password: '',
                errormsg: '',
                error: false,
                success: true
            })
        }
    }
    catch (error) {
        console.log(error)
        setValues({errormsg: 'Error: ' + error.message, error: true});
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
            <button onClick={clickSubmit} className="btn btn-primary">
                Save Changes
            </button>
            </div>) : (<><div className="py-4">
            <button onClick={clickSubmit} className="btn btn-primary">
                Register
            </button>
            </div>
            <p class="mt-2">Already have an account? <Link to="/login" className="pl-5">Sign in</Link></p></>)}
        </form></>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            <h2>Error: {errormsg}</h2>
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success && uploadUserId === '' ? '' : 'none' }}>
            {id ? <>Profile updated.</> : <>New account is created.</>} Please <Link to="/login" onClick={UserLogout}>log in</Link>
        </div>
    );


    return (
        <Layout title={id ? "Update Profile" : "Register"} description={id ? "Update your profile" : 'Register for a new account'} className='container col-md-8 offset-md-2'>
            {showSuccess()}
            {showError()}
            {registerForm()}
        </Layout>
    )
}

export default Register;