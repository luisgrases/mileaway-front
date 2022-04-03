import { useQuery, UseQueryOptions } from "react-query";
import { User } from "Types";

import { deleteItemAsync } from "expo-secure-store";
import { useAuthenticated } from "modules/auth/useAuthenticated";
import { sendRequest } from "utils/sendRequest";

type UseCurrentUserParams = {};

export const useCurrentUser = (
  params: UseCurrentUserParams = {},
  options?: UseQueryOptions<User>
) => {
  const { setIsAuthenticated } = useAuthenticated();
  return useQuery<User>(["currentUser"], async () => {
    try {
      const response = await sendRequest({
        method: "GET",
        url: "/me",
      });
      setIsAuthenticated(true);
      return response.data;
    } catch (e) {
      console.error(e);
      await deleteItemAsync("session-token");
      setIsAuthenticated(false);
    }
  });
};
