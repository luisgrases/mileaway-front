import { useState, useCallback } from "react";

/**
 * Hook that mocks an API request. Useful for when building a view where the API is not ready yet.
 */

interface UseMockSendRequest {
  (mockResponse: any, err?: any): [
    () => void,
    // We don't have a structure for api error objects yet
    // eslint-disable-next-line @typescript-eslint/ban-types
    { isLoading: boolean; error: object; response: any }
  ];
}

export const useMockSendRequest: UseMockSendRequest = (mockResponse, err?) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [response, setResponse] = useState<any>(null);

  const send = useCallback(async () => {
    console.warn(
      "%c WARNING! %cYou are using a mocked API request. Please remember to use the real implementation before this code goes to production. ",
      "background: #222; color: #bada55; font-size: large;",
      "background: #222; color: #bada55;"
    );
    try {
      setIsLoading(true);
      setError(null);
      setResponse(null);
      const res = await fakeApiRequest(mockResponse, err);
      setResponse(res);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [send, { response, isLoading, error }];
};

export const fakeApiRequest = (response: any, err?: any): any =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (err) {
        reject(err);
      }
      return resolve(response);
    }, 2000);
  });
