import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import axios from "axios";

const PartnerConfirm = () => {
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
        const reference = qrData.reference;
        await verifyParticipant(reference);
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

  const verifyParticipant = async (reference) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://lord-s-brethren-payment.onrender.com/api/partner/${reference}/`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN": getCookie("csrftoken"),
          },
        }
      );
      setVerificationResult({ ...response.data, reference });
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
    return (
      <div className="container">
        <div className="card mx-auto my-4" style={{ maxWidth: "500px" }}>
          <div className="card-body">
            <h3 className="card-title mb-3">Participant Details:</h3>
            <p>
              <strong>Payment Status:</strong>{" "}
              {verificationResult.has_paid ? "PAID" : "NOT PAID"}
            </p>
            <p>
              <strong>Reference:</strong> {verificationResult.reference}
            </p>
            <p>Name: {verificationResult.name}</p>
            <p>Phone Number: {verificationResult.phone}</p>
            <p>Email: {verificationResult.email}</p>
            <p>Country: {verificationResult.country}</p>
            <p>State: {verificationResult.state}</p>
            <p>Category: {"Partner"}</p>
            <div className="d-flex justify-content-center mt-3">
            <button onClick={goHome} className="btn btn-primary mt-3">
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
          <h2 className="card-title mb-4" style={{ fontSize: '2.5em', textAlign: 'center'  }}>Partner's Verification</h2>
          {!isScanning && (
            <>
            <div className="d-flex justify-content-center mt-3">
              <button onClick={startScanning} className="btn btn-primary mb-3">
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

export default PartnerConfirm;
