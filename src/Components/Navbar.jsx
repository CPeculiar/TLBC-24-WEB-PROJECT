import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function Navbar() {
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">
                <Link className="navbar-brand" to={`/`}>
                    TLBC
                </Link>
    
                <Link to={`/Register`} className="btn custom-btn d-lg-none ms-auto me-4">Register</Link>
    
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav align-items-lg-center ms-auto me-lg-5">
                        <li className="nav-item">
                            <Link className="nav-link click-scroll" to={`/`}>Home</Link>
                        </li>
    
                        <li className="nav-item">
                            <Link className="nav-link click-scroll" to={`/Gallery`}>Gallery</Link>
                        </li>
    
                        <li className="nav-item">
                            <Link className="nav-link click-scroll" to={`/Register`}>Register</Link>
                        </li>
    
                        <li className="nav-item">
                            <Link className="nav-link click-scroll" to={`/Partners`}>Partner with us</Link>
                        </li>
                    </ul>
                    {/* <Link to={`/Register`} className="btn custom-btn d-lg-block d-none">sign In</Link> */}
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar