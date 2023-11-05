import React, { createContext, useState, useContext, useEffect } from 'react';
import { users } from '../data';
const UserAuthContext = createContext(null);



export function useAuth() {
    return useContext(UserAuthContext);
}

export function UserAuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({id: 1, name: 'Mike'});

    // Function to handle user login
    const login = (user) => {
        setCurrentUser(user);
    };

    // Function to handle user logout
    const logout = () => {
        // Perform logout logic here
        setCurrentUser(null);
    };

    // Add other authentication methods as needed (signup, password reset, etc.)

    // Optionally, handle the authentication state persistence
    useEffect(() => {
        // Check for token in local storage or check session
        // Set user if authenticated
    }, []);

    const value = {
        currentUser,
        login,
        logout,
        users
        // Add other values that components might need
    };

    return (
        <UserAuthContext.Provider value={value}>
            {children}
        </UserAuthContext.Provider>
    );
}
