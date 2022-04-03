import axios, { AxiosRequestConfig } from "axios";
import { getItemAsync } from "expo-secure-store";

const API_URL = "http://localhost:4000";

export const sendRequest = async ({
  headers,
  url,
  ...rest
}: AxiosRequestConfig) => {
  const token = await getItemAsync("session-token");

  console.log("tokennn", token);
  return axios.request({
    url: `${API_URL}${url}`,
    headers: {
      ...(token && { "session-token": token }),
      ...headers,
    },
    ...rest,
  });
};
