const blogPostService = require("../services/blogPostService");
const { updateBlogPostSchema } = require("../middlewares/validationMiddleware"); 


exports.createBlogPost = async (req, res) => {
  try {
    const blogPost = await blogPostService.createBlogPost(req.body);
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBlogPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const blogPosts = await blogPostService.getBlogPosts(page, limit);
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogPostsByTag = async (req, res) => {
  const { tag } = req.query;
  try {
    const blogPosts = await blogPostService.getBlogPostsByTag(tag);
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogPostById = async (req, res) => {
  try {
    const blogPost = await blogPostService.getBlogPostById(req.params.id);
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, author } = req.body;

  
  if (author) {
      return res.status(400).json({ message: "Author name cannot be modified" });
  }

  
  const { error } = updateBlogPostSchema.validate({ title, content, tags });
  if (error) {
      return res.status(400).json({ message: error.details[0].message });
  }

  try {
     
      const blogPost = await blogPostService.updateBlogPost(id, { title, content, tags });
      
      if (!blogPost) {
          return res.status(404).json({ message: 'Blog post not found' });
      }

      res.status(200).json({ message: 'Blog post updated successfully', blogPost });
  } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
  }
};



exports.deleteBlogPost = async (req, res) => {
  try {
    await blogPostService.deleteBlogPost(req.params.id);
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const blogPost = await blogPostService.addComment(req.params.id, req.body);
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
