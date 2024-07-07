import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import successIcon from "/public/imagess/success3.svg";
import cancelledIcon from "/public/imagess/cancel.png";
import logo from "/public/imagess/TLBC24Logo2.png";


const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [txRef, setTxRef] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    console.log('Location search:', location.search);
    const query = new URLSearchParams(location.search);
    console.log('Query params:', Object.fromEntries(query));
    setStatus(query.get("status") || "");
    setTxRef(query.get("tx_ref") || "");
    setReferenceId(query.get("reference") || "");
    setTransactionId(query.get("transaction_id") || "");
  }, [location.search]);


  const handleClose = () => {
    const baseUrl = `${window.location.origin}/PaySuccess`;
    const queryParams = `?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`;
    if (["successful", "completed", "success"].includes(status.toLowerCase())) {
      window.location.replace(`${baseUrl}${queryParams}`);
    } else {
      navigate("/RetryPayment");
    }
  };

  const isSuccessful = status && ["successful", "completed", "success"].includes(status.toLowerCase());
  console.log('isSuccessful:', isSuccessful);

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
    
      <div className="bg-white p-5 rounded shadow-lg text-center">
        <img src={logo} alt="Logo" className="w-25 h-25 mx-auto mb-4" />
        {isSuccessful ? (
          <>
            <div className="d-flex justify-content-center mb-4">
              <img
                src={successIcon}
                alt="Success"
                className="w-25 h-25"
              />
            </div>
            <h2 className="h2 fw-bold text-success">
              Payment Successful
            </h2>
            <div className="mt-4 text-start">
              <p className="mb-3">
                <strong className="fw-semibold">
                 Your Transaction Reference:
                </strong>{" "}
                {txRef}
              </p>
              <p>
                Thank you for registering for TLBC 2024.
              </p>
              <p className="text-center mt-2">Blessings!</p>
            </div>
            <button
              onClick={handleClose}
              className="mt-4 btn btn-success"
            >
              Close
            </button>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center mb-4">
              <img
                src={cancelledIcon}
                alt="cancelled"
                className="w-25 h-25"
                style={{ filter: "invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)" }}
              />
            </div>
            <h2 className="h2 fw-bold mb-2 text-danger">
              Payment cancelled!
            </h2>
            <p>
              Please try again or contact <br />
              us on +2349134445037, <br /> if you are experiencing any problem.
            </p>
            {status === "cancelled" && (
              <p className="mt-3 text-center">
              <strong className="fw-semibold">
                  Your Transaction Reference:
                </strong>{" "}
                {txRef}
              </p>
            )}
            <button
              onClick={handleClose}
              className="mt-4 btn btn-danger"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
