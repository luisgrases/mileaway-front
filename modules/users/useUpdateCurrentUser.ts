import { useMutation, useQueryClient } from "react-query";

import axios from "axios";
import { getItemAsync } from "expo-secure-store";

type UseUpdateCurrentUserBody = {
  username?: string;
};

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (body: UseUpdateCurrentUserBody) => {
      const token = await getItemAsync("session-token");
      return await axios.put(`http://localhost:4000/me`, body, {
        headers: { "session-token": token },
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
