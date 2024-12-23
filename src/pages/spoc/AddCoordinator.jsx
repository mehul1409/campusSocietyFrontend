import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AddCoordinator = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hubName: "",
    coordinatorName: "",
    coordinatorEmail: "",
  });
  const token = localStorage.getItem('spocauthorize')

  const spocdetails = JSON.parse(localStorage.getItem('spocdetails'));
  const collegeId = spocdetails?.spoc?.collegeId?._id;  

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem('spocdetails');
    if (!storedDetails) {
      window.location.href = '/';
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    try {
      console.log("Token being sent:", token); 
      const response = await fetch("http://localhost:8003/spoc/createHub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
          "spocauthorize": token,
        },
        body: JSON.stringify({
          collegeId : collegeId,
          hubName: formData.hubName,
          coordinatorDetails: {
            name: formData.coordinatorName,
            email: formData.coordinatorEmail,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }

      setResponseMessage({
        type: "success",
        message: `Hub created successfully! Login credentials have been sent to the coordinator's email.`,
      });

      setFormData({
        hubName: "",
        coordinatorName: "",
        coordinatorEmail: "",
      });

      setTimeout(()=>{
        navigate('/spoc-dashboard');
      },2000)
    } catch (error) {
      setResponseMessage({
        type: "error",
        message: error.message || "An error occurred while creating the hub.",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Create a New Hub</h2>
      {responseMessage && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            color: responseMessage.type === "success" ? "green" : "red",
            border:
              responseMessage.type === "success"
                ? "1px solid green"
                : "1px solid red",
          }}
        >
          {responseMessage.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="hubName">Hub Name:</label>
          <input
            type="text"
            id="hubName"
            name="hubName"
            value={formData.hubName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="coordinatorName">Coordinator Name:</label>
          <input
            type="text"
            id="coordinatorName"
            name="coordinatorName"
            value={formData.coordinatorName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="coordinatorEmail">Coordinator Email:</label>
          <input
            type="email"
            id="coordinatorEmail"
            name="coordinatorEmail"
            value={formData.coordinatorEmail}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating Hub..." : "Create Hub"}
        </button>
      </form>
      <hr />
      <div className="mainLogoImage">
        <div className="aboveimage">
          "Join the Campus Society — Connect, Collaborate, and Grow Together!"
        </div>
        <img src="/mainLogo.png" alt="" />
        <div className="belowimage">
          "Proudly developed for the Campus Community with passion and dedication."
        </div>
      </div>
    </div>
  );
};

export default AddCoordinator;
