import { useMutation, useQueryClient } from "react-query";

import { sendRequest } from "utils/sendRequest";

type UseUpdateCurrentUserBody = {
  username?: string;
  isSharingLocation?: boolean;
};

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (body: UseUpdateCurrentUserBody) => {
      return await sendRequest({
        method: "PUT",
        url: "/me",
        data: body,
      });
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["currentUser"]);
        return data;
      },
    }
  );
};
