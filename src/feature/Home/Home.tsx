"use client";

import { Box, Container, Typography } from "@mui/material";
import Header from "../../components/Header";
import Slider from "./Slider";

export default function Home() {
  return (
    <Box
      sx={{ flexGrow: 1, width: "100%", height: "100vh", overflowX: "hidden" }}
    >
      {/* Header */}
      <Header />

      {/* Slider Section */}
      <Slider />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
        >
          Welcome to our Website
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui
          mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor
          neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
        </Typography>
        <Typography variant="body1">
          Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor
          posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor
          orci. Etiam at risus et justo dignissim congue.
        </Typography>
      </Container>
    </Box>
  );
}
