import { useQuery } from "react-query";
import { Friend } from "Types";

import { fakeApiRequest } from "hooks/useMockSendRequest";

export const useFriends = () => {
  return useQuery<Friend[]>(["friend", "list"], async () => {
    return await fakeApiRequest([
      { id: 1, username: "luisgrases", lastSeen: "2022-01-14T20:45:15.042Z" },
    ]);
  });
};
