import * as React from 'react';
import { useState } from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { styled, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useAppStore } from '../appStore';
import { logout } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Upload from './Upload';
import { Avatar, Button, Tooltip } from '@mui/material';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Switch } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { all } from 'axios';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';



const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
  }));

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));
  

const Search = styled('div')(({ theme, open}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    display: open ? "flex": "none", 
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: theme.spacing(1),
    transition: "2.5s",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '69ch',
    },

  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const VideoIcon = styled(OndemandVideoIcon)(({ theme, open}) => ({
  display: open ? "none": "flex",
}));

const Icons = styled('div')(({ theme, open}) => ({
  alignItems: 'center',
  display: open ? "none": "flex",
}));

const IconItem = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(2),
}));
const SearchIco = styled(SearchIcon)(({ theme }) => ({
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    display: "none"
  },
}));


export default function NavBar({mode, setMode}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?query=${query}`);
    }
  };

  const handleLogout = async (e) => {
    dispatch(logout());
  }

  const {currentUser} = useSelector(state => state.user);

  return (
    
    <AppBar position="sticky" >
    <Toolbar sx={{display: "flex", justifyContent:"space-between"}}>
      
      <Link to="/" style={{ textDecoration:"none", color:"inherit"}}>
        <Box sx={{display:"flex", alignItems:"center", gap: 1}}>
          <VideoIcon open={open} sx={{color:"text.secondary"}} />
          <Typography  variant="h6" sx={{ fontSize: { xs: '18px', sm: '24px' },color:"text.secondary"}}>iTube</Typography> 
        </Box>
      </Link>

      <Search open={open}sx={{ borderRadius: '20px', }} >
        <SearchIconWrapper >
          <SearchIcon  sx={{ color:"text.secondary" }} />
          
        </SearchIconWrapper >
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <CloseIcon onClick={() => setOpen(false)} sx={{display: {xs: "block", sm: "none"}}}/>
      </Search>

      <Icons open={open}>
      <SearchIco  
        sx={{ color:"text.secondary" }}
        onClick={() => setOpen(true)}
       />
      {currentUser ? (
        <>
        <IconItem>
          <FormControlLabel
                control={<MaterialUISwitch sx={{ }} defaultChecked />}
                onChange={e => setMode(mode === "light" ? "dark" : "light")}
                sx={{ display: {xs: "none", sm: "block"}}}
              />
          </IconItem>

          <Link to="upload" style={{textDecoration:"none", color:"inherit"}}>
            <IconItem>
              <Tooltip title="Upload Video">
                <VideoCallRoundedIcon sx={{display: {xs: "none", sm: "block"}, height: {xs: "35px", sm: "45px"}, width: {xs: "35px", sm: "45px"}, marginTop:1, color:"text.secondary"}}  />
              </Tooltip>
            </IconItem>
          </Link>
          

          <IconItem>
            <Avatar src={currentUser.profilepic} 
                    sx={{ cursor: 'pointer', height: {xs: "35px", sm: "45px"}, width: {xs: "35px", sm: "45px"}}} 
                    id="demo-positioned-button"
                    aria-controls={open2 ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open2? 'true' : undefined}
                    onClick={handleClick}>
            </Avatar>
          </IconItem>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open2}
            onClose={handleClose}     
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          > 
            <MenuItem> 
              <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                label="Theme"
                onChange={e => setMode(mode === "light" ? "dark" : "light")}
              />
            </MenuItem>
            <MenuItem >My account</MenuItem>
            <Link to="upload" style={{textDecoration:"none", color:"inherit"}}>
            <MenuItem sx={{display: {xs: "flex", sm: "none"}}}>
                <VideoCallRoundedIcon sx={{ height:"35px", width: "35px", color:"text.secondary"}} />
                <Typography>Upload Video</Typography>
            </MenuItem>
          </Link>
            <MenuItem onClick={handleLogout} >Logout</MenuItem>
          </Menu>
       </> 
      ) : (
        <Link to="signin" style={{ textDecoration: "none" }}>
          <Button sx={{border: '1px solid #ff0048', color: '#ffffff'}}>
            SIGN IN
          </Button>
        </Link>  
      
      )} 
      </Icons>
    </Toolbar>
  </AppBar>
  )
}

{/* <AppBar position="fixed" sx={{ backgroundColor: "	#111111", color: "#ffffff",  }} >
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, color: '#ff0048'}}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration:"none", color:"inherit" }}>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                Video Player W/ Segment Annotation
            </Typography>
            <OndemandVideoIcon sx={{ display: { xs: 'block', sm: 'none' }, marginRight: 2 }}/>
          </Link>
          <Search sx={{ borderRadius: '20px'}} >
            <SearchIconWrapper >
              <SearchIcon  sx={{ color: '#ff0048' }} />
            </SearchIconWrapper >
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{display: { xs: 'none', sm: 'block' }, width: '69ch'}}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          {currentUser ? (
            <>
            <Tooltip title="Upload Video">
            <Box sx={{ display: { xs: 'none', md: 'flex' } , marginRight:'35px', cursor: "Pointer"}}>
                <VideoCallOutlinedIcon onClick={() => setOpen(true) } style={{ fontSize: '30px'}} />
                
            </Box>
            </Tooltip>
            
            

            <Box sx={{ display: { xs: 'block', md: 'flex' }, marginRight:'35px' }} >
                <Avatar src={currentUser.profilepic} 
                        sx={{ cursor: 'pointer'}} 
                        onClick={handleClick}
                        id="demo-positioned-button"
                        aria-controls={open2 ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open2? 'true' : undefined}>
                </Avatar>
            </Box>

            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open2}
              onClose={handleClose}     
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            > 
              <MenuItem >Profile</MenuItem>
              <MenuItem >My account</MenuItem>
              <MenuItem onClick={handleLogout} >Logout</MenuItem>
             
            </Menu>
           </>
            
            ) : (

              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <Link to="signin" style={{ textDecoration: "none" }}>
                    <Button sx={{border: '1px solid #ff0048', color: '#ffffff'}}>
                      SIGN IN
                    </Button>
                </Link>  
              </Box>
            )}
        </Toolbar>
        
      </AppBar> */}