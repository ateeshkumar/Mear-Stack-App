import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BlogCard from '../components/BlogCard';
const Blogs = () => {

  const[blog,setblog] = useState([]);

  const getAllBlog = async() =>{
    try {
      const {data} = await axios.get('/api/v1/blog/all-blog');
      if(data?.success){
        setblog(data?.blog);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getAllBlog()
  },[]);
  console.log(blog)
  return (
    <div>
      {
        blog && blog.map((item)=>(
        <BlogCard 
        id={item?._id}
        isUser={localStorage.getItem('userId')===item.user?._id}
        title={item.title}
        description={item.description}
        image = {item.image}
        username={item.user?.username}
        time={item.createdAt}/>))
      }
      
    </div>
  )
}

export default Blogs