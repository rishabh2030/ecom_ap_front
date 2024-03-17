import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

const MiniDrawer = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        sx={{
          width: 200, // Adjust width as needed
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 200, // Adjust width as needed
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItemButton key="home">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton key="settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Drawer>
      <Paper
        component="nav"
        sx={{
          width: open ? 200 : 60, // Adjust width as needed
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
        PaperProps={{
          elevation: 3,
        }}
      >
        <IconButton
          onClick={handleDrawerOpen}
          sx={{ position: 'absolute', left: 0 }}
        >
          <MenuIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default MiniDrawer;
