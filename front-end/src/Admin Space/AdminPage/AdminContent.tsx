import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Footer from '../../Components/Footer';
import { useNavigate, Outlet } from "react-router-dom";
import { List, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import Badge from '@mui/material/Badge';
import { useState } from 'react';
import UserAccount from '../../Components/Connecter/UserAccount';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 240;
interface Props {
  window?: () => Window;
}

export default function AdminContent(props: Props) {

  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, PathPage: 'dashboard' },
    { text: 'Client', icon: <TableChartIcon />, PathPage: 'tableClients' },
    { text: 'Produit', icon: <TableChartIcon />, PathPage: 'tableProduit' },
    { text: 'Categorie', icon: <TableChartIcon />, PathPage: 'tableCategorie' },
    { text: 'Commande', icon: <ShoppingCartIcon />, PathPage: 'Commande' },
    { text: 'Profile', icon: <PersonIcon />, PathPage: 'profile' },
    { text: 'Settings', icon: <SettingsIcon />, PathPage: 'settings' },
  ];

  const drawer = (
    <div>
      <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "10px" }}>
        <img
          src={"../images/adminLogo1.png"}
          style={{ display: 'flex', justifyContent: 'center', height: '120px', width: '150px' }}
          alt="logo"
        />
      </div>
      <Divider />
      <div style={{ display: 'flex' }}>
        <aside style={{ width: '240px'}}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton sx={
                {
                  minHeight: 48,
                  justifyContent: 'initial',
                  px: 2.5,
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                  '&:hover, &:focus-visible': {
                    backgroundColor: 'rgba(25, 118, 210, 0.15)',
                    boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.6)',  // glow blanc doux
                    '& .MuiListItemText-primary': {
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      transition: 'font-size 0.3s',
                    },
                  },
                }
              } key={item.text} onClick={() => navigate(item.PathPage)}>
                <ListItemIcon sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                  color: 'primary.main',
                }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{
                  opacity: 1,
                  transition: 'opacity 0.3s',
                  whiteSpace: 'nowrap',
                }} />
              </ListItemButton>
            ))}
          </List>
        </aside>
      </div>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          {/* Menu button for mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" noWrap component="div">
            Welcome <img width="30" height="30" src="../../images/emoji_people_24dp_D9D9D9_FILL0_wght400_GRAD0_opsz24.png" alt="" />
          </Typography>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {/* Button aligned right */}
            <UserAccount />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 10,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          // Centrage du contenu
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', // Important pour centrer verticalement
        }}
      >
        <main>
          <Outlet />
        </main>
        <Footer />
      </Box>

    </Box>
  );
}
