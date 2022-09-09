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




6280045 6280025 6280173 6280148 6280027 6280162 6280062 6280034 6280164 6280022 6280060 6280165 6280076 6280031 6280120 6280049 6280177 6280084 6280140 6280136 6280074 6280048 6280069 6280119 6280016 6280018 6280137 6280170