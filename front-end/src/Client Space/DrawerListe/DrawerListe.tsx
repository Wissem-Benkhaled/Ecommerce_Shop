import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import SettingsIcon from '@mui/icons-material/Settings';
import { ListeCategorie } from '../../Components/GettingListes.tsx/ListeCategorie';
import { Fragment } from 'react/jsx-runtime';
import { Divider } from '@mui/material';
// import { red } from '@mui/material/colors';


export default function DrawerListe() {

  const Listes = ListeCategorie(true)
  const categoryIcons: any = {
    "Ordinateur Portable": <LaptopMacIcon />,
    "Accessoires et Périphériques": <HeadphonesIcon />,
    "Ordinateur de Bureau": <DesktopWindowsIcon />,
    "Logiciels": <SettingsIcon />
  };

  return (
    <Box
      sx={{
        background: ' linear-gradient(to bottom left, #f0f4f8, #e0f2f1)',
        maxWidth: '20%',
        minHeight: '50%',
        ml: '1%',
        height: '600px',
        overflowY: 'auto',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
      }}
    >
      <List>
        {Listes.map(({ category, items }) => (
          <Fragment key={category.name}>
            <ListItem disablePadding>
              <ListItemButton
                sx={
                  {
                    mt:'10px',
                    color: '#555555ff',
                    minHeight: 48,
                    justifyContent: 'center',
                    px: 2.5,
                    transition: 'background-color 0.3s, box-shadow 0.3s',
                    '&:hover, &:focus-visible': {
                      backgroundColor: 'rgba(25, 118, 210, 0.15)',
                      boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.6)',
                      '& .MuiListItemText-primary': {
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        transition: 'font-size 0.3s',
                      },
                    },
                  }
                }
              >
                <ListItemIcon sx={
                  {
                    mr: 'auto',
                    justifyContent: 'center',
                    color: 'primary.main',
                  }
                }>
                  {categoryIcons[category.name]}
                </ListItemIcon>
                <ListItemText primary={category.name} sx={{ fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>
            <Divider />

            {
              items.map(({ name, image }) => (
                <ListItem key={name} disablePadding sx={{ pl: 4 }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <img src={image} alt={name} width={40} height={40} style={{ borderRadius: 4 }} />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              ))
            }
          </Fragment>

        ))}
      </List>

    </Box >
  );
}
