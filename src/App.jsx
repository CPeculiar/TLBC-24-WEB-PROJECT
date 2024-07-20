import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage.jsx';
import Gallery from './Pages/Home/Gallery.jsx';
import Register from './Pages/Home/Register.jsx';
import Partner from './Pages/Home/Partner.jsx';
import PaymentStatus from './Pages/Payments/PaymentStatus.jsx';
import Redirect from './Pages/Payments/Redirect.jsx';
import PaymentSuccess from './Pages/Payments/PaymentSuccess.jsx';
import AdminRoles from './Pages/Admin/AdminRoles.jsx';
import AdminConfirm from './Pages/Admin/AdminConfirm.jsx';
import RegeneratePaymentLink from './Pages/Payments/RegeneratePaymentLink.jsx';
import AdminGetList from './Pages/Admin/AdminGetList.jsx';
import NotFound from './Pages/NotFound.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import ChatbotIcon from './Components/ChatbotIcon.jsx';
import './index.css'
// import Layout4Chatbot from './Components/Layout4Chatbot.jsx';


const App = () => {

  return (
    <>
      <Router>
        <ScrollToTop />
        <ChatbotIcon />
        <Routes>

        <Route path="/" element={<HomePage />} /> 
          <Route path="/Home" element={<HomePage />} /> 
          <Route path="/Gallery" element={<Gallery />} /> 
          <Route path="/Register" element={<Register />} /> 
          <Route path="/Partner" element={<Partner />} /> 
          <Route path="/PaymentStatus" element={<PaymentStatus />} /> 
          <Route path="/Redirect" element={<Redirect />} /> 
          <Route path="/PaySuccess" element={<PaymentSuccess />} /> 
          <Route path="/Admin" element={<AdminRoles />} /> 
          <Route path="/Adminconfirm" element={<AdminConfirm />} /> 
          <Route path="/Regeneratelink" element={<RegeneratePaymentLink />} /> 
          <Route path="/Admingetlist" element={<AdminGetList />} /> 
          <Route path="*" element={<NotFound />} /> 

      </Routes> 
    </Router> 

    </> 

); 
}; 

export default App;
