import axios from 'axios';
import React, { useState, useEffect }  from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess} from '../redux/userSlice';
import { auth, provider, proviser } from "../firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LockIcon from '@mui/icons-material/Lock';
import Switch from '@mui/material/Switch';
import Signup from '../components/Signup';
import Login from '../components/Login';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    color: ${({theme}) => theme.text};
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({theme}) => theme.bgLighter};
    border: 1px solid ${({theme}) => theme.soft};
    padding: 20px 50px;
    gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({theme}) => theme.soft}; 
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({theme}) => theme.soft}; 
  color: ${({theme}) => theme.textSoft}; 
`;

const SignIn = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", {name, password});
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
    }
  }

  const handleSignIn = async () => {
    dispatch(loginStart())
    try {
      const res = await axios.post("/auth/signup", {name, email, password});
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
    }
  }

  const signInWithGoogle = async () => {
    dispatch(loginStart())
    signInWithPopup(auth, provider)
    .then((result) => {
      axios.post("/auth/google", {
        name:result.user.displayName,
        email:result.user.email,
        profilepic:result.user.photoURL
      }).then((res) => {
        dispatch(loginSuccess(res.data));
      })
    })
    .catch((error) => {
      dispatch(loginFailure());
    }); 
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to our website</SubTitle>
        <Input placeholder="username" onChange={e=>setName(e.target.value)} required/>
        <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} required/>
        <Button onClick={handleLogin}>Sign In</Button>
        <Title>OR</Title>
        <Button onClick={signInWithGoogle}>Sign In with Google</Button>
        <Title>OR</Title>
        <Input placeholder="username" onChange={e=>setName(e.target.value)} />
        <Input placeholder="email" onChange={e=>setEmail(e.target.value)} />
        <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
        <Button onClick={handleSignIn}>Sign Up</Button>
      </Wrapper>
    </Container>  
  )
}

export default SignIn


{/* <Box sx={{
  textAlign: "center",
  width: "500px",
  margin: "0 auto",
  marginTop: "50px",
}}>
  <Paper elevation={10} sx={{padding: 2}}> 
    {checked ? (
      <Chip icon={<PermIdentityIcon />} label="Sign Up" variant="outlined" />
    ) : (
      <Chip icon={<LockIcon />} label="Log In" variant="outlined" />
    )}

    <br />

    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      color="default"
    />

  <br />

  {checked ? (
      <Signup />
    ) : (
      <Login />
    )}
  </Paper>
  </Box> */}