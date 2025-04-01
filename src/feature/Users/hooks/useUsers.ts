import { useUsersQuery } from "../../../api/Users/hooks";
import { UserList } from "../../../types";

export const useUsers = () => {
  const { data } = useUsersQuery<UserList>({
    select: (data) => {
      return data.map((user) => ({
        ...user,
        fullName: `${user.name} (${user.username})`,
      }));
    },
  });
  return {
    users: data,
  };
};
