import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const PaymentPage = () => {
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isReferenceLoading, setIsReferenceLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const verifyEmail = async () => {
    if (!email) {
      setError("Please enter an email address.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    setIsEmailLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://lord-s-brethren-payment.onrender.com/api/search/${email}/`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN": getCookie("csrftoken"),
          },
        }
      );
      if (response.data && response.data.length > 0) {
        setVerificationResult(response.data);
      } else {
        setError("Email not found.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setError(
        "An error occurred while verifying the email. Please try again."
      );
    } finally {
      setIsEmailLoading(false);
    }
  };

  const submitReference = async () => {
    if (!reference) {
      setError("Please enter a reference number.");
      return;
    }

    setIsReferenceLoading(true);
    setError(null);
    const formData = {
      callback_url: `${window.location.origin}/PaymentStatus`,
      reference: reference,
    };

    try {
      const response = await fetch(
        "https://lord-s-brethren-payment.onrender.com/api/generate-payment-link/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN": getCookie("csrftoken"),
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        window.location.href = data.link;
      } else {
        throw new Error(data.message || "Invalid Reference Number.");
      }
    } catch (error) {
      console.error("Error details:", error);
      setError(
        error.message ||
          "An error occurred while generating the payment link. Please try again."
      );
    } finally {
      setIsReferenceLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-header bg-dark text-white">
                <h1 className="text-center mb-0">Regenerate Payment Link</h1>
              </div>
              <div className="card-body">
                <p className="lead text-muted">
                  Input your unique Reference number to proceed directly to payment. If you can't recall it, enter your email address to retrieve it.
                </p>

                <div className="mb-4">
                  <h5 className="text-center">Enter your Email address</h5>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your registered email"
                    />
                    <button
                      className="btn btn-outline-dark"
                      onClick={verifyEmail}
                      disabled={isEmailLoading}
                    >
                      {isEmailLoading ? 
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                        "Submit"
                      }
                    </button>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <span className="text-muted">OR</span>
                </div>

                <div className="mb-4">
                  <h5 className="text-center">Enter your Reference Number</h5>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="Enter your reference number"
                    />
                    <button
                      className="btn btn-dark"
                      onClick={submitReference}
                      disabled={isReferenceLoading}
                    >
                      {isReferenceLoading ? 
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                        "Submit"
                      }
                    </button>
                  </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {verificationResult && (
                  <div className="mt-4">
                    <h2 className="text-center mb-3">Search Result</h2>
                    <p className="text-center">Please, find your Reference Number below</p>
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                          <tr>
                            <th>Reference</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {verificationResult.map((result, index) => (
                            <tr key={index}>
                              <td>{result.reference}</td>
                              <td>{result.email}</td>
                              <td>{result.phone}</td>
                              <td>{result.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        :root {
          --gold: #FFD700;
          --black: #000000;
          --white: #FFFFFF;
        }
        .card {
          border-color: var(--gold);
        }
        .card-header {
          background-color: var(--black) !important;
          color: var(--gold) !important;
        }
        .btn-dark {
          background-color: var(--black);
          border-color: var(--gold);
          color: var(--gold);
        }
        .btn-dark:hover {
          background-color: var(--gold);
          color: var(--black);
        }
        .btn-outline-dark {
          color: var(--black);
          border-color: var(--black);
        }
        .btn-outline-dark:hover {
          background-color: var(--black);
          color: var(--gold);
        }
        .thead-dark {
          background-color: var(--black);
          color: var(--gold);
        }
      `}</style>
    </>
  );
};

export default PaymentPage;