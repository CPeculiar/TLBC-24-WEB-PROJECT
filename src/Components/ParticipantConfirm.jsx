import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import axios from "axios";
import  '../Styles/MoreStyling.css'


const ParticipantConfirm = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);
  const [reference, setReference] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startScanning = () => {
    setIsScanning(true);
    setVerificationResult(null);
    setError(null);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  const handleScan = async (data) => {
    if (data) {
      stopScanning();
      try {
        const qrData = JSON.parse(data.text);
        const scannedReference = qrData.reference;
        setReference(scannedReference); // Set the reference from QR code
        await verifyParticipant(scannedReference);
      } catch (error) {
        console.error("Error verifying participant:", error);
        setError(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Code scanning error:", err);
    setError("Error scanning QR code");
  };

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

  const verifyParticipant = async (ref) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://lord-s-brethren-payment.onrender.com/api/participant/${ref}/`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN": getCookie("csrftoken"),
          },
        }
      );
      setVerificationResult({ ...response.data, reference: ref });
      setReference(ref); 
    } catch (error) {
      console.error("Error verifying participant:", error);
      setError(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setVerificationResult(null);
    setIsLoading(true);
    try {
        await verifyParticipant(reference);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
};

  const goHome = () => {
    setVerificationResult(null);
    setError(null);
    setReference("");
    setIsScanning(false);
  };

  if (verificationResult) {
    const {
        firstname,
        lastname,
        email,
        phone,
        address,
        category,
        church_name,
        attendance_mode,
        was_participant,
        health_issue,
        has_paid,
      } = verificationResult;
  
    return (
      <div className="container">
        <div className="card mx-auto my-4" style={{ maxWidth: "500px" }}>
          <div className="card-body">
            <h3 className="card-title text-center mb-3" style={{ color: "green", fontSize: '2.3em',  }}>Participant Details:</h3>
            <p>
              <strong>Payment Status:{" "}
              {has_paid ? "PAID" : "NOT PAID"}
              </strong>
            </p>
            <p>
              <strong>Reference: {reference}</strong>
            </p>
            <p><strong>Name:</strong> {firstname} {lastname}</p>
            <p><strong>Phone Number:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Church Name:</strong> {church_name}</p>
            <p><strong>Attendance Mode:</strong> {attendance_mode}</p>
            <p><strong>Attended Before?:</strong> {was_participant ? "Yes" : "No"}</p>
            <p><strong>Health Issue:</strong> {health_issue ? health_issue : "None"}</p>
            <div className="d-flex justify-content-center mt-3">
            <button onClick={goHome} className="btn custom-btn-green mt-3">
              Go Back
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card mx-auto my-4" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h2 className="card-title mb-4" style={{ fontSize: '2.5em', textAlign: 'center'  }}>Participant's Verification</h2>
          {!isScanning && (
            <>
            <div className="d-flex justify-content-center mt-3">
              <button onClick={startScanning} className="btn btn-primary mb-1">
                Scan QR Code
              </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="reference" className="form-label" style={{ fontSize: '1.8em', textAlign: 'center'  }}>
                    or <br />Enter your Reference ID:
                  </label>
                  <input
                    type="text"
                    id="reference"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="d-flex justify-content-center mt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary"
                >
                  {isLoading ? "Verifying..." : "Verify Transaction"}
                </button>
                </div>
              </form>
            </>
          )}
          {isScanning && (
            <div>
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
              <div className="d-flex justify-content-center mt-3">
              <button onClick={stopScanning} className="btn btn-danger mt-3">
                Stop Scanning
              </button>
              </div>
            </div>
          )}
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              <strong>Error!</strong> {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantConfirm;
