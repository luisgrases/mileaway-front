import { useMutation, useQueryClient } from "react-query";

import { sendRequest } from "utils/sendRequest";

type UseAcceptFriendRequestBody = {
  id: number;
};

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (body: UseAcceptFriendRequestBody) => {
      const response = await sendRequest({
        method: "PUT",
        url: `/friendships/${body.id}/accept`,
      });

      return response;
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["users"]);
        await queryClient.invalidateQueries(["currentUser"]);
        return data;
      },
    }
  );
};
