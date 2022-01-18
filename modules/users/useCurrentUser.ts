import { useQuery, UseQueryOptions } from "react-query";
import { User } from "Types";

import { fakeApiRequest } from "hooks/useMockSendRequest";

type UseCurrentUserParams = {};

export const useCurrentUser = (
  params: UseCurrentUserParams = {},
  options: UseQueryOptions<User>
) => {
  return useQuery<User>(
    ["currentUser"],
    async () => {
      return await fakeApiRequest({
        id: 1,
        username: "luisgrases",
        lastSeen: "2022-01-14T20:45:15.042Z",
      });
    },
    options
  );
};
