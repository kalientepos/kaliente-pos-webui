import { Alert, AlertTitle, AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import { useAppSelector } from "../../store";

const AppHeader: React.FC = () => {
    
    const title = useAppSelector(state => state.app.appTitle);
    
    return (
      <AppBar
        position="fixed"
        sx={{ width: `100%`, ml: 0, zIndex: 50 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Kaliente POS
          </Typography>
        </Toolbar>
      </AppBar>
    );
};

export default AppHeader;