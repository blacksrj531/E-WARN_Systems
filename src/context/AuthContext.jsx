import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('ewarn_user');
    if (savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('ewarn_registered_users') || '[]');
    const user = registeredUsers.find(u => u.email === email);
    
    if (!user) {
      return { success: false, message: 'User not found. Please register first.' };
    }
    
    if (user.password !== password) {
      return { success: false, message: 'Incorrect password.' };
    }
    
    setIsAuthenticated(true);
    const userData = { email };
    setUser(userData);
    localStorage.setItem('ewarn_user', JSON.stringify(userData));
    return { success: true };
  };

  const register = (email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('ewarn_registered_users') || '[]');
    const userExists = registeredUsers.find(u => u.email === email);
    
    if (userExists) {
      return { success: false, message: 'User already exists.' };
    }
    
    registeredUsers.push({ email, password });
    localStorage.setItem('ewarn_registered_users', JSON.stringify(registeredUsers));
    
    // Auto-login after registration
    setIsAuthenticated(true);
    const userData = { email };
    setUser(userData);
    localStorage.setItem('ewarn_user', JSON.stringify(userData));
    
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('ewarn_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
