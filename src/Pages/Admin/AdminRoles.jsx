import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const AdminRoles = () => {
  const roles = [
    { name: "Payment confirmation (Scan)", path: "/Adminconfirm" },
    { name: "Get full list of Registrations and Partnerships", path: "/Admingetlist" }, 
    { name: "Regenerate Payment Link", path: "/Regeneratelink" }
  ];

  return (
    <>
    <Navbar />

    <div className="container-fluid bg-light min-vh-100 d-flex flex-column">
      <header className="text-center py-5">
        <h1 className="display-4 text-black fw-bold">Admin Roles</h1>
      </header>
      <main className=" d-flex align-items-center justify-content-center">
        <div className="d-grid gap-4 col-10 col-md-8 col-lg-6">
          {roles.map((role, index) => (
            <Link 
              key={index} 
              to={role.path} 
              className="btn btn-primary btn-lg shadow-sm"
            >
              {role.name}
            </Link>
          ))}
        </div>
      </main>
    </div>
    
    <Footer />
    </>
  );
};

export default AdminRoles;