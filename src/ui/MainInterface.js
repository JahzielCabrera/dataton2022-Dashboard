import * as React from 'react';
import { NavLink } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Tooltip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccountBalance, AssignmentInd, BarChart, BubbleChart, HomeOutlined, Tour } from '@mui/icons-material';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const themeHeader = createTheme({
    palette: {
        primary: {
            main: '#031626'
        },
        secondary: {
            main: '#0362fc'
        },
        error: {
            main: '#ff3838'
        }
    }
});

const itemsNavigation = [
    {path: '/', name: 'Home', iconActive: <HomeOutlined sx={{fontSize: 30, color: '#0362fc'}}/>, iconDefault: <HomeOutlined sx={{fontSize: 30}}/>},
    {path: '/estadisticas', name: 'Estadisticas', iconActive: <BarChart sx={{fontSize: 30, color: '#0362fc'}}/>, iconDefault: <BarChart sx={{fontSize: 30}}/>},
    {path: '/jefes', name: 'Redes de Jefes', iconActive: <AssignmentInd sx={{fontSize: 30, color: '#0362fc'}}/>, iconDefault: <AssignmentInd sx={{fontSize: 30}}/>},
    {path: '/instituciones', name: 'Redes de instituciones', iconActive: <AccountBalance sx={{fontSize: 30, color: '#0362fc'}}/>, iconDefault: <AccountBalance sx={{fontSize: 30}}/>},
    {path: '/anomalias', name: 'Sistema de anomalías', iconActive: <Tour sx={{fontSize: 30, color: '#0362fc'}}/>, iconDefault: <Tour sx={{fontSize: 30}}/>},
    {path: '/grafoprincipal', name: 'Grafo Principal', iconActive: <BubbleChart sx={{fontSize: 30, color: '#0362fc'}}/>, iconDefault: <BubbleChart sx={{fontSize: 30}}/>},
]

export default function MainInterface(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={themeHeader}>
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" noWrap component="div" sx={{fontWeight: 600, fontSize:22}}>
                Datómicos
            </Typography> */}
            <img height={50} src='https://res.cloudinary.com/djxxgphqp/image/upload/v1670141143/plots/DATOMICOS_imjqce.jpg'/>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {itemsNavigation.map((item, index) => (
                    <NavLink exact='true' to={item.path} style={{textDecoration: 'none', textDecorationStyle: 'none'}}>
                        {({isActive}) => {
                        if(isActive) {
                            return(
                            <>
                                <ListItem button sx={{backgroundColor: '#ededed'}}>
                                <Tooltip title={item.name} placement='right'>
                                    <ListItemIcon sx={{my:1}} >
                                        {item.iconActive}
                                    </ListItemIcon>
                                </Tooltip>
                                <ListItemText primary={item.name} style={{ color: '#0362fc'}}/>
                                <Divider />
                                </ListItem>
                            </>
                            )
                        } else {
                            return(
                            <>
                                <ListItem button>
                                <Tooltip title={item.name} placement='right'>
                                    <ListItemIcon sx={{my:1}} >
                                        {item.iconDefault}
                                    </ListItemIcon>
                                </Tooltip>
                                <ListItemText primary={item.name} style={{color: '#292929'}}/>
                                </ListItem>
                            </>
                            )
                        }
                        }}
                    </NavLink>
                ))}
            </List>
            {/* <Divider /> */}
            
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Box>
                {props.element}
            </Box>
        </Box>
        </Box>
    </ThemeProvider>
  );
}