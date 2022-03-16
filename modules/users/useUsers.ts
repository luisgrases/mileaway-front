import { useQuery, UseQueryOptions } from "react-query";
import { User } from "Types";

import { sendRequest } from "utils/sendRequest";

type UseUsersParams = {
  username?: string;
};

export const useUsers = (
  params: UseUsersParams = {},
  options?: UseQueryOptions<User[]>
) => {
  return useQuery<User[]>(
    ["users", params],
    async () => {
      const response = await sendRequest({
        method: "GET",
        url: "/v1/users",
        params,
      });

      return response.data;
    },
    { staleTime: 0, ...options }
  );
};
