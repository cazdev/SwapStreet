import React from 'react';
import './about.css';
import logo from '../../img/swap.png';
import p0 from '../../img/p0.jpeg';
import p1 from '../../img/p1.jpeg';
import p2 from '../../img/p2.jpeg';
import p3 from '../../img/p3.jpeg';
import p4 from '../../img/p4.jpeg';
import p5 from '../../img/p5.jpeg';
import partner1 from '../../img/partner1.png';
import partner2 from '../../img/partner2.png';
import partner3 from '../../img/partner3.png';
import partner4 from '../../img/partner4.png';


const About = () => {
    return (
        <div class="about-company-section  active">
            <section class="vision min-ht400">
                <div class="container p-1 p-sm-3">
                    <div class="row">
                        {/* <div class="col-12 text-center">   
                            <h1>Our Vision</h1>
                        </div> */}
                        <div>  
                            <p class="vision-title text-center col-md-12">"Great Satisfaction comes from Sharing with Others"</p>
                           
                        </div>
                    </div>
                </div>
                <div class="waves">
                    <svg data-name="Layer 1" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                    </svg>
                </div>  
            </section>
            <section class="team">
                <div class="container p-1 p-sm-3">
                <div class="row">
                        <div class="col-12 text-center p-3"> 
                            <div className="about-description">  
                            <h1>What is SwapStreet?</h1>
                            <p>
                                SwapStreet is a Web application that allows for people who live locally to swap favours. Members 
                                offer to do favours in exchange for other favours within a certain proximity to each other.
                                The app is aimed for people to get to know their neighbours through those interactions. Thus, not 
                                only do they help each other, but also a happier local community is established.
                            </p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center p-3">   
                            <h1>Meet Our team</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 col-sm-6 p-3">
                            <div class= "card">
                                <img class="img-fluid center"  src={p0} alt="" />
                                <div class="card-text">
                                    <h3>Dr Kate Stefanov</h3> 
                                    <h5>Product Manager</h5>
                                </div>
                            </div>   
                        </div>
                        <div class="col-md-4 col-sm-6 p-3">
                            <div class= "card">
                                <img class="img-fluid"  src={p1} alt="" />
                                <div class="card-text">
                                    <h3>Kriti Chawla</h3> 
                                    <h5>Frontend Developer</h5>
                                </div>
                            </div>   
                        </div>
                        <div class="col-md-4 col-sm-6 p-3">
                            <div class= "card">
                                <img class="img-fluid"  src={p2} alt="" />
                                <div class="card-text">
                                    <h3>Joshua Archer</h3> 
                                    <h5>Backend Developer</h5>
                                </div>
                            </div>   
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 col-sm-6">
                            <div class= "card">
                                <img class="img-fluid"  src={p3} alt="" />
                                <div class="card-text">
                                    <h3>Joshua Dodanduwa</h3> 
                                    <h5>Fullstack Developer</h5>
                                </div>
                            </div>   
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class= "card">
                                <img class="img-fluid"  src={p4} alt="" />
                                <div class="card-text">
                                    <h3>Chaz Lambrechtsen</h3> 
                                    <h5>Web Lead</h5>
                                </div>
                            </div>   
                        </div>
                        <div class="col-md-4 col-sm-6">
                            <div class= "card">
                                <img class="img-fluid"  src={p5} alt="" />
                                <div class="card-text">
                                    <h3>Rushan Baral</h3> 
                                    <h5>Frontend Developer</h5>
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
            </section>
            <section class="partners">
                <div class="waves2">
                    <svg data-name="Layer 1"viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                    </svg>
                </div>
                <div class="container p-1 p-sm-3">
                    <div class="row">
                        <div class="col-12 text-center">   
                            <h1>Official Partners</h1>
                            <img class="img-fluid img"  src={partner2} alt="" />
                            <img class="img-fluid img"  src={partner1} alt="" />
                            <img class="img-fluid img"  src={partner4} alt="" />
                            <img class="img-fluid img"  src={partner3} alt="" />
                        </div>
                    </div>
                </div>
                
            </section>
        </div>
    )
}

export default About