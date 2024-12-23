// import React, { useEffect, useState } from 'react';
// import StudentCard from '../../components/userCardComponet/Card';
// import imageSrc from '/mehulBansal.jpeg';

// const Studentdashboard = () => {
//   const [studentDetails, setStudentDetails] = useState(null);
//   const [spocDetails, setSpocDetails] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('studentauthorize');

//     if (!token) {
//       window.location.href = '/';
//     } else {
//       const studentdetails = localStorage.getItem('studentdetails');
//       if (studentdetails) {
//         setStudentDetails(JSON.parse(studentdetails));
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (studentDetails) {
//       const spocId = studentDetails.student.collegeId.spocId;
//       fetchSpocDetails(spocId);
//     }
//   }, [studentDetails]);

//   const fetchSpocDetails = async (spocId) => {
//     try {
//       if (!spocId) {
//         setErrorMessageWithTimeout('SPOC ID is required.');
//         return;
//       }

//       const response = await fetch(`http://localhost:8003/spoc/getSpocById/${spocId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         setErrorMessageWithTimeout(`Failed to fetch SPOC details: ${response.statusText}`);
//         return;
//       }

//       const spocDetails = await response.json();
//       setSpocDetails(spocDetails);
//     } catch (error) {
//       console.error('Error fetching SPOC details:', error);
//       setErrorMessageWithTimeout('An error occurred while fetching SPOC details.');
//     }
//   };

//   const setErrorMessageWithTimeout = (message) => {
//     setErrorMessage(message);
//     setTimeout(() => setErrorMessage(''), 2000); 
//   };

//   const setSuccessMessageWithTimeout = (message) => {
//     setSuccessMessage(message);
//     setTimeout(() => setSuccessMessage(''), 2000); 
//   };

//   if (!studentDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Student Dashboard</h1>
//       {successMessage && <div className="success-message">{successMessage}</div>}
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       <StudentCard
//         name={studentDetails.student.name}
//         email={studentDetails.student.email}
//         college={studentDetails.student.collegeId.collegeName}
//         hubName={spocDetails?.hubName || 'N/A'}
//         imageSrc={imageSrc}
//         spocName={spocDetails?.name || 'N/A'}
//       />
//     </div>
//   );
// };

// export default Studentdashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentCard from '../../components/userCardComponet/Card';
import './Studentdashboard.css'; // Import the CSS file for styling
import imageSrc from '/mehulBansal.jpeg';

const Studentdashboard = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [spocDetails, setSpocDetails] = useState(null);
  const [hubs, setHubs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const token = localStorage.getItem('studentauthorize');
  const navigate = useNavigate();

  useEffect(() => {
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

  useEffect(() => {
    fetchAllHubs();
  }, []);

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
          "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
          "spocauthorize": token,
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

  const fetchAllHubs = async () => {
    try {
      const response = await fetch('http://localhost:8003/api/getAllHubs', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
          "studentauthorize": token,
        },
      });

      if (!response.ok) {
        setErrorMessageWithTimeout(`Failed to fetch hubs: ${response.statusText}`);
        return;
      }

      const hubs = await response.json();
      setHubs(hubs);
    } catch (error) {
      console.error('Error fetching hubs:', error);
      setErrorMessageWithTimeout('An error occurred while fetching hubs.');
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
    navigate(`/hub/${coordinatorId}/events`);
  };

  if (!studentDetails) {
    return <div>Loading...</div>;
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
              <h3>{hub.hubName}</h3>
              <p>Coordinator Name: {hub.coordinatorId?.name}</p>
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
