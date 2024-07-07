import React from "react";
import ParticipantConfirm from "../Components/ParticipantConfirm";
import PartnerConfirm from "../Components/PartnerConfirm";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import '../Styles/MoreStyling.css'

function AdminConfirm() {

    return (
    <div>
    <Navbar />
    <h2 className="adminHeader mb-2 mt-4" style={{ fontSize: '2.5em', textAlign: 'center'  }}>Admin Payment confirmation portal </h2>
    <div className="confirm-container">
    <PartnerConfirm />
    <ParticipantConfirm />
</div>
    <Footer />
    
    
    </div>
  )
}

export default AdminConfirm