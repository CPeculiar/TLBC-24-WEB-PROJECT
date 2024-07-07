import React from 'react';
import { Outlet } from 'react-router-dom';
import ChatbotIcon from './ChatbotIcon';
import ScrollToTop from './ScrollToTop';

function Layout4Chatbot() {
  return (
    <div>
    <Outlet />
    <ChatbotIcon />
    <ScrollToTop />

    
    </div>
  )
}

export default Layout4Chatbot