import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import { ROUTES } from "../../../routes/routeConfig";
import { useUsers } from "../hooks/useUsers";

const Users = () => {
  const { users } = useUsers();
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box paddingY={2} justifyContent={"space-between"} display="flex">
          <Box>
            <Typography variant="h4" gutterBottom>
              User Master
            </Typography>
          </Box>
          <Box>
            <Button
              component={Link}
              to={ROUTES.CREATEUSER}
              size="large"
              variant="contained"
            >
              Create User
            </Button>
          </Box>
        </Box>
        <Box paddingY={2}>
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
