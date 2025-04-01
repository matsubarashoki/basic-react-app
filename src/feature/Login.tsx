import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit = (data: LoginForm) => {
    if (data.email === "test@test.com" && data.password === "aiueo") {
      setUser({ id: 1, name: "Admin", email: data.email });
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box paddingY={2}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email", { required: "Email is required" })}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password", { required: "Password is required" })}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
