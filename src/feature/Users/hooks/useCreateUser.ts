import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../../api/Users/mutationFn";

// React Query の useMutation を使用
export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
