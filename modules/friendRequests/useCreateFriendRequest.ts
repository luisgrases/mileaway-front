import { useMutation, useQueryClient } from "react-query";

import { sendRequest } from "utils/sendRequest";

type UseCreateFriendRequestBody = {
  toId: number;
};

export const useCreateFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (body: UseCreateFriendRequestBody) => {
      return await sendRequest({
        method: "POST",
        url: "/friendships",
        data: body,
      });
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["friendRequests", "list"]);
        return data;
      },
    }
  );
};
