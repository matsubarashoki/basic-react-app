import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// ユーザー作成 API の関数
const createUser = async (user: { name: string; email: string }) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    user
  );
  return response.data;
};

// React Query の useMutation を使用
export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
