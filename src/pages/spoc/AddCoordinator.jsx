import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddCoordinator = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hubName: "",
    coordinatorName: "",
    coordinatorEmail: "",
  });

  const token = localStorage.getItem("spocauthorize");
  const spocdetails = JSON.parse(localStorage.getItem("spocdetails"));
  const collegeId = spocdetails?.spoc?.collegeId?._id || "";

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  useEffect(() => {
    if (!spocdetails) {
      window.location.href = "/";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    // Debugging: Ensure formData is correct
    console.log("Submitting form with data:", formData);

    if (!collegeId) {
      setResponseMessage({ type: "error", message: "College ID is missing." });
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("collegeId", collegeId);
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });

      if (file) {
        formDataToSend.append("photo", file);
      }

      // Debugging: Log FormData before sending
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await fetch("https://campussociety.onrender.com/spoc/createHub", {
        method: "POST",
        headers: {
          "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
          spocauthorize: token,
        },
        body: formDataToSend,
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

      setFile(null);

      setTimeout(() => {
        navigate("/spoc-dashboard");
      }, 2000);
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
            border: `1px solid ${responseMessage.type === "success" ? "green" : "red"}`,
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

        <div>
          <label className="post-event-label">Upload Event Image</label>
          <input
            className="post-event-input"
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
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
        <img src="/mainLogo.png" alt="Main Logo" />
        <div className="belowimage">
          "Proudly developed for the Campus Community with passion and dedication."
        </div>
      </div>
    </div>
  );
};

export default AddCoordinator;
