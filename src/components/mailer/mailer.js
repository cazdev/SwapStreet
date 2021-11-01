// ==========================================
// Title:  Authors
// Authors: Rushan Baral
// Last Update:   4 OCT 2021
// ==========================================

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './mailer.css';

const Mailer = () => {
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState('')
    function sendEmail(e){
        e.preventDefault();
        let spin = document.getElementById('submitload')
        let btnmsg = document.getElementById('submitbtn').firstChild
        spin.classList.add('spinner-border')
        btnmsg.nodeValue = 'Submitting...'
        let valErrors = []
        if(document.getElementById('exampleInputName1').value === '' ) {
            valErrors.push('name field empty')
        }
        if(document.getElementById('exampleInputEmail1').value === '' ) {
            valErrors.push('email field empty')
        }
        if(document.getElementById('exampleInputEmail1').value !== '' 
        && document.getElementById('exampleInputEmail1').value.indexOf('@') === -1) {
            valErrors.push('invalid email. Must at least include @')
        }
        if(document.getElementById('exampleFormControlTextarea1').value === '' ) {
            valErrors.push('message field empty')
        }
        if(valErrors.length > 0) {
            setErrors(valErrors)
            spin.classList.remove('spinner-border')
            btnmsg.nodeValue = 'Submit'
            return
        }
        console.log("sent")
        emailjs.sendForm(
            "service_fulj0cj",
            "template_7iv83qj",
            e.target,
            "user_MG2tIqaHOVsthhdUliWfX" 
        ).then(res=>{
            console.log(res);
            setErrors([])
            setSuccess('Email Sent! The SwapStreet team will get back to you ASAP.')
            spin.classList.remove('spinner-border')
            btnmsg.nodeValue = 'Submit'
        }).catch(err=> {
            console.log(err)
            setErrors([err])
            spin.classList.remove('spinner-border')
            btnmsg.nodeValue = 'Submit'
        });
    }
    return (
        <div class="mailer-container">
            <h1 class="mailer-title">Contact Us</h1>
            <ul className="alert alert-danger" style={{ display: errors.length > 0 ? '' : 'none' }}>
                {errors.map((err,idx) => (
                    <li key={idx}>{err}</li>
                ))}
            </ul>
            <form
                onSubmit={sendEmail}
            >
                <div class="form-group">
                    <label>Name: </label>
                    <input name="name" type="name" class="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter Full Name"></input>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address: </label>
                    <input name="user_email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                    <small id="emailHelp" class="form-text text-muted">*We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Your Message: </label>
                    <textarea name="message" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Hi, can your help me with ..."></textarea>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                    <label class="form-check-label" for="exampleCheck1">Subscribe to recieve regular updates from SwapStreet.</label>
                </div>
                <button type="submit" class="btn btn-primary mt-3" id="submitbtn">
                    Submit
                    <span class="spinner-border-sm" role="status" aria-hidden="true" id="submitload"></span>
                </button>
            </form>
            <br/>
            <div class="alert alert-primary" role="alert" style={{ display: success.length > 0 ? '' : 'none' }}>
                {success}
            </div>
            <div class="space">
            </div>
            
        </div>
    )
}

export default Mailer;