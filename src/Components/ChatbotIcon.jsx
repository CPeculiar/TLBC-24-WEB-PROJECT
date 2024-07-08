import React, { useState } from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';

const ChatbotButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #FFD700;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  
  svg {
    width: 30px;
    height: 30px;
    color: white;
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 15px;
  }
`;

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
    <Container>
      <ChatbotButton onClick={() => setIsOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </ChatbotButton>

      <StyledModal show={isOpen} onHide={() => setIsOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Start a Live Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </Form.Group>
            <p className="text-muted small">You will be redirected to WhatsApp to chat with our admin.</p>
            <Button variant="primary" type="submit" className="w-100">
              Start Conversation
            </Button>
          </Form>
        </Modal.Body>
      </StyledModal>
    </Container>
  );
}; 

export default ChatbotIcon;






















// import React, { useState } from 'react';
// import '../Styles/MoreStyling.css';

// const ChatbotIcon = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [userData, setUserData] = useState({
//     fullName: '',
//     email: '',
//     phoneNumber: ''
//   });

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const whatsappNumber = '2349134445037';
//     const message = `Hello, my name is ${userData.fullName}, my email address is ${userData.email} and my number is ${userData.phoneNumber}. I'll like to chat with an admin as touching TLBC'24.`;
//     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
//     window.location.href = whatsappUrl;
//   };

//   return (
//     <div className="chatbot-container">
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="chatbot-button"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//           </svg>
//         </button>
//       )}

//       {isOpen && (
//         <div className="chatbot-modal">
//           <button
//             onClick={() => setIsOpen(false)}
//             className="chatbot-close-button"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//           <h3 className="chatbot-heading">Start a Live Chat</h3>
//           <form onSubmit={handleSubmit} className="chatbot-form">
//             <input
//               type="text"
//               name="fullName"
//               value={userData.fullName}
//               onChange={handleChange}
//               placeholder="Full Name"
//               required
//               className="chatbot-input"
//             />
//             <input
//               type="email"
//               name="email"
//               value={userData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               required
//               className="chatbot-input"
//             />
//             <input
//               type="tel"
//               name="phoneNumber"
//               value={userData.phoneNumber}
//               onChange={handleChange}
//               placeholder="Phone Number"
//               required
//               className="chatbot-input"
//             />
//             <p className="chatbot-note">You will be redirected to WhatsApp to chat with our admin.</p>
//             <button
//               type="submit"
//               className="chatbot-submit-button"
//             >
//               Start Conversation
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatbotIcon;
