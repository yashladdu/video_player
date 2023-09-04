import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardSearchResults from '../components/CardSearchResults';


const Container = styled('div')(({theme}) => ({
    [theme.breakpoints.down('md')]: {
      padding: "0 25px",
    }
  }))

const Search = () => {

    const [videos, setVideos] = useState([]);
    const query = useLocation().search;
    
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/videos/search${query}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [query]);

  return (
    <Container sx={{ margin:"5px 0px", padding:"0 100px"}}>
        <Box sx={{display:"flex", flexDirection:"column", gap:"15px"}}>
            {videos.map(video => (
                <CardSearchResults key={video._id} video={video} /> 
            ))}
        </Box>
    </Container>
  )
}

export default Search