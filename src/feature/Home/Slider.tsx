"use client";

import { Box, Button, MobileStepper, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const slides = [
  {
    label: "Discover Our Latest Collection",
    description: "Explore our newest products with exclusive offers",
    imgPath: "/placeholder.svg?height=500&width=1200",
    buttonText: "Shop Now",
  },
  {
    label: "Premium Quality Products",
    description: "Crafted with attention to detail and premium materials",
    imgPath: "/placeholder.svg?height=500&width=1200",
    buttonText: "Learn More",
  },
  {
    label: "Special Seasonal Discounts",
    description: "Limited time offers on selected items",
    imgPath: "/placeholder.svg?height=500&width=1200",
    buttonText: "View Offers",
  },
];

export default function Slider() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = slides.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps
    );
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [activeStep]);

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Paper
        square
        elevation={0}
        sx={{
          height: { xs: "300px", md: "500px" },
          width: "100%",
          overflow: "hidden",
          position: "relative",
          backgroundImage: `url(${slides[activeStep].imgPath})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            padding: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              mb: 2,
              fontWeight: "bold",
              fontSize: { xs: "1.75rem", md: "3rem" },
            }}
          >
            {slides[activeStep].label}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              maxWidth: "800px",
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            {slides[activeStep].description}
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.8)",
              },
            }}
          >
            {slides[activeStep].buttonText}
          </Button>
        </Box>
      </Paper>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          width: "100%",
          "& .MuiMobileStepper-dot": {
            backgroundColor: "rgba(255,255,255,0.5)",
          },
          "& .MuiMobileStepper-dotActive": {
            backgroundColor: "white",
          },
        }}
        nextButton={
          <Button size="small" onClick={handleNext} sx={{ color: "white" }}>
            Next
            {theme.direction === "rtl" ? (
              <MdKeyboardArrowLeft />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} sx={{ color: "white" }}>
            {theme.direction === "rtl" ? (
              <MdKeyboardArrowRight />
            ) : (
              <MdKeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}
