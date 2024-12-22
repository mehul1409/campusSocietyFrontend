import React, { useEffect, useState } from 'react';
import StudentCard from '../../components/userCardComponet/Card';
import imageSrc from '/mehulBansal.jpeg';

const Studentdashboard = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [spocDetails, setSpocDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('studentauthorize');

    if (!token) {
      window.location.href = '/';
    } else {
      const studentdetails = localStorage.getItem('studentdetails');
      if (studentdetails) {
        setStudentDetails(JSON.parse(studentdetails));
      }
    }
  }, []);

  useEffect(() => {
    if (studentDetails) {
      const spocId = studentDetails.student.collegeId.spocId;
      fetchSpocDetails(spocId);
    }
  }, [studentDetails]);

  const fetchSpocDetails = async (spocId) => {
    try {
      if (!spocId) {
        setErrorMessageWithTimeout('SPOC ID is required.');
        return;
      }

      const response = await fetch(`http://localhost:8003/spoc/getSpocById/${spocId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        setErrorMessageWithTimeout(`Failed to fetch SPOC details: ${response.statusText}`);
        return;
      }

      const spocDetails = await response.json();
      setSpocDetails(spocDetails);
    } catch (error) {
      console.error('Error fetching SPOC details:', error);
      setErrorMessageWithTimeout('An error occurred while fetching SPOC details.');
    }
  };

  const setErrorMessageWithTimeout = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 2000); 
  };

  const setSuccessMessageWithTimeout = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 2000); 
  };

  if (!studentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Student Dashboard</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <StudentCard
        name={studentDetails.student.name}
        email={studentDetails.student.email}
        college={studentDetails.student.collegeId.collegeName}
        hubName={spocDetails?.hubName || 'N/A'}
        imageSrc={imageSrc}
        spocName={spocDetails?.name || 'N/A'}
      />
    </div>
  );
};

export default Studentdashboard;
