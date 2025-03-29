import axios from "axios";
import { UserList } from "../../types";

// API call
export const fetchUsers = async () => {
  const { data } = await axios.get<UserList>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data;
};
