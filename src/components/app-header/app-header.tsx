import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "../../store";

const AppHeader: React.FC = () => {
    
    const title = useAppSelector(state => state.app.appTitle);
    
    return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
};

export default AppHeader;