import React from 'react';
import logo from '../../img/swap.png';
import p0 from '../../img/p0.jpeg';
import p1 from '../../img/p1.jpeg';
import p2 from '../../img/p2.jpeg';
import p3 from '../../img/p3.jpeg';
import p4 from '../../img/p4.jpeg';
import p5 from '../../img/p5.jpeg';
import partner1 from '../../img/partner1.png';


const About = () => {
    return (
        <section class="about-company-section">
            <section>
                <div class="container p-1 p-sm-3">
                    <div class="row">
                        <div class="col-12 text-center">   
                            <h1>Our Vision</h1>
                            <hr/>
                        </div>
                        <div class="col-md-2">   
                            <img class="img-fluid"  src={logo} alt="" />
                        </div>
                        <div class="col-md-10">   
                            <p class="lead mb-4">
                                Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="pt-3 pb-4">
                <div class="container p-1 p-sm-3">
                    <div class="row">
                        <div class="col-12 text-center">   
                            <h1>Our Awesome Team</h1>
                            <hr/>
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
            <section>
                <div class="container p-1 p-sm-3">
                    <div class="row">
                        <div class="col-12 text-center">   
                            <h1>Official Partners</h1>
                            <hr/>
                            <img class="img-fluid team-img img-thumbnail"  src={partner1} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default About