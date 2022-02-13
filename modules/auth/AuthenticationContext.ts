import React from "react";

export const AuthenticationContext = React.createContext<{
  setIsAuthenticated: (value: boolean) => void;
  isAuthenticated: boolean;
}>(undefined);
