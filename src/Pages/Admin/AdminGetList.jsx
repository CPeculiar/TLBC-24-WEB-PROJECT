import React from "react";
import GetAllParticipant from '../../Components/GetAllParticipant';
import GetAllPartners from '../../Components/GetAllPartners';
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import '../../Styles/MoreStyling.css'
import PartnerConfirm from "../../Components/PartnerConfirm";
import ParticipantConfirm from "../../Components/ParticipantConfirm";

function AdminGetList() {

    return (
    <div>
    <Navbar />
    <h2 className="adminHeader mb-2 mt-4" style={{ fontSize: '2.5em', textAlign: 'center'  }}>Admin Get List of Successful Payments </h2>
    <div className="confirm-container">
    <PartnerConfirm />
    <ParticipantConfirm />
</div>
    <Footer />
    
    
    </div>
  )
}

export default AdminGetList;