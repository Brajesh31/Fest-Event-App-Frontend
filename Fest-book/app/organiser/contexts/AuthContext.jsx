"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedData = JSON.parse(localStorage.getItem('user_data'));
            if (storedData && storedData.userToken && storedData.user) {
                setToken(storedData.userToken);
                setUserData(storedData.user);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Failed to parse user data from localStorage", error);
        } finally {
            setLoading(false); // Loading complete
        }
    }, []);

    const login = (newToken, newData) => {
        localStorage.setItem('user_data', JSON.stringify({ userToken: newToken, user: newData }));
        setToken(newToken);
        setUserData(newData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('user_data');
        setToken(null);
        setUserData(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ token, userData, isAuthenticated, loading, login, logout }}>
            {!loading && children} {/* Render children only when loading is false */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
