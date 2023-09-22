import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function BlogCard({
  id,
  isUser,
  title,
  description,
  image,
  username,
  time,
}) {
    const navigate = useNavigate();
    const handleEdit=()=>{
        navigate(`/blog-detail/${id}`);
        
    }
    const handleDelete = async()=>{
      try {
        const {data} = await axios.delete(`/api/v1/blog/delete-blog/${id}`)
        alert("Blog Deleted");
        if(data.success){
          
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <Card
      sx={{
        Width: "20px",
        marginLeft: "30%",
        marginRight: "30%",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
    {isUser && (
        <Box display={'flex'}>
        <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}>
        <EditIcon/>
        </IconButton>
        <IconButton onClick={handleDelete}>
        <DeleteIcon/>
        </IconButton>
        
        </Box>
    )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={image} alt={username} />
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          Title: {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
