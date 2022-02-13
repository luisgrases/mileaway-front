import { deleteItemAsync } from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { useAuthenticated } from "modules/auth/useAuthenticated";

export const useLogout = () => {
  const { setIsAuthenticated } = useAuthenticated();
  const logout = async () => {
    await deleteItemAsync("session-token");
    setIsAuthenticated(false);
  };
  return { logout };
};
