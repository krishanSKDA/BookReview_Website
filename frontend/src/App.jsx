import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/Homepage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Review from "./components/Review";
import AddEditReview from "./components/AddEditReview";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 
  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      setIsAuthenticated(true); 
    }
  }, []);

  

 
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;  
  };

  return (
    <Router>
      <div>
        {/* Define routes for Home, Login, and Register */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<RegisterForm setIsAuthenticated={setIsAuthenticated} />} />
          
          {/* Protected routes */}
          <Route path="/reviews" element={<ProtectedRoute element={<Review />} />} />
          <Route path="/edit" element={<ProtectedRoute element={<AddEditReview />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
