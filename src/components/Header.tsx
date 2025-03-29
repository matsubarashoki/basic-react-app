"use client";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/routeConfig";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = ["News", "Users", "Blog"];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      {/* Header */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", boxShadow: 1 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to={ROUTES.HOME}
            sx={{ flexGrow: 1, fontWeight: "bold", textDecoration: "none" }}
          >
            BRAND
          </Typography>

          {isMobile ? (
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <HiMenu />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex" }}>
              {menuItems.map((item) => (
                <Button
                  component={Link}
                  to={ROUTES[item.toUpperCase()]}
                  key={item}
                  color="inherit"
                  sx={{ mx: 1 }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Menu
            </Typography>
            <IconButton onClick={toggleDrawer}>
              {theme.direction === "ltr" ? (
                <MdChevronRight />
              ) : (
                <MdChevronLeft />
              )}
            </IconButton>
          </Box>
          <List>
            {menuItems.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={ROUTES[text.toUpperCase()]}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
