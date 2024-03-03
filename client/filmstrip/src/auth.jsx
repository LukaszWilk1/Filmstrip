import { useState, useContext, createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = {
            isLoggedIn: window.localStorage.getItem("isLoggedIn"),
            login: window.localStorage.getItem("login"),
            id: window.localStorage.getItem("id")
        }
        return storedUser || { isLoggedIn: false, login: null, id: null };
    });

    const login = ({ login, isPasswordCorrect, user_id }) => {
        setUser({ isLoggedIn: isPasswordCorrect, login, id: user_id });
        window.localStorage.setItem("isLoggedIn", isPasswordCorrect);
        window.localStorage.setItem("login", login);
        window.localStorage.setItem("id", user_id);
    };

    const logout = () => {
        setUser({ isLoggedIn: false, login: null, id: null });
        window.localStorage.removeItem("isLoggedIn");
        window.localStorage.removeItem("login");
        window.localStorage.removeItem("id");
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
