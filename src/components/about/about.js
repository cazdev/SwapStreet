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
                            <p1 class="vision-title text-center col-md-12">"Great satisfaction comes from giving back to your community"</p1>
                           
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

                                <p> SwapStreet is a platform that connects those in need of favours and those who can provide their services locally in exchange for favours. 
                                    From a disaster striking to something as simple as needing a hand to do the dishes, your community will now have the opportunity to look out for you.</p>
                                    
                                <p> Our strategy is to create a better community where everyone gets the opportunity to think about giving back to their community with your services. 
                                    No need to worry about big bills to get a simple task done anymore, just pay back to your community in favours. </p>

                                <p> We aim for our community to stand together with us towards a brighter, happier, settled and more equitable future.</p>
                            
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center p-3">   
                            <h1>Our Team</h1>
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
                                    <h6>Chaz Lambrechtsen</h6> 
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
                <div class="waves">
                    <svg data-name="Layer 1" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                    </svg>
                </div>  
            </section>
            <section class="faqs">
                <div class="container p-1 p-sm-3">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <h1>FAQ's</h1>
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        How long have you been in business?
                                    </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <strong>Idk</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        What makes you different from your competitors?
                                    </button>
                                    </h2>
                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <strong>We have Joshua Dodanduwa</strong>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        From where do you operate?
                                    </button>
                                    </h2>
                                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingFour">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Do you allow coin refunds for a change of mind? If so, how long do customers have to contact you?
                                    </button>
                                    </h2>
                                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <strong>This is the third item's accordion body.</strong> Maybe
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingFive">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                        How can I cancel my membership?
                                    </button>
                                    </h2>
                                    <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <strong>You can't. </strong> You are stuck with us.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
            </section>
        </div>
    )
}

export default About