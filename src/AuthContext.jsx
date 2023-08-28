import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the authentication token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    }
  }, []); // Empty dependency array to run this effect only once

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
