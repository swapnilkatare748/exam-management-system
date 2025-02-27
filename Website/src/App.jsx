import React from 'react'
import './App.css';
import { BrowserRouter , Routes, Route, Link } from 'react-router-dom';
import Homepage from './Pages/HomePage/Homepage.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import ThemeToggel from './Components/ThemeToggle/ThemeToggel';
// import SignUPpage from './Pages/SignUpPage/SignUPpage.jsx';
import LoginPage from './Pages/Loginpage/LoginPage.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Setting from './Pages/AdminePages/SettingPage/Setting.jsx';
// import ExamPanel from './Components/HomeComponents/ExamPanel/ExamPanel.jsx';
import AdmineDashbord from './Files/AdmineDashbord.jsx';
import ExamDashbord from './Files/ExamDashbord.jsx';
import ViewExamPage from './Pages/AdminePages/ViewExamPage/ViewExamPage.jsx';
import AddQuationsPage from './Pages/AdminePages/AddQuationsPage/AddQuationsPage.jsx';
import UsersPage from './Pages/AdminePages/UsersPage/UsersPage.jsx';
import { Navigate } from 'react-router-dom';
  
// admine pages 

import AddUsers from './Pages/AdminePages/AddUsers/AddUsers.jsx';
import AddExamPage from './Pages/AdminePages/AddExamPage/AddExamPage.jsx';
import ViewQutionsPage from './Pages/AdminePages/ViewQutionsPage/ViewQutionsPage.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const userType = localStorage.getItem("userRole");

  console.log("ProtectedRoute - LoggedIn:", isLoggedIn);
  console.log("ProtectedRoute - UserType:", userType);
  console.log("Allowed Roles:", allowedRoles); // Check allowedRoles array

  // Check if user is logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


function App() {
  return (
    <div className='App'>
      {/* <Navbar/>  */}
       <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          {/* <Route path='/signUp' element={<SignUPpage/>}/> */}
          
                 
          {/* Protected routes */}
       
         <Route
          path="/exam"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <ExamDashbord />
            </ProtectedRoute>
          }
        >
          <Route index element={<ExamPanel />} />
          <Route path='dashboard' element={<ExamPanel />} />

          <Route path="/exam/:section/:page" element={<Homepage />} />
          <Route path='settings' element={<Setting/>}/>

           </Route>

          {/**addmin dash bord  */}
          <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdmineDashbord />
            </ProtectedRoute>
          }
        >
          <Route index element={<Homepage />} />
          <Route path='dashboard' element={<Homepage />} />
          <Route path='add-user' element={<AddUsers/>}/>
          <Route path='add-exam' element={<AddExamPage/>}/>
          <Route path='view-exams' element={<ViewExamPage/>}/>
          <Route path='add-question' element={<AddQuationsPage/>}/>
          <Route path='settings' element={<Setting/>}/>
          <Route path='view-users' element={<UsersPage/>}/>
           <Route path='view-questions' element={<ViewQutionsPage/>}/>
        </Route>

          {/* <Route path='/home' element={<Homepage/>}/>
          <Route path="/path" element={<ExamPanel/>}/> */}
       </Routes>
       {/* <Footer/> */}
    </div>
  )
}

export default App
