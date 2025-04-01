import axios from "axios";
import { apis } from "../apis";

// ユーザー作成 API の関数
export const createUser = async (user: { name: string; email: string }) => {
  const response = await axios.post(apis.createUser, user);
  return response.data;
};
