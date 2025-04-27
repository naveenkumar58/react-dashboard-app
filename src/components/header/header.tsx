import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import "./header.css";
import { useState } from "react";

interface HeaderProps{
  onSearchUser: (userName: string)=> void
}

const Header = (props : HeaderProps) => {

  return (
    <div className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Dashboard App
            </Typography>
            <OutlinedInput
              id="outlined-basic"
              startAdornment={<SearchIcon />}
              placeholder=" Search Users"
              sx={{ backgroundColor: "white" }}
              onChange={event=> props.onSearchUser(event.target.value)}
            />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
