import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Country, State } from "country-state-city";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import "../../Styles/OtherStyles.css";

const Partner = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currency: "NGN",
    amount: "",
    country: "",
    state: "",
    callback_url: `${window.location.origin}/PaymentStatus`,
  });

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone validation (allowing for international numbers)
    const phoneRegex = /^\+?[0-9\s\-()]+$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    // State validation
    if (!formData.state) {
      newErrors.state = "State is required";
    }

    // Amount validation
    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      newErrors.amount = "Enter a valid amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error for this field as the user types
    setErrors({ ...errors, [name]: "" });
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(country.value));
    setSelectedState(null);
    setFormData({ ...formData, country: country.label, state: "" });
    setErrors({ ...errors, country: "", state: "" });
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setFormData({ ...formData, state: state.label });
    setErrors({ ...errors, state: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://lord-s-brethren-payment.onrender.com/api/partner/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN": getCookie("csrftoken"),
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData= await response.json();

      if (!response.ok) {
       // Parse error messages
      let errorMessage = "";
      for (const [field, messages] of Object.entries(responseData)) {
        if (Array.isArray(messages)) {
          errorMessage += ` ${messages.join(", ")}\n`;
          // errorMessage += `${field}: ${messages.join(", ")}\n`;
        }
      }
      throw new Error(errorMessage || "An error occurred");
    }

    console.log("Form Submission successful:", responseData);


      if (responseData.status === "success" && responseData.link) {
        // Redirect to the link obtained from the response
        window.location.href = responseData.link;
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error details:", error);
      alert("An error occurred: " + error.message);
    } finally {
      setIsLoading(false);
    }
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

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const statesOptions = states.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  return (
    <>
      <Navbar />

      <section className="hero-section" id="section_1">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="">
            <div className="col-12 mt-4 mb-5 text-center">
              <h2 className="text-white mb-1" id="annual">
                Partner with us
              </h2>
              <p className="text-white">
                We are excited to have you consider being our partner for The
                Lord's Brethren Convocation 2024. Together, we are going to
                deliver an amazing convocation experience this year. Your
                partnership with us is a partnership with the gospel of Jesus
                Christ, as it gears towards reaching the world with the message
                of His saving Grace and the building up of the saints for the
                work of the ministry. We look forward to collaborating with you
                in making this year's Convocation a successful one. Kindly use
                the form below to submit your details and our team will get to
                you shortly. Thank you, God has blessed you!
              </p>
              <p className="text-white">
                {" "}
                If you have previously filled out and submitted this form but
                were unable to complete the payment process,
                <br />
                please click{" "}
                <Link
                  to={`/Regeneratelink`}
                  style={{ textDecoration: "none" }}
                  onClick={(event) =>
                    handleRegenerateLinkClick(event, "/Regeneratelink")
                  }
                >
                  here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="registration-container">
        <div className="register-form">
          <form id="registration-form" method="post" onSubmit={handleSubmit}>
            <h2>Partnership Form</h2>
            <div className="form-group name">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
              />
             {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group email">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group phone">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="form-group country" id="country">
              <label htmlFor="country">Country</label>
              <Select
                id="country"
                name="country"
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                placeholder="Select your country"
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
                required
              />
              {errors.country && <span className="error">{errors.country}</span>}
            </div>
            <div className="form-group state" id="state">
              <label htmlFor="state">State</label>
              <Select
                id="state"
                name="state"
                options={statesOptions}
                value={selectedState}
                onChange={handleStateChange}
                placeholder="Select your state"
                isClearable
                isDisabled={!selectedCountry}
                className="react-select-container"
                classNamePrefix="react-select"
                required
              />
              {errors.state && <span className="error">{errors.state}</span>}
            </div>
            <div className="form-group currency" id="currency">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                name="currency"
                required
                value={formData.currency}
                onChange={handleInputChange}
              >
                <option value="NGN"> Naira</option>
                <option value="USD">USD</option>
                <option value="Euro">Euro</option>
                <option value="GBP">GBP</option>
                <option value="Yen">Yen</option>
                <option value="AUD">AUD</option>
              </select>
              {/* <span className="error" id="currency-error"></span> */}
            </div>
            <div className="form-group amount">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                required
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleInputChange}
              />
               {errors.amount && <span className="error">{errors.amount}</span>}
            </div>
            <div className="form-group submit submit-btn">
              <input
                type="submit"
                value={isLoading ? "Loading..." : "Submit"}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Partner;
