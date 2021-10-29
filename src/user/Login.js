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
        error: false,
        loading: false,
        redirectToReferrer: false,
    })

    const { username, email, password, loading, error, redirectToReferrer } = values;
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const clickSubmit = async (event) => {
        // prevent browser from reloading
        event.preventDefault();
        let spin = document.getElementById('submitload')
        let btnmsg = document.getElementById('submitbtn').firstChild
        spin.classList.add('spinner-border')
        btnmsg.nodeValue = 'Logging in...'
        try {
            setValues({ ...values, error: false, loading: true });
            let userValid = await login({email, password}).catch((error) => {
                console.log(error.response.data.error)
                spin.classList.remove('spinner-border')
                btnmsg.nodeValue = 'Login'
                alert(error.response.data.error);
              })
            console.log(userValid)
            if(!userValid) {
                console.log("invalid user")
                spin.classList.remove('spinner-border')
                btnmsg.nodeValue = 'Login'
                setValues({...values, error: userValid, loading: false})
            } else {
                authenticate(userValid, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    })
                })
            }
            console.log(isAuthenticated())
        }
        catch (error) {
            console.log(error)
            setValues({error: true});
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
        error && (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                <h2>Could not connect to remote service.</h2>
            </div>
        )
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