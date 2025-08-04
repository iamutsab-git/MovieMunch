import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Initialize currentUser from localStorage, default to null if not found
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  });

  // Update user state
  const updateUser = (data) => {
    setCurrentUser(data);
  };

  // Sync currentUser with localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};