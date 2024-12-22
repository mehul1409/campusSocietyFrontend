import React, { useState } from "react";
import axios from "axios";

const AddCoordinator = () => {
  const [formData, setFormData] = useState({
    collegeId: "",
    hubName: "",
    coordinatorName: "",
    coordinatorEmail: "",
  });
  const token = localStorage.getItem('spocauthorize')

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);
    
    try {
      const response = await fetch("http://localhost:8003/spoc/createHub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
          "spocauthorize": token,
        },
        body: JSON.stringify({
          collegeId: formData.collegeId,
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
  
      const data = await response.json();
      setResponseMessage({
        type: "success",
        message: `Hub created successfully! Hub ID: ${data.hubId}. Login credentials have been sent to the coordinator's email.`,
      });
  
      // Clear the form
      setFormData({
        collegeId: "",
        hubName: "",
        coordinatorName: "",
        coordinatorEmail: "",
      });
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
      <form onSubmit={handleSubmit}>
        {/* College ID */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="collegeId">College ID:</label>
          <input
            type="text"
            id="collegeId"
            name="collegeId"
            value={formData.collegeId}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* Hub Name */}
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

        {/* Coordinator Name */}
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

        {/* Coordinator Email */}
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

        {/* Submit Button */}
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

      {/* Response Message */}
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
    </div>
  );
};

export default AddCoordinator;
