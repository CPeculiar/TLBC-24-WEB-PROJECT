import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/MoreStyling.css'; 

const Redirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(20);
  const { paymentLink, reference, amount, category  } = location.state || {};
  

  useEffect(() => {
    if (!location.state) {
        // If there's no state, redirect to the registration page
        navigate('/register');
        return;
      }

    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      if (paymentLink) {
        window.location.href = paymentLink;
      }
    }, 20000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [paymentLink, location.state, navigate]);

  const handleManualRedirect = () => {
    if (paymentLink) {
      window.location.href = paymentLink;
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg" style={{maxWidth: '500px'}}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <div className="text-center">
            <p className="small">
            Your reference ID is <span className="fw-bold text-primary">{reference}</span>. <br /> 
            This will be used to authenticate your payment at the Registration point in the Convocation.
          </p>
          <p className="small mt-3">
            You will be redirected to the payment page where you are expected to pay the sum of <span className="fw-bold">₦{amount}</span> to
            register for TLBC 2024 as a <span className="fw-bold">{category}</span>.
          </p>
          <p className="small mt-3">
            Please do not refresh or close this page. You will be redirected in <span className="fw-bold">{countdown}</span> seconds.
          </p>
          <p className="small mt-3">
            If you are not automatically redirected, please{' '}
            <span 
                className="text-primary"
                style={{ cursor: 'pointer' }}
                onClick={handleManualRedirect}
              >
              click here
            </span>
          </p>
        </div>
      </div>
    </div>
    </div>
  );    
};

export default Redirect;
