import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Gallery from './Pages/Home/Gallery.jsx'
import Partners from './Pages/Home/Partners.jsx'
import Register from './Pages/Home/Register.jsx'
import PaymentStatus from './Pages/Payments/PaymentStatus.jsx'
import Redirect from './Pages/Payments/Redirect.jsx'
import PaymentSuccess from './Pages/Payments/PaymentSuccess.jsx'
import Layout4Chatbot from './Components/Layout4Chatbot.jsx'
import RetryPayment from './Pages/Payments/RetryPayment.jsx'
import AdminRoles from './Pages/Admin/AdminRoles.jsx'
import AdminConfirm from './Pages/Admin/AdminConfirm.jsx'
import AdminGetList from './Pages/Admin/AdminGetList.jsx'
import RegenerateLink from './Components/RegenerateLink.jsx'
import NotFound from './Pages/NotFound.jsx'
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
        path: "/PaySuccess",
        element: <PaymentSuccess />,
      },
      {
        path: "/RetryPayment",
        element: <RetryPayment />,
      },
      {
        path: "/Admin",
        element: <AdminRoles />,
      },
      {
        path: "/Adminconfirm",
        element: <AdminConfirm />,
      },
      {
        path: "/Admingetlist",
        element: <AdminGetList />,
      },
      {
        path: "/Regeneratelink",
        element: <RegenerateLink />,
      },
      {
        path: "*",
        element: <NotFound />,
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
