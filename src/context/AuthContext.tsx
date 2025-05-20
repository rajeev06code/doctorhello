
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Define a simple user type for localStorage
interface SimpleUser {
  phoneNumber: string;
  // We can add other fields like fullName if needed for localStorage later
}

interface AuthContextType {
  user: SimpleUser | null;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  login: (phoneNumber: string) => Promise<void>; // Kept as async for potential future API calls
  logout: () => void;
  register: (fullName: string, phoneNumber: string) => Promise<void>; // Kept as async
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = "swasthyaConnectUser";
const LOCAL_STORAGE_REGISTERED_USERS_KEY = "swasthyaConnectRegisteredUsers"; // For simple register/login check

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for an existing user session
    setLoading(true); // Ensure loading is true during this check
    try {
      const storedUserString = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (storedUserString) {
        const storedUser = JSON.parse(storedUserString) as SimpleUser;
        setUser(storedUser);
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY); // Clear corrupted data
      setUser(null);
    } finally {
      setLoading(false); // Set loading to false after initial check
    }
  }, []);

  const login = async (phoneNumber: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async
      if (!/^\+91[6-9]\d{9}$/.test(phoneNumber)) {
        throw new Error("Please enter a valid Indian mobile number with +91 prefix (e.g., +919876543210).");
      }
      
      // Simulate checking if user is "registered" (exists in our mock registered users list)
      const registeredUsersString = localStorage.getItem(LOCAL_STORAGE_REGISTERED_USERS_KEY);
      const registeredUsers: SimpleUser[] = registeredUsersString ? JSON.parse(registeredUsersString) : [];
      const existingUser = registeredUsers.find(u => u.phoneNumber === phoneNumber);

      if (!existingUser) {
        throw new Error("User not registered. Please register first.");
      }

      const currentUser: SimpleUser = { phoneNumber }; // In a real app, you'd fetch user details
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentUser));
      setUser(currentUser);
      router.push("/dashboard");
    } catch (e: any) {
      console.error("Login error", e);
      setError(e.message || "Failed to login.");
      throw e; // Re-throw to be caught by form if needed
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (fullName: string, phoneNumber: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async
      if (!fullName.trim()) {
        throw new Error("Please enter your full name.");
      }
      if (!/^\+91[6-9]\d{9}$/.test(phoneNumber)) {
        throw new Error("Please enter a valid Indian mobile number with +91 prefix (e.g., +919876543210).");
      }

      // Simulate storing registered user
      const registeredUsersString = localStorage.getItem(LOCAL_STORAGE_REGISTERED_USERS_KEY);
      let registeredUsers: SimpleUser[] = registeredUsersString ? JSON.parse(registeredUsersString) : [];
      
      if (registeredUsers.some(u => u.phoneNumber === phoneNumber)) {
        throw new Error("This phone number is already registered. Please login.");
      }
      
      const newUser: SimpleUser = { phoneNumber }; // Store minimal info for registration
      registeredUsers.push(newUser);
      localStorage.setItem(LOCAL_STORAGE_REGISTERED_USERS_KEY, JSON.stringify(registeredUsers));
      
      // Also log them in
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUser));
      setUser(newUser);
      console.log("User registered (localStorage):", phoneNumber, "Full Name:", fullName);
      router.push("/dashboard");
    } catch (e: any) {
      console.error("Registration error", e);
      setError(e.message || "Failed to register.");
      throw e; // Re-throw to be caught by form if needed
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setError(null);
    try {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      setUser(null); 
      // Defer navigation to allow state update to propagate
      setTimeout(() => {
        router.push('/'); 
      }, 0);
    } catch (e: any) {
      console.error("Sign out error", e);
      setError(e.message || "Failed to sign out.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, setError, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
