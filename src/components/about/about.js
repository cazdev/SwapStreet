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
        <section class="about-company-section">
            <section class="vision">
                <div class="container p-1 p-sm-3">
                    <div class="row">
                        {/* <div class="col-12 text-center">   
                            <h1>Our Vision</h1>
                        </div> */}
                        <div>  
                            <p class="vision-title text-center col-md-12">"Great Satisfaction comes from sharing and growing together"</p>
                           
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
                            <h1>Our Awesome Team</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img class="img-fluid team-img img-thumbnail"  src={p0} alt="" />
                            <h5>Dr Kate Stefanov</h5> 
                            <p2>Product Manager</p2>
                        </div>
                        <div class="col-md-4 text-center">
                            <img class="img-fluid team-img img-thumbnail"  src={p1} alt="" />
                            <h5>Kriti Chawla</h5> 
                            <p2>Frontend Developer</p2>
                        </div>
                        <div class="col-md-4 text-center">
                            <img class="img-fluid team-img img-thumbnail"  src={p2} alt="" />
                            <h5>Joshua Archer</h5> 
                            <p2>Backend Developer</p2>
                        </div>
                    </div>
                    <div class="row pt-5">
                        <div class="col-md-4 text-center">
                            <img class="img-fluid team-img img-thumbnail"  src={p3} alt="" />
                            <h5>Joshua Dodanduwa</h5> 
                            <p2>Fullstack Developer</p2>
                        </div>
                        <div class="col-md-4 text-center">
                            <img class="img-fluid team-img img-thumbnail"  src={p4} alt="" />
                            <h5>Chaz Lambrechtsen</h5> 
                            <p2>Web Lead</p2>
                        </div>
                        <div class="col-md-4 text-center">
                            <img class="img-fluid team-img img-thumbnail"  src={p5} alt="" />
                            <h5>Rushan Baral</h5> 
                            <p2>Frontend Developer</p2>
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
                            <img class="img-fluid team-img"  src={partner2} alt="" />
                            <img class="img-fluid team-img"  src={partner1} alt="" />
                            <img class="img-fluid team-img"  src={partner4} alt="" />
                            <img class="img-fluid team-img"  src={partner3} alt="" />
                        </div>
                    </div>
                </div>
                <div class="waves">
                    <svg data-name="Layer 1" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                    </svg>
                </div>  
            </section>
            <section>
                
            </section>
        </section>
    )
}

export default About