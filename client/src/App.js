import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlog from './pages/UserBlog';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Toaster/>
        <Routes>
          <Route path='/' element={<Blogs/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/my-blogs' element={<UserBlog/>}/>
          <Route path='/create-blogs' element={<CreateBlog/>}/>
          <Route path='/blog-detail/:id' element={<BlogDetails/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
