import { useQuery, UseQueryOptions } from "react-query";
import { User } from "Types";

import { sendRequest } from "utils/sendRequest";

type UseFriendsInRangeParams = {
  inRange?: boolean;
};

export const useFriends = (
  params: UseFriendsInRangeParams = {},
  options?: UseQueryOptions<User>
) => {
  return useQuery<User>(
    ["friends", "inRange", params],
    async () => {
      const response = await sendRequest({
        method: "GET",
        url: "/me/friends",
        params,
      });

      return response.data;
    },
    { staleTime: 0, ...options }
  );
};
