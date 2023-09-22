import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const id = localStorage.getItem('userId');
    const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const {data} = axios.post('/api/v1/blog/create-blog',{
            title:input.title,
            description:input.description,
            image:input.image,
            user:id
        });
        if(data?.blog){
            toast.success('Blog Created');
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
          Create A Post
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
          <Button type="submit" color="primary" variant="contained">Submit</Button>
        
      </Box>
    </form>
  );
};

export default CreateBlog;
