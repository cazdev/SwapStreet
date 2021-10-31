import React, {useState} from 'react';
import Layout from '../components/Layout'
import {Redirect, Link, useHistory} from 'react-router-dom'
import { login, authenticate, isAuthenticated } from '../auth/index'

const Login = () => {

    const history = useHistory()

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        error: [],
        loading: false,
        redirectToReferrer: false,
    })

    const { username, email, password, loading, error, redirectToReferrer } = values;
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: [], [name]: event.target.value });
    }

    const clickSubmit = async (event) => {
        // prevent browser from reloading
        event.preventDefault();
        let valErrors = []
        if(email === '') {
            valErrors.push('email field empty')
        }
        if(password === '') {
            valErrors.push('password field empty')
        }
        console.log()
        if (valErrors.length > 0) {
            setValues({ ...values, loading: false, error: valErrors}); 
            return
        }
        let spin = document.getElementById('submitload')
        let btnmsg = document.getElementById('submitbtn').firstChild
        spin.classList.add('spinner-border')
        btnmsg.nodeValue = 'Logging in...'
        try {
            setValues({ ...values, error: [], loading: true });
            let userValid = await login({email, password}).catch((error) => {
                console.log(error.response.data.error)
                spin.classList.remove('spinner-border')
                btnmsg.nodeValue = 'Login'
                setValues({ ...values, loading: false, error: [error.response.data.error] });
              })
            console.log(userValid)
            if(userValid) {
                authenticate(userValid, () => {
                    setValues({
                        ...values,
                        error: [],
                        redirectToReferrer: true
                    })
                })
            }
            console.log(isAuthenticated())
        }
        catch (error) {
            console.log(error)
            setValues({error: [error]});
        }
    };


    const registerForm = () => (
        
        <form className="col-md-8">
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="text" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
           
           <div className="py-4">
            <button onClick={clickSubmit} className="btn btn-primary" id="submitbtn">
                Login
            <span class="spinner-border-sm" role="status" aria-hidden="true" id="submitload"></span>
            </button>
            
            </div>
            <p class="mt-2">Don't have an account? <Link to="/register" className="pl-5">Sign up</Link></p>
            </div>
           
        </form>
    )

    const showError = () => (
            <ul className="alert alert-danger" style={{ display: error.length > 0 ? '' : 'none' }}>
                {error.map(err => (
                    <li>{err}</li>
                ))}
            </ul>
    );

    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            console.log('redirect working')
            /*if (user) {
                return <Redirect to="/" />;
            }*/
            history.goBack()
        }
    };


    return (
        <><Layout title="Login " description='Welcome Back' className='container col-md-8 offset-md-2'>
            {showLoading()}
            {showError()}
            {registerForm()}
            {redirectUser()}
        </Layout>
        <p className="py-5">&nbsp;</p>
        <p className="py-5">&nbsp;</p>
        <p className="py-5">&nbsp;</p>
        <p className="py-5">&nbsp;</p></>
    )
}

export default Login;