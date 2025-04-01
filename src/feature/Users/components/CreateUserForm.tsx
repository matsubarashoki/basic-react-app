import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { UserFormData, userSchema } from "../../../types/zodSchemas";
import { useCreateUser } from "../hooks/useCreateUser";

export default function CreateUserForm() {
  const { mutate, isPending, isSuccess, isError, error } = useCreateUser();

  // 🔹 React Hook Form 設定
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  // 🔹 フォーム送信時の処理
  const onSubmit = (data: UserFormData) => {
    mutate(data, { onSuccess: () => reset() });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={400} mx="auto">
      <Typography variant="h5">Create User</Typography>

      {/* 🔹 Name フィールド */}
      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />

      {/* 🔹 Email フィールド */}
      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      {/* 🔹 送信ボタン */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit(onSubmit)}
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
      </Button>

      {/* 🔹 成功 & エラーメッセージ */}
      {isSuccess && (
        <Typography color="success.main">User created successfully!</Typography>
      )}
      {isError && (
        <Typography color="error.main">Error: {error?.message}</Typography>
      )}
    </Box>
  );
}
