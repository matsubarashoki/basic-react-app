import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserList } from "../../types";
import { fetchUsers } from "./queryFn";
import { userQueryKey } from "./queryKey";

type UsersQueryOptions<TData = UserList> = Omit<
  UseQueryOptions<UserList, AxiosError, TData, typeof userQueryKey.allUsers>,
  "queryKey" | "queryFn"
> & { suspense?: boolean };

export const useUsersQuery = <TData = UserList>(
  options?: UsersQueryOptions<TData>
) => {
  return useQuery({
    queryKey: userQueryKey.allUsers,
    queryFn: fetchUsers,
    suspense: true,
    ...options,
  });
};
