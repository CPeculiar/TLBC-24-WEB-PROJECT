import './App.css'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'

function App() {

  return (
    <>
      <Navbar />

      <section className="hero-sectionn" id="section_1">
      <div className="video-wrap">
        <video autoPlay loop muted className="custom-video">
          <source src="/images/TLBC24Animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
        <div className="section-overlay"></div>

        <div className="container d-flex justify-content-center align-items-center">
          <div className="row">

            <div className="col-12 mt-auto mb-5 text-center" id='homee'>
              <small className='text-white'>The Lord's Brethren Church International Presents</small>
              <h2 className="text-white mb-1">The Lord's Brethren Convocation '24</h2>
            </div>
            <div className="col-lg-12 col-12 d-flex flex-column flex-lg-row text-center" id='homeee'>
              <div className="date-wrap">
                <h5 className="text-white">
                  <i className="custom-icon bi-clock me-2"></i>
                  31st Aug - 4th Sept<sup></sup>, 2024
                </h5>
              </div>

              <div className="location-wrap mx-auto py-3 py-lg-0">
                <h5 className="text-white">
                  <i className="custom-icon bi-geo-alt me-2"></i>
                  Kingdom City Prayer Camp, Awka.
                </h5>
              </div>

              <div className="social-share">
                <ul className="social-icon d-flex align-items-center justify-content-center">
                  <span className="text-white me-3">Socials:</span>

                  <li className="social-icon-item">
                    <a href="https://web.facebook.com/thelordsbrethrenchurchintl" className="social-icon-link">

                      <span className="bi-facebook"></span>
                    </a>
                  </li>

                  <li className="social-icon-item">
                    <a href="https://www.youtube.com/@thelordsbrethrenchurchintl" className="social-icon-link">
                      <span className="bi-youtube"></span>
                    </a>
                  </li>

                  <li className="social-icon-item">
                    <a href="https://www.instagram.com/elochukwutlbc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="social-icon-link">
                      <span className="bi-instagram"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="video-wrap">
          <video autoplay="" loop="" muted="" class="custom-video" poster="">
              <source src="public/images/" type="video/mp4/TLBC24Abimation.mp4"/>
              Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="about-section section-padding" id="section_2">
        <div className="container">
          <div className="row">

            <div className="col-lg-6 col-12 mb-4 mb-lg-0 d-flex align-items-center">
              <div className="services-info">
                <h2 className="text-white mb-4">About TLBC'24</h2>

                <p className="text-white">The Lord's Brethren Convocation (TLBC)  2020 is an annual glorious homecoming of stakeholders in The Lord's Brethren Nation where we celebrate our partners, victories, joys, successes, conquests, coups and feats. It is an event that everyone who joined forces with our vision to push for the propagation of the Gospel always anticipate with joy and excitement every year.
                </p>

                <p className="text-white">It's a meeting that affords us the opportunity to celebrate our pastors, partners and ministry departments in grand style and also highlights all that has been achieved in the work of the ministry every year.</p>

                <p className="text-white">This year's convocation is going to be a meeting of worship, teachings, impartation, awards and of course The Lord's Brethren Family meeting.</p>
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <div className="about-text-wrap">
                <img src="public/images/_MG_8912.jpg" className="about-image img-fluid" />

                <div className="about-text-info d-flex">
                  <div className="d-flex">
                    <i className="about-text-icon bi-person"></i>
                  </div>


                  <div className="ms-4">
                    <h4>Our Annual Homecoming</h4>

                    <p className="mb-0">An amazing experience</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="artists-section section-padding" id="section_3">
        <div className="container">
          <div className="row justify-content-center">

            <div className="col-12 text-center">
              <h2 className="mb-4">What to expect</h2>
            </div>

            <div className="col-lg-5 col-12">
              <div className="artists-thumb">
                <div className="artists-image-wrap">
                  <img src="public/images/_MG_7548.jpg"
                    className="artists-image img-fluid" />
                </div>

                <div className="artists-hover">
                  <p>
                    <strong>The Word</strong>
                  </p>
                </div>
              </div>
              <div className="artists-thumb">
                <div className="artists-image-wrap">
                  <img src="public/images/_MG_8003.jpg"
                    className="artists-image img-fluid" />
                </div>

                <div className="artists-hover">
                  <p>
                    <strong>Worship</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-12">
              <div className="artists-thumb">
                <div className="artists-image-wrap">
                  <img src="public/images/_MG_8410.jpg"
                    className="artists-image img-fluid" />
                </div>

                <div className="artists-hover">
                  <p>
                    <strong>Prayers</strong>
                  </p>
                </div>
              </div>

              <div className="artists-thumb">
                <img src="public/images/_MG_1546.jpg"
                  className="artists-image img-fluid" />

                <div className="artists-hover">
                  <p>
                    <strong>Family Time</strong>

                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* <section className="about-section section-padding" id="section_2">
        <div className="container">
          <div className="row">

            <div className="col-lg-6 col-12">
              <div className="about-text-wrap">
                <img src="public/images/Reverend-Elochukwu.png" className="about-image img-fluid" />
              </div>
            </div>

            <div className="col-lg-6 col-12 mb-4 mb-lg-0 d-flex align-items-center">
              <div className="services-info">
                <h2 className="text-white mb-4">Meet Reverend Elochukwu</h2>

                <p className="text-white">Reverend Elochukwu Udegbunam is a supernatural and skillful minister of God’s word whose ministry has helped many around the world experience a victorious, impactful and effective life in the word of God. He is the founding Pastor of The Lord’s Brethren Church International. Within a few years of starting the church, he has raised many in the word of God who are passionate about the work of the ministry and as a result the church has centers in different cities in the country at the time with a wide following online.

                </p>

                <p className="text-white">Reverend Elochukwu received a 3-Fold mandate from the Lord for the work of the ministry:

                  <li className="text-white">Calling Sinners to Christ</li>

                  <li className="text-white">Building Saints in Christ</li>

                  <li className="text-white">Making Every saint a minister of the Lord Jesus Christ.</li>
                </p>

                <p className="text-white">He seeks to accomplish this through various platforms which includes: local churches, conferences, crusades, school of ministry, media and prints.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section> */}

      <section className="contact-section section-padding" id="section_6">
        <div className="container">
          <div className="row">

            <div className="col-lg-8 col-12 mx-auto">
              <h2 className="text-center mb-4">Have any questions? Let's talk</h2>

              <nav className="d-flex justify-content-center">
                <div className="nav nav-tabs align-items-baseline justify-content-center" id="nav-tab"
                  role="tablist">
                  <button className="nav-link active" id="nav-ContactForm-tab" data-bs-toggle="tab"
                    data-bs-target="#nav-ContactForm" type="button" role="tab"
                    aria-controls="nav-ContactForm" aria-selected="false">
                    <h5>Contact Form</h5>
                  </button>

                  <button className="nav-link" id="nav-ContactMap-tab" data-bs-toggle="tab"
                    data-bs-target="#nav-ContactMap" type="button" role="tab"
                    aria-controls="nav-ContactMap" aria-selected="false">
                    <h5>Google Maps</h5>
                  </button>
                </div>
              </nav>

              <div className="tab-content shadow-lg mt-5" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-ContactForm" role="tabpanel"
                  aria-labelledby="nav-ContactForm-tab">
                  <form className="custom-form contact-form mb-5 mb-lg-0" action="#" method="post"
                    role="form">
                    <div className="contact-form-body">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                          <input type="text" name="contact-name" id="contact-name"
                            className="form-control" placeholder="Full name" required />
                        </div>

                        <div className="col-lg-6 col-md-6 col-12">
                          <input type="email" name="contact-email" id="contact-email"
                            pattern="[^ @]*@[^ @]*" className="form-control"
                            placeholder="Email address" required />
                        </div>
                      </div>

                      <input type="text" name="contact-company" id="contact-company"
                        className="form-control" placeholder="Company" required />

                      <textarea name="contact-message" rows="3" className="form-control"
                        id="contact-message" placeholder="Message"></textarea>

                      <div className="col-lg-4 col-md-10 col-8 mx-auto">
                        <button type="submit" className="form-control">Send message</button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="tab-pane fade" id="nav-ContactMap" role="tabpanel"
                  aria-labelledby="nav-ContactMap-tab">
                  <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3456853358566!2d7.056821773041316!3d6.218063326641412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043830c5d178e93%3A0x3305b6015697a207!2sThe%20Lords%20Brethren%20Place%2C%20Awka!5e0!3m2!1sen!2sng!4v1703920380110!5m2!1sen!2sng" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default App
