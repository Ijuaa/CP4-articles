import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    const decodedToken = jwtDecode(newToken);
    setUser(decodedToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return useMemo(
    () => (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    ),
    [user, login, logout, children]
  );
}

export default AuthProvider;
export { useAuth };
