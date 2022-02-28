import { useQuery, UseQueryOptions } from "react-query";
import { User } from "Types";

import axios from "axios";
import { getItemAsync, deleteItemAsync } from "expo-secure-store";
import { useAuthenticated } from "modules/auth/useAuthenticated";

type UseCurrentUserParams = {};

export const useCurrentUser = (
  params: UseCurrentUserParams = {},
  options?: UseQueryOptions<User>
) => {
  const { setIsAuthenticated } = useAuthenticated();
  return useQuery<User>(
    ["currentUser"],
    async () => {
      try {
        const token = await getItemAsync("session-token");
        const response = await axios.get("http://localhost:4000/me", {
          headers: { "session-token": token },
        });
        setIsAuthenticated(true);
        return response.data;
      } catch (e) {
        console.error(e);
        await deleteItemAsync("session-token");
        setIsAuthenticated(false);
      }
    },
    options
  );
};
