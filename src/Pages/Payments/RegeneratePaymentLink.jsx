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
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>
          To Regenerate a Payment Link
        </h1>

        <p>
          You will need to input your unique Reference number to be able to
          proceed directly to the payment section. If you already have your
          Reference number, please input it in the corresponding field below and
          submit, but if you cannot recall your Reference number, please enter
          the email address you used when filling the form earlier. This will
          retrieve your Reference number and display it to you. Afterwards, you
          should enter the Reference number in the appropriate field to proceed
          to payment.
        </p>

        <div style={{ textAlign: "center", margin: "10px 0" }}>
           Enter your Email address below
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            style={{ flex: 1, marginRight: "10px", padding: "5px" }}
          />
          <button
            onClick={verifyEmail}
            disabled={isEmailLoading}
            style={{ padding: "5px 10px" }}
          >
            {isEmailLoading ? "Loading..." : "Submit"}
          </button>
        </div>

        <div style={{ textAlign: "center", margin: "10px 0" }}>
          OR <br /> Enter your Reference Number below
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Enter your reference number"
            style={{ flex: 1, marginRight: "10px", padding: "5px" }}
          />
          <button
            onClick={submitReference}
            disabled={isReferenceLoading}
            style={{ padding: "5px 10px" }}
          >
            {isReferenceLoading ? "Loading..." : "Submit"}
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {verificationResult && (
          <div>
            <h2>Search Result</h2>
            <p>Please, find your Reference Number below</p>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid black", padding: "5px" }}>
                    Reference
                  </th>
                  <th style={{ border: "1px solid black", padding: "5px" }}>
                    Email
                  </th>
                  <th style={{ border: "1px solid black", padding: "5px" }}>
                    Phone
                  </th>
                  <th style={{ border: "1px solid black", padding: "5px" }}>
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {verificationResult.map((result, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      {result.reference}
                    </td>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      {result.email}
                    </td>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      {result.phone}
                    </td>
                    <td style={{ border: "1px solid black", padding: "5px" }}>
                      {result.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
