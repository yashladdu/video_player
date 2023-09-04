import { useState, useEffect } from "react";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Box from '@mui/material/Box';
import NavBar from "./components/AppBar";
import { createTheme, CssBaseline,ThemeProvider } from "@mui/material";
import Upload from "./components/Upload";

function App() {
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme ({
    palette:{
      mode, 
      ...(mode === 'dark'
      ? {
          // palette values for light mode
          primary: {
            main: "#ffffff",
            light: "red"
          },
          divider: "#ff0048",
          background: {
            default: "#ffffff",
            paper: "#ffffff",
          },
          text: {
            primary: "#111",
            secondary: "#ff0048",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#111111",
            light: "#111111"
          },
          divider: "#ff0048",
          background: {
            default: "#111111",
            paper: "#111111",
          },
          text: {
            primary: '#fff',
            secondary: "#ff0048",
          },
        }),
    }
  })

  useEffect(() => {
    fetch("https://video-segments-service.onrender.com")
    .then((res) => res.json())
    .then((data) => setMessage(data.message))
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <BrowserRouter>
        <Box bgcolor={"background.default"} >
          <h1 style={{color:"white"}}>lol {message}</h1>
          
          <NavBar color={"text.secondary"} setMode={setMode} mode={mode} />        
          {/* <Sidebar /> */}     
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />  
                <Route path="signin" element={<SignIn />} />  
                <Route path="search" element={<Search />} />
                <Route path="upload" element={<Upload />} />
                <Route path="video">
                  <Route path=":id" element={<Video />} />
                </Route>
              </Route>
            </Routes>    
          </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
