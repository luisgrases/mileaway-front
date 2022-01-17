import { useQuery } from "react-query";
import { FriendRequest } from "Types";

import { fakeApiRequest } from "hooks/useMockSendRequest";

export const useFriendRequests = () => {
  return useQuery<FriendRequest[]>(["friendRequests", "list"], async () => {
    return await fakeApiRequest([
      {
        id: 1,
        from: { id: 3, username: "vash" },
        to: { id: 2, username: "luisgrases" },
      },
    ]);
  });
};
