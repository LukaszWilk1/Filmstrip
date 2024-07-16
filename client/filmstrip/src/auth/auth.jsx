import { useState, useContext, createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = {
      isLoggedIn: window.sessionStorage.getItem("isLoggedIn"),
      login: window.sessionStorage.getItem("login"),
      id: window.sessionStorage.getItem("id"),
    };
    return storedUser || { isLoggedIn: false, login: null, id: null };
  });

  const login = ({ login, isPasswordCorrect, user_id }) => {
    setUser({ isLoggedIn: isPasswordCorrect, login, id: user_id });
    window.sessionStorage.setItem("isLoggedIn", isPasswordCorrect);
    window.sessionStorage.setItem("login", login);
    window.sessionStorage.setItem("id", user_id);
  };

  const logout = () => {
    setUser({ isLoggedIn: false, login: null, id: null });
    window.sessionStorage.removeItem("isLoggedIn");
    window.sessionStorage.removeItem("login");
    window.sessionStorage.removeItem("id");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
