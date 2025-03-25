import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
      <Typography variant="h6">User List</Typography>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            component="button"
            onClick={() => navigate(`/user/${user.id}`)}
          >
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;
