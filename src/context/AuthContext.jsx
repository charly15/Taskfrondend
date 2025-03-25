import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = token ? JSON.parse(localStorage.getItem("user")) : null;

    if (userData) {
      
      setUser(userData);
    }
  }, []); 


  const login = (token, userData) => {
    
    const { userId, email, role } = userData;
    
  
    const userToSave = { userId, email, role };

    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userToSave)); 
    
    setUser(userToSave);

    
    navigate("/dashboard");
  };

  
  const logout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    
    setUser(null);

    
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
