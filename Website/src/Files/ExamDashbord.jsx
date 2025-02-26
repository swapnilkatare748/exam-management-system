import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const ExamDashbord = () => {

    const isLoggedIn = "true";

    return isLoggedIn==="true" ? <Outlet/> : <Navigate to="./login"/>;
}

export default ExamDashbord
