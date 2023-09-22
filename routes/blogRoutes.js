const express = require('express');
const { getAllBlogController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require('../controllers/blogController');
const router = express.Router();

//routes

//GET ALL BLOG
router.get('/all-blog',getAllBlogController);

//POST || CREATE BLOG
router.post('/create-blog',createBlogController);

//POST || UPDATE BLOG

router.put('/update-blog/:id',updateBlogController);

//GET || SINGLE BLOG

router.get('/get-blog/:id',getBlogByIdController);

//Delete //DELETE BLOG 

router.delete('/delete-blog/:id',deleteBlogController);

//GET || USER BLOG 
router.get('/user-blog/:id',userBlogController);

module.exports = router;