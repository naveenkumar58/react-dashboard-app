import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { OutlinedInput } from "@mui/material";

interface HeaderProps {
  onSearchUser: (userName: string) => void;
}

const Header = (props: HeaderProps) => {
  return (
    <AppBar position="fixed">
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
          onChange={(event) => props.onSearchUser(event.target.value)}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
