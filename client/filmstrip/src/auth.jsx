import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = window.localStorage.getItem("isLoggedIn");
        return storedUser ? storedUser : null; // Sparsowanie wartości z localStorage
    });
    console.log("Auth Auth: ", user);

    const login = user => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        window.localStorage.removeItem("isLoggedIn");
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};