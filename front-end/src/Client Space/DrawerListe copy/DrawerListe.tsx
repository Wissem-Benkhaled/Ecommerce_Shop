import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ComputerIcon from '@mui/icons-material/Computer';
import MemoryIcon from '@mui/icons-material/Memory';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  position: 'relative',
  overflowX: 'clip',
  boxShadow: 'none',       
  // backgroundColor: '#fff',
  backgroundColor: '#ffffffc6'
});

// Styles drawer fermé (mini drawer)
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'clip',
  // [theme.breakpoints.up('sm')]: {
    width: `70px`,
  // },
  position: 'relative',
  boxShadow: 'none',
  backgroundColor: '#ffffffc6'
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({

    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          top:'65px',
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          top:'65px',
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function DrawerListe() {
  const [open, setOpen] = React.useState(false);
  const categories = ['Informatique', 'Électronique', 'Vêtements', 'Nourriture'];

  const categoryIcons: any = {
    Informatique: <ComputerIcon />,
    Électronique: <MemoryIcon />,
    Vêtements: <CheckroomIcon />,
    Nourriture: <RestaurantIcon />
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        open={open}
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}

      >
        <List>
          {categories.map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={()=>console.log(text)}
                sx={[
                  {
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
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
                  },
                  open
                    ? {
                      justifyContent: 'initial',
                    }
                    : {
                      justifyContent: 'center',
                    },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: 'primary.main',
                    },
                    open
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: 'auto',
                      },
                  ]}
                >
                  {categoryIcons[text]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    {
                      opacity: open ? 1 : 0,
                      transition: 'opacity 0.3s',
                      whiteSpace: 'nowrap',
                    },
                    open
                      ? {
                        opacity: 1,
                      }
                      : {
                        opacity: 0,
                      },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        Contenu principal
      </Box> */}
    </Box>
  );
}
