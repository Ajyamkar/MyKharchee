import React from "react";
import "./Navbar.scss";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { InboxRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  /**
   * State to open or close menu.
   */
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);

  /**
   * List of menu options.
   */
  const menuOptions = ["Dashboard", "Expenses", "Analytics", "Profile"];

  /**
   * funtion to open or close on clicking the menu button.
   * @param value - to open or close the menu bar.
   */
  const handleMenuClick =
    (value: boolean) => (event: React.MouseEvent | React.KeyboardEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpenMenu(value);
    };

  /**
   * Component to render menu options in menu bar.
   */
  const Lists = (
    <List>
      {menuOptions.map((option, index) => {
        return (
          <ListItem key={index}>
            <ListItemButton
              selected={window.location.href.includes(
                option.toLocaleLowerCase()
              )}
              onClick={() => setOpenMenu(false)}
            >
              <Link to={option.toLocaleLowerCase()}>
                <ListItemIcon>
                  <InboxRounded />
                  <ListItemText primary={option} />
                </ListItemIcon>
              </Link>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <div className="navbar-main-container">
      <CssBaseline />
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar className="navbar">
          <div className="logo-div">
            <Avatar className="logo-img" />
            <h1>MyKharche</h1>
          </div>
          <IconButton
            className="menu-button"
            onClick={handleMenuClick(!openMenu)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={openMenu} onClose={handleMenuClick(false)}>
        <Toolbar />
        <Box sx={{ width: "50vw" }}>{Lists}</Box>
      </Drawer>
    </div>
  );
};

export default Navbar;
