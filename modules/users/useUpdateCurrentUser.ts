import { useMutation, useQueryClient } from "react-query";

import { sendRequest } from "utils/sendRequest";

type UseUpdateCurrentUserBody = {
  username?: string;
  location?: { lat: number; lng: number };
  isSharingLocation?: boolean;
};

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (body: UseUpdateCurrentUserBody) => {
      return await sendRequest({
        method: "PUT",
        url: "/me",
        params: body,
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
