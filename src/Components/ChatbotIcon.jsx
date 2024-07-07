import React, { useState } from 'react';
import '../Styles/MoreStyling.css';

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = '2349134445037';
    const message = `Hello, my name is ${userData.fullName}, my email address is ${userData.email} and my number is ${userData.phoneNumber}. I'll like to chat with an admin as touching TLBC'24.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-modal">
          <button
            onClick={() => setIsOpen(false)}
            className="chatbot-close-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="chatbot-heading">Start a Live Chat</h3>
          <form onSubmit={handleSubmit} className="chatbot-form">
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="chatbot-input"
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="chatbot-input"
            />
            <input
              type="tel"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="chatbot-input"
            />
            <p className="chatbot-note">You will be redirected to WhatsApp to chat with our admin.</p>
            <button
              type="submit"
              className="chatbot-submit-button"
            >
              Start Conversation
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotIcon;
