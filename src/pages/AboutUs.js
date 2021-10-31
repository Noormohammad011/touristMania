import React from 'react'

const AboutUs = () => {
  return (
    <section id='about' className='my-5'>
      <div className='container'>
        <h1 className='text-center text-uppercase'>
          <span>About Us</span>
        </h1>
      </div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-8 col-12'>
            <h1 className='text-md-start'>Travel Menia</h1>
            <div className='d-flex justify-content-start flex-column'>
              <h2>
                Travel is the main thing you purchase that makes you more
                extravagant”. We, at ‘Organization Name’, swear by this and put
                stock in satisfying travel dreams that make you perpetually rich
                constantly.
              </h2>
              <br />
              <p>
                We have been moving excellent encounters for a considerable
                length of time through our cutting-edge planned occasion bundles
                and other fundamental travel administrations. We rouse our
                clients to carry on with a rich life, brimming with
                extraordinary travel encounters.
              </p>
              <br />
              <p>
                We offer the best limits on our top-rated visit bundles to
                clients who pick our viable administrations over and over. How
                about we remind you indeed that we don’t expect to be your visit
                and travel specialists; we endeavor to be your vacation
                accomplices until the end of time.
              </p>
              <p>
                With more than 83,000 inns contracted crosswise over America, we
                are America’s biggest stage for residential lodgings.
              </p>
              <br />
            </div>
          </div>
          <div className='col-md-4 col-12'>
            <img
              src='https://res.cloudinary.com/noor011/image/upload/v1635610865/volenteer/g-4_mxdcxt.jpg'
              alt='aboutImage'
              classNam='img-fluid'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
