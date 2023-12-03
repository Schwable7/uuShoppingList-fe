import React, { createContext, useState, useContext, useEffect } from 'react';
import {BASE_URL} from "../constants";

const UserAuthContext = createContext(null);

export function useAuth() {
    return useContext(UserAuthContext);
}

export function UserAuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]); // State to hold fetched users

    // Function to handle user login
    const login = (user) => {
        setCurrentUser(user);
    };

    // Function to handle user logout
    const logout = () => {
        setCurrentUser(null);
    };

    // Fetch users from the server
    useEffect(() => {
        fetch(`${BASE_URL}/users`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));

    }, []);

    const value = {
        currentUser,
        login,
        logout,
        users // Provide fetched users to the context
    };

    return (
        <UserAuthContext.Provider value={value}>
            {children}
        </UserAuthContext.Provider>
    );
}
