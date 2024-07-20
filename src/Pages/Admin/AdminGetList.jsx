import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';


const ParticipantsAndPartners = () => {
    const [data, setData] = useState({ partners: [], participants: [] });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('participants');
    const [isPaid, setIsPaid] = useState(true);
  

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

      const fetchData = async (paid, type) => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `https://lord-s-brethren-payment.onrender.com/api/all-payment-data/?paid=${paid}&type=${type}`,
            {
              headers: {
                "Content-Type": "application/json",
                "X-CSRFTOKEN": getCookie("csrftoken"),
              },
            }
          );
          setData(response.data);
          setActiveTab(type);
          setIsPaid(paid);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error.response?.data?.message || error.message || "An error occurred");
        } finally {
          setIsLoading(false);
        }
      };
  
      const downloadPDF = () => {
        const items = activeTab === 'participants' ? data.participants : data.partners;
        
        if (items && items.length > 0) {
          const headers = Object.keys(items[0]);
          const tableData = items.map((item, index) => [
            index + 1,
            ...headers.map(header => String(item[header]))
          ]);

          // Calculate the optimal page size
    const longestRowLength = Math.max(...tableData.map(row => 
      row.reduce((sum, cell) => sum + (cell ? cell.toString().length : 0), 0)
    ));
    const estimatedWidth = longestRowLength * 5 + 40; // 5 pixels per character + margin
    const pageWidth = Math.max(estimatedWidth, 297); // A4 width in mm (297mm), or larger if needed
    const pageHeight = 210; // A4 height in mm

    const doc = new jsPDF({
      orientation: pageWidth > pageHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [pageWidth, pageHeight]
    });

    const title = `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} List (${isPaid ? 'Paid' : 'Not Paid'})`;

    doc.autoTable({
      head: [['#', ...headers]],
      body: tableData,
      startY: 20,
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      bodyStyles: { textColor: 0 },
      alternateRowStyles: { fillColor: [242, 242, 242] },
      columnStyles: {
        0: { cellWidth: 10 }, // Adjust the width of the '#' column
      },
      styles: {
        cellPadding: 2,
        fontSize: 8,
        overflow: 'linebreak',
        cellWidth: 'auto',
      },
      margin: { top: 20 },
      didDrawPage: (data) => {
        doc.setFontSize(18);
        doc.text(title, 14, 20);
      },
    });

    const fileName = `${activeTab}_${isPaid ? 'paid' : 'not_paid'}_${new Date().toISOString()}.pdf`;
    doc.save(fileName);
  }
};

      const renderTable = () => {
        const items = activeTab === 'participants' ? data.participants : data.partners;
        if (!items || items.length === 0) return <p>No data available.</p>;
    
        const headers = Object.keys(items[0]);
    

        return (
          
            <div className="table-responsive" style={{ marginRight: '5px' }}>
            <table className="table table-striped table-bordered mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {headers.map((header, headerIndex) => (
                      <td key={headerIndex}>{String(item[header])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          );
        };
      
        return (
          <>
          <Navbar />
          <div className="container mt-5">
            <h1 className="mb-4" style={{textAlign: 'Center'}}>Get Full List of Participants and Partners</h1>
            <div className="row mb-4">
              <div className="col-6">
                <button 
                  className="btn btn-primary w-100" 
                  onClick={() => fetchData(true, 'participants')}
                  disabled={isLoading}
                >
                  Participants (Paid)
                </button>
              </div>
              <div className="col-6">
                <button 
                  className="btn btn-secondary w-100" 
                  onClick={() => fetchData(false, 'participants')}
                  disabled={isLoading}
                >
                  Participants (Not Paid)
                </button>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <button 
                  className="btn btn-success w-100" 
                  onClick={() => fetchData(true, 'partners')}
                  disabled={isLoading}
                >
                  Partners (Paid)
                </button>
              </div>
              <div className="col-6">
                <button 
                  className="btn btn-warning w-100" 
                  onClick={() => fetchData(false, 'partners')}
                  disabled={isLoading}
                >
                  Partners (Not Paid)
                </button>
              </div>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {renderTable()}
            {(data.participants.length > 0 || data.partners.length > 0) && (
          <div className="text-center mt-3">
            <button 
              className="btn btn-success" 
              onClick={downloadPDF}
            >
              Click to Download
            </button>
          </div>
        )}
          </div>
          <Footer />
          </>
        );
      };
      
      export default ParticipantsAndPartners;
      