import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../../api/Users/postApi";

// React Query の useMutation を使用
export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
