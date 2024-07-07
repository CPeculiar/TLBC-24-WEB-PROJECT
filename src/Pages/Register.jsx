import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import TermsCheckbox from '../Components/TermsCheckbox';
import Footer from '../Components/Footer';
import '../Styles/OtherStyles.css';

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      gender: "",
      email: "",
      birthdate: "",
      phone: "",
      address: "",
      category: "",
      church_name: "",
      is_aware_of_convention: "",
      attendance_mode: "",
      was_participant: "",
      health_issue: "",
      reach: "",
      callback_url: `${window.location.origin}/PaymentStatus`,
    });

    const [errors, setErrors] = useState({});
  const [memberStatus, setMemberStatus] = useState("");
  const [campingStatus, setCampingStatus] = useState("");
  const [healthCondition, setHealthCondition] = useState("");

  const handleInputChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      ...(name === "category" && value === "Member" ? { church_name: "" } : {}),
    }));
    if (name === "category") {
      setMemberStatus(value);
    } else {
    }
  };

  const handleTermsAccepted = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleCampingChange = (e) => {
    const value = e.target.value;
    setCampingStatus(value);
    setFormData(prevState => ({
      ...prevState,
      attendance_mode: value === "No" ? "" : value
    }));
  };

  const handleHealthConditionChange = (e) => {
    const { value } = e.target;
    setHealthCondition(value);
    if (value === "false") {
      setFormData((prevState) => ({
        ...prevState,
        health_issue: "",
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        health_issue: "",
      }));
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    let isValid = true;

    if (!data.firstname) {
      newErrors.firstname = "Firstname is required";
      isValid = false;
    }

    if (!data.lastname) {
      newErrors.lastname = "Lastname is required";
      isValid = false;
    }

    if (!data.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    if (!validateEmail(data.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!data.birthdate) {
      newErrors.birthdate = "Birth Date is required";
      isValid = false;
    }

    if (!validatePhone(data.phone)) {
      newErrors.phone = "Invalid phone number";
      isValid = false;
    }

    if (!data.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    if (!data.category) {
      newErrors.category = "Membership status is required";
      isValid = false;
    }

    if (data.category === "Member" && !data.church_name) {
      newErrors.church_name = "Church Zone is required";
      isValid = false;
    }

    if (data.category === "Invitee" && !data.church_name) {
      newErrors.church_name = "Church Ministry name is required";
      isValid = false;
    }

    if (!data.is_aware_of_convention) {
      newErrors.is_aware_of_convention = "Awareness confirmation is required";
      isValid = false;
    }

    if (!data.attendance_mode) {
      newErrors.attendance_mode = "Camping intention is required";
      isValid = false;
    }

    if (!data.was_participant) {
      newErrors.was_participant = "Past attendance status is required";
      isValid = false;
    }

    if (!data.reach) {
      newErrors.reach = "This field is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
    setIsLoading(true);
    if (!validateForm(formData)) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://lord-s-brethren-payment.onrender.com/api/register/",
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
        const amount = formData.category === "Member" ? 5000 : 3000;
        navigate("/Redirect", {
          state: {
            paymentLink: data.link,
            reference: data.reference,
            amount: amount,
            category: formData.category,
          },
        });
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{11}$/;
    return re.test(String(phone));
  };



  return (
    <>
      <Navbar />

      <section className="hero-section" id="section_1">
        <div className="container d-flex justify-content-center align-items-center">
            <div className="">
                <div className="col-12 mt-4 mb-5 text-center">
                    <h2 className="text-white mb-1" id="annual">Register Now!!!</h2>
                    {/* <p class="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur saepe
                        quam recusandae totam delectus neque quia quasi maiores, sed quibusdam suscipit qui aut magni
                        obcaecati sint fuga minus a ea?</p> */}
                </div>
            </div>
        </div>
    </section>

    <section className="registration-container">
        <div className="register-form">
            <form id="registration-form" method="post" onSubmit={handleSubmit}>
                <h2>Registration Form</h2>
                <div className="form-group firstname">
                    <label htmlFor="firstname">Firstname</label>
                    <input 
                    type="text" 
                    id="firstname" 
                    name="firstname" 
                    placeholder="Enter your firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    />
                    <span className="error" id="firstname-error">{errors.firstname}</span>
                </div>
                <div className="form-group lastname">
                    <label htmlFor="lastname">Lastname</label>
                    <input 
                    type="text" 
                    id="lastname" 
                    name="lastname" 
                    placeholder="Enter your lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    />
                    <span className="error" id="lastname-error">{errors.lastname}</span>
                </div>
                <div className="form-group gender">
                    <label htmlFor="gender">Gender</label>
                    <select 
                    id="gender" 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    >
                    <option value="" selected disabled>Select your gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    </select>
                    <span className="error" id="gender-error">{errors.gender}</span>
                </div>
                <div className="form-group email">
                    <label htmlFor="email">Email Address</label>
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                    <span className="error" id="email-error">{errors.email}</span>
                </div>
                <div className="form-group birth-date">
                    <label htmlFor="date">Birth Date</label>
                    <input 
                    type="date" 
                    id="date" 
                    name="birthdate" 
                    placeholder="Select your date"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    />
                    <span className="error" id="date-error">{errors.birthdate}</span>
                </div>
                <div className="form-group phone-number">
                    <label htmlFor="number">Phone Number</label>
                    <input 
                    type="tel" 
                    id="number" 
                    name="phone" 
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    />
                    <span className="error" id="number-error">{errors.phone}</span>
                </div>
                <div className="form-group address">
                    <label htmlFor="address">Address (Street, state, country)</label>
                    <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleInputChange}
                    />
                    <span className="error" id="address-error">{errors.address}</span>
                </div>
                <div className="form-group membership-status">
                    <label htmlFor="member">
                    Are you a member of The Lord's Brethren Church International?</label>
                    <select 
                    id="member" 
                    name="category"
                    value={formData.category}
                    onChange={(e) => {
                        handleInputChange(e);
                    }}
                    >
                        <option value="" selected disabled>Choose an option</option>
                        <option value="Member">Yes</option>
                        <option value="Invitee">No</option>
                    </select>
                    <span className="error" id="member-error">{errors.category}</span>
                </div>
                {memberStatus === "Member" && (
                <div className="form-group your-zone" id="is-member">
                    <label htmlFor="churchZone">Please state your Church or Zone</label>
                    <select 
                    type="text"
                    id="churchZone" 
                    name="church_name"
                    placeholder="Select your Zone"
                    value={formData.church_name}
                    onChange={handleInputChange}
                     >
                        <option value="" selected disabled>Select your zone</option>
                        <option value="Awka zone">Awka zone</option>
                        <option value="Nnewi zone">Nnewi zone</option>
                        <option value="Owerri zone">Owerri zone</option>
                        <option value="Ekwulobia zone">Ekwulobia zone</option>
                    </select>
                    <span className="error" id="churchZone-error">{errors.church_name}</span>
                </div>
                )}
                {memberStatus === "Invitee" && (
                <div className="form-group name-of-church" id="not-member">    
                    <label htmlFor="churchname">
                    What is the name of your Church/Ministry?</label>
                    <input 
                    type="text" 
                    id="churchname" 
                    name="church_name"
                    placeholder="What is the name of your Church?"
                    value={formData.church_name}
                    onChange={handleInputChange}
                    />
                    <span className="error" id="churchname-error">{errors.church_name}</span>
                </div>
                )}
                <div className="form-group are-you-aware">
                    <label htmlFor="areYouAware">
                    Are you aware that you are registering for a camp meeting?</label>
                    <select 
                    id="areYouAware" 
                    name="is_aware_of_convention"
                    value={formData.is_aware_of_convention}
                    onChange={handleInputChange}
                    >
                        <option value="" selected disabled>Select an option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <span className="error" id="areYouAware-error">{errors.is_aware_of_convention}</span>
                </div>
                <div className="form-group are-you-camping">
                    <label htmlFor="areYouCamping">
                    Do you intend to camp all through the Convocation?</label>
                    <select 
                    id="areYouCamping" 
                    name="attendance_mode"
                    value={campingStatus}
                    onChange={handleCampingChange}
                    >
                        <option value="" selected disabled>Choose an option</option>
                        <option value="Camper">Yes</option>
                        <option value="Daily">No</option>
                    </select>
                    <span className="error" id="areYouCamping-error">{errors.attendance_mode}</span>
                </div>
                {campingStatus === "Daily" && (
                <div className="form-group how-to-join" id="dailyOrStreamDiv">
                    <label htmlFor="dailyOrStream">How will you join the Convocation?</label>
                    <select 
                    id="dailyOrStream" 
                    name="attendance_mode" 
                    value={formData.attendance_mode}
                    onChange={handleInputChange}
                    >
                        <option value="" selected disabled>Choose an option</option>
                        <option value="Streamer">Live Streaming</option>
                        <option value="Daily">Daily Attendance</option>
                    </select>
                    <span className="error" id="dailyOrStream-error">{errors.attendance_mode}</span>
                </div>
                )}
                <div className="form-group was-participant">
                    <label htmlFor="haveyouAttendedBefore">
                    Have you attended The Convocation in the past?</label>
                    <select 
                    id="haveyouAttendedBefore" 
                    name="was_participant"
                    value={formData.was_participant}
                    onChange={handleInputChange}
                    >
                        <option value="" disabled>Choose an option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <span className="error" id="haveyouAttendedBefore-error">{errors.was_participant}</span>
                </div>
                <div className="form-group health-condition">
                    <label htmlFor="anyHealthCondition">
                    Do you have any health condition or physical disabilities?</label>
                    <select 
                    id="anyHealthCondition"
                    name="health_issue"
                    value={healthCondition}
                    onChange={(e) => {
                        handleInputChange(e);
                        handleHealthConditionChange(e);
                    }}
                    >
                        <option value="" selected disabled>Choose an option</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <span className="error" id="anyHealthCondition-error">{errors.health_issue}</span>
                </div>
                {healthCondition === "true" && (
                <div className="form-group health-condition" id="yourHealthConditionDiv">
                    <label htmlFor="yourHealthCondition">
                    Tell us about the condition briefly</label>
                    <input 
                    type="text" 
                    id="yourHealthCondition" 
                    name="health_issue" 
                    placeholder="state your health condition(s)"
                    value={formData.health_issue}
                    onChange={handleInputChange}
                    />
                    <span className="error" id="yourHealthCondition-error">{errors.health_issue}</span>
                </div>
                )}
                <div className="form-group reach">
                    <label htmlFor="reach">How did you hear about TLBC?</label>
                    <select 
                    id="reach" 
                    name="reach"
                    value={formData.reach}
                    onChange={handleInputChange}
                    >
                        <option value="" selected disabled>Choose an option</option>
                        <option value="Facebook">Facebook</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Church">Church Announcement</option>
                        <option value="Website">Website</option>
                        <option value="Friend">A friend</option>
                        <option value="Outreach">Outreach</option>
                    </select>
                    <span className="error" id="dailyOrStream-error">{errors.reach}</span>
                </div>
                     
                     <TermsCheckbox 
                        termsAccepted={termsAccepted}
                        handleTermsAccepted={handleTermsAccepted}
                        />

                <div className="form-group submit-btn">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    </section>

      <Footer />
    </>
  )
}

export default Register
