import { useMutation, useQueryClient } from "react-query";

import { sendRequest } from "utils/sendRequest";

type UseDeleteFriendRequestBody = {
  id: number;
};

export const useDeleteFriendRequest = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (body: UseDeleteFriendRequestBody) => {
      const response = await sendRequest({
        method: "DELETE",
        url: `/friendships/${body.id}`,
      });

      console.log("response", response.status);
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
