import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const studentToken = localStorage.getItem("studentauthorize");

    const isStudentAuthorized = !!studentToken; 

    return isStudentAuthorized ? element : <Navigate to="/" />;
};

export default PrivateRoute;
