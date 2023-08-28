import React from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { authenticated } = useAuth();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleCreateClick = () => {
    // Check if the user is authenticated
    if (authenticated) {
      navigate("/create"); // Navigate to the create route
    } else {
      alert("Please login to access this feature."); // Display an alert if not authenticated
    }
  };

  return (
    <div className="navbar-header">
      <div>
        <h3>Task-Management</h3>
      </div>
      <div>
        <Link to="/" className="link">
          Home
        </Link>
        <span className="link" onClick={handleCreateClick}>
          Create
        </span>
      </div>
      <div>
        {/* Display Register/Login link if not authenticated */}
        {!authenticated ? (
          <h5>
            <Link to="/register" className="link">
              Register/Login
            </Link>
          </h5>
        ) : <h5 className="success"> Login Successful</h5>}
      </div>
    </div>
  );
}

export default Navbar;
