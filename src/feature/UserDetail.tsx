import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <Typography variant="h6">User ID not found</Typography>;
  }

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <Container>
      <Typography variant="h4">User Detail</Typography>
      <Typography variant="body1">User ID: {id}</Typography>
      <Button variant="contained" onClick={handleBack}>
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default UserDetail;
