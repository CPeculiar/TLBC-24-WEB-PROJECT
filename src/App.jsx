import './App.css'
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import ContactSection from './Components/ContactSection.jsx';


function App() {

  return (
    <>
      <Navbar />

      <section className="hero-sectionn" id="section_1">
      <div className="video-container">
        <video autoPlay loop muted className="hero-video">
          <source src="/images/TLBC24Animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
        <div className="section-overlay"></div>

        <div className="container hero-content">
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
                    <a href="https://web.facebook.com/thelordsbrethrenchurchintl" className="social-icon-link" target='_blank'>

                      <span className="bi-facebook"></span>
                    </a>
                  </li>

                  <li className="social-icon-item">
                    <a href="https://www.youtube.com/@thelordsbrethrenchurchintl" className="social-icon-link" target='_blank'>
                      <span className="bi-youtube"></span>
                    </a>
                  </li>

                  <li className="social-icon-item">
                    <a href="https://www.instagram.com/elochukwutlbc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='_blank' className="social-icon-link">
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
                <h2 className="text-white mb-4">About TLBC</h2>

                <p className="text-white">The Lord's Brethren Convocation (TLBC) is an annual glorious homecoming of stakeholders in The Lord's Brethren Nation where we celebrate our partners, victories, joys, successes, conquests, coups and feats. It is an event that everyone who joined forces with our vision to push for the propagation of the Gospel always anticipate with joy and excitement every year.
                </p>

                <p className="text-white">It's a meeting that affords us the opportunity to celebrate our pastors, partners and ministry departments in grand style and also highlights all that has been achieved in the work of the ministry every year.</p>

                <p className="text-white">This year's convocation is going to feature moments of worship, teachings, impartation, awards and of course The Lord's Brethren Family meeting.</p>
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <div className="about-text-wrap">
                <img src="/images/_MG_8912.jpg" className="about-image img-fluid" />

                <div className="about-text-info d-flex">
                  <div className="d-flex">
                    <i className="about-text-icon bi-person"></i>
                  </div>


                  <div className="ms-2">
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
                  <img src="/images/_MG_7548.jpg"
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
                  <img src="/images/_MG_8003.jpg"
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
                  <img src="/images/_MG_8410.jpg"
                    className="artists-image img-fluid" />
                </div>

                <div className="artists-hover">
                  <p>
                    <strong>Prayers</strong>
                  </p>
                </div>
              </div>

              <div className="artists-thumb">
                <img src="/images/_MG_1546.jpg"
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

      <ContactSection />

      <Footer />
    </>
  )
}

export default App
