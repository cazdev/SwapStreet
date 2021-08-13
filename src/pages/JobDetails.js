import logo from '../img/swap.png'
import mower from '../img/mower.jpeg'

const JobDetails = () => {
    return(<>
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src={mower} class="d-block mx-lg-auto img-fluid" alt="" width="700" height="500" loading="lazy"/>
      </div>
      <div class="col-md-6">
        <h1 class="lh-1 mb-3 txt-blue">Lawn Mowing</h1>
        <p class="lead mb-5">This business helps keep your backyard looking sharp. Contact us today or you'll have a messy lawn!
        This business helps keep your backyard looking sharp. Contact us today or you'll have a messy lawn!
        This business helps keep your backyard looking sharp. Contact us today or you'll have a messy lawn!
        This business helps keep your backyard looking sharp. Contact us today or you'll have a messy lawn!</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="button" class="btn btn-primary btn-sm px-4 me-md-2">10 Swapstreet Coins</button>
          <button type="button" class="btn btn-outline-secondary btn-sm px-4">Swap Services</button>
        </div>
      </div>
    </div>
    

    <div class="row ">
      <div class="col">
      <h2 class="txt-blue">Similar Services</h2>
      <hr/>
          </div>
          </div>
    <div class="row g-4 py-3 row-cols-1 row-cols-md-3">
      <div class="col d-flex align-items-start">
        <div class="icon-square bg-light txt-blue flex-shrink-0 me-3"><i class="bi bi-bricks"></i>
        </div>
        <div>
          <h2>Building</h2>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="/" class="btn btn-outline-secondary btn-sm px-4">
            Get Service
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square bg-light txt-blue flex-shrink-0 me-3"><i class="bi bi-shop"></i>
        </div>
        <div>
          <h2>Grocery Shopping</h2>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="/" class="btn btn-outline-secondary btn-sm px-4">
          Get Service
          </a>
        </div>
      </div>
      <div class="col d-flex align-items-start">
        <div class="icon-square bg-light txt-blue flex-shrink-0 me-3"><i class="bi bi-cart"></i>
        </div>
        <div>
          <h2>Baby Sitting</h2>
          <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
          <a href="/" class="btn btn-outline-secondary btn-sm px-4">
          Get Service
          </a>
        </div>
      </div>
    </div>
 <p class="py-5">&nbsp;</p>
 
  </>
    );
}

export default JobDetails;