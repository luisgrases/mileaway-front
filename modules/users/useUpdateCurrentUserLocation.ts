import { useMutation, useQueryClient } from "react-query";

import { sendRequest } from "utils/sendRequest";

type UseUpdateCurrentUserBody = { lat: number; lng: number };

export const useUpdateCurrentUserLocation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (body: UseUpdateCurrentUserBody) => {
      return await sendRequest({
        method: "PUT",
        url: "/me/location",
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
