import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentCard from '../../components/userCardComponet/Card';
import './Studentdashboard.css'; 
import imageSrc from '/carnival.png';

const Studentdashboard = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [spocDetails, setSpocDetails] = useState(null);
  const [hubs, setHubs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('studentauthorize');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      window.location.href = '/';
      return;
    }

    const studentdetails = localStorage.getItem('studentdetails');
    if (studentdetails) {
      const parsedDetails = JSON.parse(studentdetails);
      setStudentDetails(parsedDetails);

      const spocId = parsedDetails?.student?.collegeId?.spocId;
      if (spocId) {
        fetchData(spocId);
      } else {
        setErrorMessageWithTimeout('Invalid student details.');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchData = async (spocId) => {
    try {
      const [spocResponse, hubsResponse] = await Promise.all([
        fetch(`https://campussociety.onrender.com/spoc/getSpocById/${spocId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
            "spocauthorize": token,
          },
        }),
        fetch('https://campussociety.onrender.com/api/getAllHubs', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
            "studentauthorize": token,
          },
        }),
      ]);

      if (spocResponse.ok && hubsResponse.ok) {
        const spocDetails = await spocResponse.json();
        const hubs = await hubsResponse.json();
        console.log(hubs);
        setSpocDetails(spocDetails);
        setHubs(hubs);
      } else {
        setErrorMessageWithTimeout('Failed to fetch data from server.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessageWithTimeout('An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
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

  const handleHubClick = (coordinatorId) => {
    window.scrollTo(0, 0);
    navigate(`/hub/${coordinatorId}/events`);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <StudentCard
        name={studentDetails.student.name}
        email={studentDetails.student.email}
        college={studentDetails.student.collegeId.collegeName}
        imageSrc={imageSrc}
        spocName={spocDetails?.name || 'N/A'}
        collegeLocation={studentDetails.student.collegeId.location}
      />

      <h2>All Hubs</h2>
      <div className="hub-cards-container">
  {hubs.length > 0 ? (
    hubs.map((hub) => (
      <div key={hub._id} className="hub-card" onClick={() => handleHubClick(hub.coordinatorId._id)}>
        <img
          src={hub.photo || '/carnival.png'}
          alt={hub.hubName}
          className="hub-images"
        />
        <div>
        <h3>{hub.hubName}</h3>
        <p>Coordinator Name: {hub.coordinatorId?.name}</p>
        </div>
      </div>
    ))
  ) : (
    <p>No hubs available.</p>
  )}
</div>

    </div>
  );
};

export default Studentdashboard;
