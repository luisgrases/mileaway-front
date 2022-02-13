import { useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContext";

export const useAuthenticated = () => {
  return useContext(AuthenticationContext);
};
