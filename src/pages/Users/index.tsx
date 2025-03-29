import { Box, Container, Paper, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useUsers } from "./useUsers";

const Users = () => {
  const { users } = useUsers();
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box paddingY={2}>
          <Typography variant="h4" gutterBottom>
            User Master
          </Typography>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="body1">
              This is the User Master page. You can manage users here.
            </Typography>
          </Paper>
          {users?.map((user) => (
            <Paper
              key={user.id}
              elevation={2}
              sx={{ padding: 2, marginTop: 2 }}
            >
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2">{user.email}</Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Users;
