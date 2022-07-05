import {
  Alert,
  AlertTitle,
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppSelector } from '../../store';

const AppHeader: React.FC = () => {
  const title = useAppSelector((state) => state.app.appTitle);

  return (
    <AppBar position="fixed" sx={{ width: '100%', ml: 0, zIndex: 50 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: '' } }}>
          <Typography variant="h6" noWrap component="div">
            Kaliente POS
          </Typography>
        </Box>
        <Box>
          <Tooltip title="Show profile details.">
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src="https://media-exp1.licdn.com/dms/image/C4D03AQGT34S7evfT_g/profile-displayphoto-shrink_200_200/0/1551198088599?e=1658361600&v=beta&t=OlnTT88c4JFYLzMzsbAjnlU3IOx4ZoMfTofBrKn0UkY"
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
