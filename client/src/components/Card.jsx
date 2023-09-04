import React, { useState } from 'react';
import { useEffect } from 'react';
import { format } from 'timeago.js';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Skeleton } from '@mui/material';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { Link, useNavigate } from 'react-router-dom';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const Cards = ({video}) => {

  const [channel,setChannel] = useState({});
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const chapters = video.chapters;

  useEffect(() => {
      const fetchChannel = async () => {
        const res = await axios.get(`/users/find/${video.userId}`);
        setChannel(res.data);
      }
      fetchChannel()
    }, [video.userId]);

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
      
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
      
  setTimeout(() => {
    setLoading(false);
  }, [2000]);

  return (
    <Card color={"text.primary"}  sx={{ borderBottom: 1, borderColor: '#ff0048', width: "360px" }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: 0}}>
        <CardHeader
          avatar= {
            loading ? (
              <Skeleton variant="circular" height={40} width={40} /> 
              ) : (
              <Avatar src={channel.profilepic} />
            )}
          title={ 
            loading ? ( 
            <Skeleton variant="text" height={30} width={340} />
            ) : (
              <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                <Typography sx={{fontSize: 16, fontWeight: 600}}>{channel.name}</Typography> 
                <Typography sx={{fontSize: 14, fontWeight: 300}}>{format(video.createdAt)}</Typography>
              </div>
            )}
          sx={{ padding: "5px 0" }}
        />  
      <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
        {loading ? (<Skeleton variant="rectangular" height={200} width={360} />):(
        <CardMedia
        component="img"
        alt={video.title}
        image={video.imgUrl}
        title={video.title}
        style={{ width: "100%", height: '200px', borderRadius: '12px' }}
        /> 
      )}
    </Link>   
    <Link to={`/video/${video._id}`} 
      style={{display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
              textDecoration:"none",
              color:"inherit", 
              paddingTop: "10px"}}>
      {loading ? (
        <Skeleton variant="text" height={30} width={125} />
        ) : (
          <Typography sx={{ fontSize: '17px', fontWeight: '700' }}>{video.title}</Typography>
        )}

      <div style={{display: 'flex', alignItems: 'center'}}>
      {loading ? (
        <Skeleton variant="text" height={30} width={75} />
        ) : (
          <>
            <Typography sx={{padding:'0 7px'}} >{video.views}  </Typography>
            <RemoveRedEyeOutlinedIcon  />
          </> 
        )}
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
            {loading ? (
            <Skeleton variant="text" height={20} width={75} />
            ) : (
              <>
              <ExpandMoreIcon style={{ color: '#ff0048' }} />
              <Typography color={"text.primary"}>Chapters</Typography>
              </>
            )}
          </IconButton>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List
            sx={{
                display: 'flex',
                listStyle: 'none',
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
                marginRight: '0px',
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
  </Card>
 )    
}
export default Cards;
  
