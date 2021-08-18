import React, {useState} from 'react';
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import { register, authenticate, isAuthenticated } from '../auth/index'

const Register = () => {

    const [values, setValues] = useState({
        name:'',
        email: '',
        address: '',
        about: '',
        password: '',
        error: false,
        success: false
    })

    const { name, email, address, about, password, success, error } = values;
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const clickSubmit = async (event) => {
        // prevent browser from reloading
        event.preventDefault();
        setValues({ ...values, error: false });
        let userRegistered = await register({name, email, address, about, password}).catch((error) => {
            console.log(error)
            alert(error);
        })
        console.log(userRegistered)
        if(!userRegistered) {
            console.log("invalid user")
            setValues({...values, error: true})
        } else {
            authenticate(userRegistered, () => {
                setValues({
                    name:'',
                    email: '',
                    address: '',
                    about: '',
                    password: '',
                    error: false,
                    success: true
                })
            })
        }
        
    };


    const registerForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Address</label>
                <input onChange={handleChange('address')} type="text" className="form-control" value={address} />
            </div>

            <div className="form-group">
                <label className="text-muted">About yourself (Optional)</label>
                <input onChange={handleChange('about')} type="text" className="form-control" value={about} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary mt-3">
                Register
            </button>
            <p class="mt-3">Already have an account? <Link to="/login" className="pl-5">Sign in</Link></p>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/login">log in</Link>
        </div>
    );


    return (
        <Layout title="Register " description='Register for a new account' className='container col-md-8 offset-md-2'>
            {showSuccess()}
            {showError()}
            {registerForm()}
        </Layout>
    )
}

export default Register;