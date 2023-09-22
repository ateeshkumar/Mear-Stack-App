import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import {Box,Typography,TextField,Button} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
const Register = () => {
  const navigate = useNavigate();
  const [input,setinput] = useState({
    name:'',
    email:'',
    password:'',
  });
  const handleChange = (e)=>{
    
    setinput((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }))
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post("/api/v1/user/register",{
        username:input.name,
        email:input.email,
        password:input.password
      });
      if(data.success){
        toast.success('User Register Successfully');
        navigate('/login');
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
    <Box maxWidth={450}
    display={'flex'}
    flexDirection={'column'}
    alignItems={'center'}
    justifyContent={'center'}
    margin={'auto'}
    marginTop={5}
    boxShadow="10px 10px 20px #ccc"
    padding={3}
    borderRadius={5}>
      <Typography variant='h4'
      sx={{textTransform:"upperCase"}} padding={3} textAlign={'center'}>Register</Typography>
      <TextField
      placeholder='Username'
      name='name'
      value={input.name}
      margin='normal'
      type='text'
      onChange={handleChange}/>
      <TextField
     placeholder='Email'
     name='email'
     value={input.email}
     margin='normal'
     type='email'
     onChange={handleChange}/>
      <TextField
      placeholder='Password'
      name='password'
      value={input.password}
      margin='normal'
      type='password'
      onChange={handleChange}/>
      
      <Button type='submit'
      sx={{borderRadius:3,marginTop:3}}
      variant='contained'
      color='primary'>Submit</Button>
      <Button
      sx={{borderRadius:3,marginTop:3}}
      onClick={()=>navigate("/login")}>Already Registerd ? please login</Button>
    </Box>
    </form>
  )
}

export default Register