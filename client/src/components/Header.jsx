import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {Box,Button,AppBar,Toolbar ,Typography, Tabs, Tab} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { authAction } from '../redux/store';
const Header = () => {
    const navigate = useNavigate();

    let isLogin = useSelector((state)=>state.isLogin);
    isLogin = isLogin || localStorage.getItem('userId');
    const dispatch = useDispatch();
    const[value,setValue] = useState();
    const handleLogout = () =>{
        try {
            dispatch(authAction.login());
            toast.success('Logout Successfully');
            navigate('/login');
            localStorage.clear();
        } catch (error) {
            console.log(error)
        }
    }  
    return (
    <>
    <AppBar position='sticky'>
        <Toolbar>
            <Typography variant='h4'>My Blog App</Typography>
            {isLogin && <>
                <Box display={'flex'} marginLeft='auto' marginRight='auto'>
                <Tabs textColor='inherit'
                value={value}
                onChange={(e,val)=>setValue(val)}>
                    <Tab label='blogs' LinkComponent={Link} to='/blogs'/>
                    <Tab label='my blogs' LinkComponent={Link} to='/my-blogs'/>
                    <Tab label='create blogs' LinkComponent={Link} to='/create-blogs'/>

                </Tabs>
                
            </Box>
            </>}
            
            <Box display={'flex'} marginLeft='auto'>
                {!isLogin && <>
                    <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to='/login'>Login</Button>
                    <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to='Register'>Register</Button>
                </>}
                {isLogin && <>
                    <Button onClick={handleLogout} sx={{margin:1,color:'white'}} LinkComponent={Link} to=''>Logout</Button>
                </>}
                
            </Box>
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Header