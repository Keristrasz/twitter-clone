import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useUser = (userId: string) => {
  //gets into our BE api/users/${userId} - api/users/[userId].ts
  //SWR is gonna fetch using fetcher function with axios and store it in (global store) cache, and its gonna cache it automatically
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
