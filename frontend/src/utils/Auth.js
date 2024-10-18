import React, { createContext, useContext, useState } from 'react'; // Import the createContext, useContext, and useState hooks from React

const AuthContext = createContext(); // Create an AuthContext object

// Define the AuthProvider component to manage user authentication
export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  // Define the login function to set the user ID and store it in local storage
  const login = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id);
  };

  // Define the logout function to clear the user ID and remove it from local storage
  const logout = () => {
    setUserId(null);
    localStorage.removeItem('userId');
  };

  // Return the AuthContext.Provider component with the value prop
  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define the useAuth hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
