// ==========================================
// Title:  Authors
// Authors: Rushan Baral
// Last Update:   4 OCT 2021
// ==========================================

import React from 'react';
import emailjs from 'emailjs-com';
import './mailer.css';

const Mailer = () => {
    function sendEmail(e){
        e.preventDefault();

        emailjs.sendForm(
            "service_fulj0cj",
            "template_7iv83qj",
            e.target,
            "user_MG2tIqaHOVsthhdUliWfX" 
        ).then(res=>{
            console.log(res);
        }).catch(err=> console.log(err));
    }
    return (
        <div class="mailer-container">
            <h1 class="mailer-title">Contact Us</h1>
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
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <div class="space">

            </div>
        </div>
    )
}

export default Mailer;


{/* style={{marginTop:"50px",
         width:'50%',
        backgroundImage: `url('https://images.unsplash.com/photo-1506374322094-6021fc3926f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3lkbmV5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')`,
        backgroundPosition:"center",
        backgroundSize:"cover"
}}

{<div class="mailer">
            <h1>Contact Form</h1>
            <form>
                <div class="form-group">
                <label>Full Name</label>
                <input type ="text" name="name"/>

                <label>Email address</label>
                <input type ="email" name="user_email"/>

                <label>Message</label>
                <textarea name="message" rows='4'/>
                <input type ="submit" name="Send"/>
            </form>
            <div class="space">

            </div>
        </div> } */}