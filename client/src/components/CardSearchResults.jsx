import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { CardActionArea} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Cardd = styled(Card)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: "block",
    width: "360px"
  }
}))

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardSearchResults({video}) {
  const [channel,setChannel] = useState({});

  useEffect(() => {
      const fetchChannel = async () => {
        const res = await axios.get(`/users/find/${video.userId}`);
        setChannel(res.data);
      }
      fetchChannel()
    }, [video.userId]);

    const navigate = useNavigate();
    const chapters = video.chapters;

    const formatSecondsToHHMMSS = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
    
      let formattedTime = '';
    
      if (hours > 0) {
        formattedTime += hours.toString().padStart(2, '0') + ':';
      }
    
      formattedTime +=
        minutes.toString().padStart(hours > 0 ? 2 : 1, '0') +
        ':' +
        remainingSeconds.toString().padStart(2, '0');
    
      return formattedTime;
    };
    

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Cardd  sx={{ display: "flex",
      backgroundColor: '#111111', color:'#ffffff', borderBottom: 1, borderColor: '#ff0048', 
      width: "1280px", paddingBottom: 1,
     }}>
    
    <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: 0}}>

    <CardHeader
      avatar= {
        <Avatar 
          src={channel.profilepic}
        />
      }
      title={
              <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                <Typography sx={{fontSize: 16, fontWeight: 600}}>{channel.name}</Typography> 
                <Typography sx={{fontSize: 14, fontWeight: 300}}>{format(video.createdAt)}</Typography>
              </div>
            }
      sx={{ padding: "5px 0" }}
    />
        
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
      <CardMedia
        component="img"
        alt={video.title}
        image={video.imgUrl}
        title={video.title}
        style={{ width: "100%", height: '200px', borderRadius: '12px' }}
      />
    </Link>
      <Link to={`/video/${video._id}`} style={{display: 'flex',justifyContent:'space-between',alignItems:'center',textDecoration:"none", color:"inherit", paddingTop: "10px"}}>
        <Typography sx={{ fontSize: '17px', fontWeight: '700' }}>{video.title}</Typography>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Typography sx={{padding:'0 7px'}} >{video.views}  </Typography>
          <RemoveRedEyeOutlinedIcon  />
        </div>    
      </Link>    
    </CardContent>
      
    <CardContent sx={{padding:0, margin:0}} >
      {chapters && (
        <>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show chapters"
            style={{ marginLeft: 'auto' }}
          >
            <ExpandMoreIcon style={{ color: '#ff0048' }} />
            <Typography style={{ color: '#ffffff' }}>Chapters</Typography>
          </IconButton>
          
          <Collapse in={expanded} timeout="auto" unmountOnExit>
       
          
          <List
            sx={{
                display: 'flex',
                listStyle: 'none',
                maxWidth: '850px',
                maxHeight: '202px',
                padding: 0,
                overflow: 'hidden',
                overflowX: 'auto',
                scrollbarWidth: 'thin',
                              
              '&::-webkit-scrollbar': {
                height: '8px',
               
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#ff0048',
                cursor: 'pointer'
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(0, 0, 0, 0.1)',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
              '& > li': {
                marginRight: '0px', // Adjust the spacing as needed
              },
            
            }}
           
          
          >
            {chapters.map((chapter) => (
              <ListItem key={chapter.id} >
                <a href=''style={{textDecoration:"none", color:"inherit"}} >
                <ListItemText primary={<Typography
                  component="div"
                  noWrap
                  sx={{ overflow: 'hidden', textOverflow: 'ellipsis', border:1, padding: 1, borderRadius: 3 }} 
                  onClick={() => navigate(`/video/${video._id}?t=${chapter.start}`)}
                  >
                  {chapter.text} | {formatSecondsToHHMMSS(chapter.start)} </Typography>} />
                  </a>
                  
              </ListItem>
            ))}
          
     
        </List>
        
  
       </Collapse> 
        </>
      )}
      </CardContent>
      
    
  </Cardd>
 

  );
}

{/* <Box sx={{ maxWidth: '800px',
                  maxHeight: '202px', 
                  maxWidth: '850px',
                  maxHeight: '202px',
                  overflow: 'hidden',
                  overflowY: 'scroll',
                  
                '&::-webkit-scrollbar': {
                  height: '8px',
                 
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#ff0048',
                  cursor: 'pointer'
                },
                '&::-webkit-scrollbar-track': {
                  background: '#111111',
                },}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {chapters.map((chapter) => (
                <Grid item xs={2} sm={4} md={4} key={chapter}>
                  <a href=''style={{textDecoration:"none", color:"inherit"}} >
                  <Typography
                    component="div"
                    
                    sx={{ border:1, padding: 1, borderRadius: 4, }} 
                    onClick={() => navigate(`/video/${video._id}?t=${chapter.start}`)}
                    >
                    <Typography sx={{fontSize: '12px'}}>{formatSecondsToHHMMSS(chapter.start)}</Typography>
                    <Typography>{chapter.text}</Typography> 
                     
                    </Typography>
                    </a>
                </Grid>
              ))}
            </Grid>
          </Box> */}