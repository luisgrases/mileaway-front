import { QueryObserverOptions, useQuery, UseQueryOptions } from "react-query";
import { Friend } from "Types";

import { fakeApiRequest } from "hooks/useMockSendRequest";

type UseFriendsParams = {};

export const useFriends = (
  params: UseFriendsParams = {},
  options: UseQueryOptions<Friend[]>
) => {
  return useQuery<Friend[]>(
    ["friend", "list", { ...params }],
    async () => {
      return await fakeApiRequest([
        { id: 1, username: "luisgrases", lastSeen: "2022-01-14T20:45:15.042Z" },
      ]);
    },
    options
  );
};
