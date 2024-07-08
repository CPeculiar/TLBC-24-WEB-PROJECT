import React, { useState, useEffect } from 'react';
import axios from 'axios';


const GetAllPartners = () => {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
            `https://lord-s-brethren-payment.onrender.com/api/partner/${reference}/`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN": getCookie("csrftoken"),
          },
        }
      );
        setParticipants(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Participant Payment Details</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Church</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Gender</th>
              <th>Attendance Mode</th>
              <th>Health Status</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr key={index}>
                <td>{`${participant.firstname} ${participant.lastname}`}</td>
                <td>{participant.church_name}</td>
                <td>{participant.email}</td>
                <td>{participant.phone}</td>
                <td>{participant.category}</td>
                <td>{participant.gender}</td>
                <td>{participant.attendance_mode}</td>
                <td>{participant.health_issue || 'N/A'}</td>
                <td>
                  <span className={`badge ${participant.has_paid ? 'bg-success' : 'bg-danger'}`}>
                    {participant.has_paid ? 'PAID' : 'NOT PAID'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllPartners;