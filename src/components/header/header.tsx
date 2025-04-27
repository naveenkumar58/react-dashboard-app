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

const Header = () => {
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
            />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
