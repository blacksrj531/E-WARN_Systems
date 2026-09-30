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

  // Helper to get basic device info from browser
  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    let browser = "Unknown Browser";
    if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Edg")) browser = "Edge";

    let os = "Unknown OS";
    if (ua.includes("Win")) os = "Windows PC";
    else if (ua.includes("Mac")) os = "MacBook / iMac";
    else if (ua.includes("Android")) os = "Android Device";
    else if (ua.includes("like Mac")) os = "iPhone / iPad";
    else if (ua.includes("Linux")) os = "Linux PC";

    return `${os} - ${browser}`;
  };

  const recordLogin = (email) => {
    const history = JSON.parse(localStorage.getItem(`ewarn_activity_${email}`) || '[]');
    
    // Attempt to get timezone as a rough location proxy (e.g., Asia/Kolkata -> Asia, Kolkata)
    let location = "Unknown Location";
    try {
      location = Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' ').replace('/', ', ');
    } catch(e) {}

    const newSession = {
      id: Date.now(),
      device: getDeviceInfo(),
      loc: location,
      time: new Date().toISOString(),
      current: true,
    };
    
    // Mark previous sessions as not current
    const updatedHistory = history.map(s => ({ ...s, current: false }));
    updatedHistory.unshift(newSession); // Add new session to the top
    
    // Keep only the last 10 logins
    localStorage.setItem(`ewarn_activity_${email}`, JSON.stringify(updatedHistory.slice(0, 10)));
  };

  const login = (email, password) => {
    // Admin check logic happens after normal authentication now.
    // So we don't store hardcoded passwords here.

    const registeredUsers = JSON.parse(localStorage.getItem('ewarn_registered_users') || '[]');
    const user = registeredUsers.find(u => u.email === email);
    
    if (!user) {
      return { success: false, message: 'User not found. Please register first.' };
    }
    
    if (user.password !== password) {
      return { success: false, message: 'Incorrect password.' };
    }
    
    setIsAuthenticated(true);
    const isAdmin = email === 'admin@ewarnsystem.com';
    const userData = { email, isAdmin };
    setUser(userData);
    localStorage.setItem('ewarn_user', JSON.stringify(userData));
    recordLogin(email);
    return { success: true };
  };

  const register = (email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('ewarn_registered_users') || '[]');
    const userExists = registeredUsers.find(u => u.email === email);
    
    if (userExists) {
      if (userExists.password === password) {
        setIsAuthenticated(true);
        const isAdmin = email === 'admin@ewarnsystem.com';
        const userData = { email, isAdmin };
        setUser(userData);
        localStorage.setItem('ewarn_user', JSON.stringify(userData));
        recordLogin(email);
        return { success: true };
      }
      return { success: false, message: 'User already exists. Please use the Login page.' };
    }
    
    registeredUsers.push({ email, password });
    localStorage.setItem('ewarn_registered_users', JSON.stringify(registeredUsers));
    
    // Auto-login after registration
    setIsAuthenticated(true);
    const isAdmin = email === 'admin@ewarnsystem.com';
    const userData = { email, isAdmin };
    setUser(userData);
    localStorage.setItem('ewarn_user', JSON.stringify(userData));
    recordLogin(email);
    
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

