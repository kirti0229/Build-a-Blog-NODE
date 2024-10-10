const express = require('express');
const blogPostController = require('../controllers/blogPostController');
const { validateBlogPost, validateComment ,updateBlogPostSchema } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/blogposts', validateBlogPost, blogPostController.createBlogPost);
router.get('/blogposts', blogPostController.getBlogPosts);
router.get('/', blogPostController.getBlogPostsByTag);
router.get('/blogposts/:id', blogPostController.getBlogPostById);
router.patch('/blogposts/:id', blogPostController.updateBlogPost);
router.delete('/blogposts/:id', blogPostController.deleteBlogPost);
router.post('/blogposts/:id/comments', validateComment, blogPostController.addComment);

module.exports = router;
