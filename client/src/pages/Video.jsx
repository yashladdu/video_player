import React, { useState } from 'react';
import { useEffect } from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { format } from 'timeago.js';
import { dislike, fetchSuccess, like } from '../redux/videoSlice';
import VideoJS from '../components/VideoJS';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Container = styled('div')(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    padding: 0,
    marginTop: 0,
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

const Video = () => {
  const [expanded, setExpanded] = useState(false);
  const [channel,setChannel] = useState({});
  const {currentUser} = useSelector((state) => state.user);
  const {currentVideo} = useSelector((state) => state.video);
  const path = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {      
      }
    }
    fetchData(); 
  }, [path, dispatch]);

  const videoSrc = currentVideo?.videoUrl;
  const poster = currentVideo?.imgUrl;
  const chapters = currentVideo?.chapters;

  {chapters.map((chapter) => (
    [
      { start: chapter.start, end: chapter.end, text: chapter.text }, 
    ])
  )}

  const options = {
     autoplay: true,
     controls: true,
     sources: [
       {
         src: videoSrc, 
         poster: poster 
       },
     ],
  }

  return (
    <Container p={2} sx={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
      <Card bgcolor={"background.default"} color={"text.primary"} sx={{width: "920px"}}>

        <VideoJS options={options} chapters={chapters} />
        <CardHeader
          avatar={
            <Avatar src={channel.profilepic} />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon sx={{color: "text.primary"}} />
            </IconButton>
          }
          title={channel.name}
          subheader={currentVideo.createdAt}
        />
        <CardContent>
          <Typography variant="h5" >
            {currentVideo.title}
          </Typography>
        </CardContent>
        
        <CardActions  disableSpacing  >
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{color: "text.primary"}} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon sx={{color: "text.primary"}}/>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon sx={{color: "text.primary"}} />
          </ExpandMore>
        </CardActions>
      
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography paragraph>
              {currentVideo.description}
            </Typography>       
          </CardContent>
        </Collapse>

    </Card>       
  </Container>
  )
}


export default Video

/* const handleLike = async () => {
  await axios.put(`/users/like/${currentVideo._id}`);
  dispatch(like(currentUser._id));
};

const handleDislike = async () => {
  await axios.put(`/users/dislike/${currentVideo._id}`);
  dispatch(dislike(currentUser._id));
}; */

  {/*
    <Container>
      
         <VideoJS options={options} chapters={chapters}  />
        
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views • {format(currentVideo?.createdAt)}</Info>
          {/* <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (<ThumbUpIcon />) : (<ThumbUpOutlinedIcon  />)} {" "} {currentVideo?.likes?.length} 
              </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (<ThumbDownIcon />)  : (<ThumbDownAltOutlinedIcon />)} {" "} Dislike
              </Button>
            <Button><ShareOutlinedIcon />Share</Button>
            <Button><BookmarkBorderOutlinedIcon />Save</Button>
          </Buttons> */}
       {/* < /Details>
        <Hr />
      
      <Channel>
        <ChannelInfo>
          <Image src={channel.profilepic}></Image>
          <ChannelDetail>
            <ChannelName>{channel.name}</ChannelName>
            <Description>
              {currentVideo?.description}
            </Description>
          </ChannelDetail>
        </ChannelInfo>
        {/* <Subscribe>Subscribe</Subscribe> */}
      {/* </Channel>
      <Hr />
      
      </Container> */} 