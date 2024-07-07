import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Gallery from './Pages/Gallery.jsx'
import Partners from './Pages/Partners.jsx'
import Register from './Pages/Register.jsx'
import PaymentStatus from './Pages/PaymentStatus.jsx'
import Redirect from './Pages/Redirect.jsx'
import AdminConfirm from './Pages/AdminConfirm.jsx'
import PaymentSuccess from './Pages/PaymentSuccess.jsx'
import Test from './Pages/Test.jsx'
import Layout4Chatbot from './Components/Layout4Chatbot.jsx'
import RetryPayment from './Pages/RetryPayment.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <Layout4Chatbot />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/Gallery",
        element: <Gallery />,
      },
      {
        path: "/Partners",
        element: <Partners />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/PaymentStatus",
        element: <PaymentStatus />,
      },
      {
        path: "/Redirect",
        element: <Redirect />,
      },
      {
        path: "/Admin",
        element: <AdminConfirm />,
      },
      {
        path: "/PaySuccess",
        element: <PaymentSuccess />,
      },
      {
        path: "/RetryPayment",
        element: <RetryPayment />,
      },
      {
        path: "/Test",
        element: <Test />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)






// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import Gallery from './Pages/Gallery.jsx'
// import Partners from './Pages/Partners.jsx'
// import Register from './Pages/Register.jsx'
// import PaymentStatus from './Pages/PaymentStatus.jsx'
// import Redirect from './Pages/Redirect.jsx'
// import AdminConfirm from './Pages/AdminConfirm.jsx'
// import PaymentSuccess from './Pages/PaymentSuccess.jsx'
// import ChatbotIcon from './Components/ChatbotIcon.jsx'
// import Test from './Pages/Test.jsx'
// import './index.css'

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/Gallery",
//     element: <Gallery />,
//   },
//   {
//     path: "/Partners",
//     element: <Partners />,
//   },
//   {
//     path: "/Register",
//     element: <Register />,
//   },
//   {
//     path: "/PaymentStatus",
//     element: <PaymentStatus />,
//   },
//   {
//     path: "/Redirect",
//     element: <Redirect />,
//   },
//   {
//     path: "/Admin",
//     element: <AdminConfirm />,
//   },
//   {
//     path: "/PaySuccess",
//     element: <PaymentSuccess />,
//   },

//   {
//     path: "/Test",
//     element: <Test />,
//   },
// ]);


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// )
