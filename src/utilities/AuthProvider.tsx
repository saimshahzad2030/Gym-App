import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value
interface AuthContextType {
  isAuthenticated: boolean;
  login: (userToken: string) => void;
  logout: () => void;
}

// Create the context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props type for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }): JSX.Element => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = (userToken: string) => {
    setToken(userToken);
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value= {{ isAuthenticated, login, logout }
}>
  { children }
  </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
