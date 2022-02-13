import { useMutation } from "react-query";
import axios from "axios";
import { setItemAsync } from "expo-secure-store";
import { useAuthenticated } from "modules/auth/useAuthenticated";

type UseLoginBody = {
  googleIdToken: string;
};

export const useLogin = () => {
  const { setIsAuthenticated } = useAuthenticated();
  return useMutation(async (body: UseLoginBody) => {
    const response = await axios.post("http://localhost:4000/login", {
      idToken: body.googleIdToken,
    });
    await setItemAsync("session-token", body.googleIdToken);
    setIsAuthenticated(true);

    return response.data;
  });
};
