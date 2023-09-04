import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, FieldArray } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton, TextField } from "@mui/material";
import VideoJS from "./VideoJS";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Form = styled.div`
  width: 60%;
  background-color: #2d2d2d;
  color: white;
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;  
`

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 15px;
  background-color: transparent;
  z-index: 999;
  height: auto; 
`;

const ChapterInputTitle = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  width: 400px;
  font-size: 16px;  
`
const ChapterInputTime = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  width: 100px;
  font-size: 16px;
`
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  height: auto;
`;

const ChapterBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 10px;
  gap: 15px;

`
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 16px;
`;

const H3 = styled.h3`
  width: 100px;
  
`
const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video , "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);


  const handleUpload = async (e)=>{
    e.preventDefault();
    const res = await axios.post("/videos", {...inputs, tags})
     res.status===200  && navigate(`/video/${res.data._id}`) 
  }
  
  return (

        <Formik 
          initialValues={{
            video: { videoFile: '', title: '', description: '', thumbnail: '' },
            chapters: [{ text: '', start: '', end: ''}]   
         }} 
         onSubmit={handleUpload}
        >

        {({values}) => (
          
          <form onSubmit={handleUpload}>
            <Container>
            <Form>
              <Title>Upload a New Video</Title>
              <Label>Upload Video:</Label>
              {videoPerc > 0 ? (
                "Uploading:" + videoPerc + "%"
              ) : (
                <Input
                  type="file"
                  accept="video/*"
                  name="videofile"
                  value={values.video.videoFile}
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              )}

              <Input
                type="text"
                placeholder="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
              />

              <Desc
                placeholder="Description"
                name="desc"
                value={values.desc}
                rows={8}
                onChange={handleChange}
              />
              
              <Input
                type="text"
                placeholder="Separate the tags with commas."
                name="desc"
                value={values.description}
                onChange={handleTags}
              />

              <Label>Video Thumbnail</Label>
                {imgPerc > 0 ? (
                  "Uploading:" + imgPerc + "%"
                ) : (
                  <Input
                    type="file"
                    accept="image/*"
                    name="thumbnail"
                    value={values.thumbnail}
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                )}
          
              <FieldArray name="chapters">
                {({ push, remove}) => (
                  <div>
                    {values.chapters.map((chapter, index) => (
                      <ChapterBox key={index}>
                        <H3>Chapter: {index + 1}</H3>
                          <ChapterInputTitle 
                            type="text"
                            placeholder="Title"
                            name={`chapters.${index}.text`}
                            onChange={handleChange}
                            value={values.text} 
                          />
                          <ChapterInputTime
                            type="number"
                            placeholder="Start Time"
                            name={`chapters.${index}.start`}
                            onChange={handleChange}
                            value={values.start}  
                          /> 
                          <ChapterInputTime
                            type="number"
                            placeholder="End Time"
                            name={`chapters.${index}.end`}
                            onChange={handleChange}
                            value={values.end}    
                          />
                        {index > 0 && (
                          <Button type="button" onClick={() => remove(index)}>
                            <RemoveIcon />
                          </Button>
                        )}  
                        <Button type="button" onClick={() => push({ title: '', start: '', end: ''})}>
                          <AddIcon />
                         </Button>
                      </ChapterBox>
                    ))}
                  </div>
                )}
              </FieldArray>    
              <Button type="submit">Upload</Button> 
              </Form>     
            </Container>
          </form>   
        )}  
        </Formik>
    
  );
};

export default Upload;