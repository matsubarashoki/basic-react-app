import axios from "axios";
import { UserList } from "../../types";
import { apis } from "../apis";

// API call
export const fetchUsers = async () => {
  const { data } = await axios.get<UserList>(apis.users);
  return data;
};
