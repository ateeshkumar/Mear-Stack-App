import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Box,Button,Typography,InputLabel,TextField} from '@mui/material'
import toast from 'react-hot-toast';

const BlogDetails = () => {
  const id = useParams().id;
  const [blog,setBlog] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState({});

  const blogDetail = async()=>{
    try {
      const {data} = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if(data?.success){
        setBlog(data?.blog)
        setInput({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image,
      });
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    blogDetail()
  },[id])

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const {data} = axios.put(`/api/v1/blog/update-blog/${id}`,{
            title:input.title,
            description:input.description,
            image:input.image,
            user:id
        });
        if(data?.success){
            toast.success('Blog updated');
            navigate('/my-blogs')
            
        }

    } catch (error) {
        console.log(error);
        
    }
    
  };

  const HandleChange = (e) => {
    setInput((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(blog)
  return (
    <form onSubmit={handleSubmit}>
      <Box
        width={"50%"}
        border={3}
        borderRadius={10}
        padding={3}
        margin={"auto"}
        boxShadow={"10px 10px 20px #ccc"}
        display={"flex"}
        flexDirection={"column"}
        marginTop={"30px"}
      >
        <Typography
          variant="h2"
          textAlign={"center"}
          fontWeight={"bold"}
          padding={3}
          color={"gray"}
        >
          Update A Post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={input.title}
            onChange={HandleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={input.description}
            onChange={HandleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image
          </InputLabel>
          <TextField
            name="image"
            value={input.image}
            onChange={HandleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="warning" variant="contained">Update</Button>
        
      </Box>
    </form>
  )
}

export default BlogDetails