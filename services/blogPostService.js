const BlogPost = require('../models/blogPost');

exports.createBlogPost = async (data) => {
    const blogPost = new BlogPost(data);
    return await blogPost.save();
};

exports.getBlogPosts = async (page, limit) => {
    return await BlogPost.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
};

exports.getBlogPostsByTag = async (tag) => {
    if (!tag) throw new Error('Tag query parameter is required.');

    const blogPosts = await BlogPost.find({
        tags: { $in: [new RegExp(tag, 'i')] }
    });

    if (blogPosts.length === 0) {
        throw new Error(`No blog posts found with the tag: ${tag}`);
    }

    return blogPosts;
};

exports.getBlogPostById = async (id) => {
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) throw new Error("Blog post not found");
    return blogPost;
};




exports.updateBlogPost = async (id, updatedData) => {
    try {
       
        const blogPost = await BlogPost.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true, runValidators: true }
        );
        return blogPost;
    } catch (error) {
        throw error; 
    }
};
exports.deleteBlogPost = async (id) => {
    const blogPost = await BlogPost.findByIdAndDelete(id);
    if (!blogPost) throw new Error("Blog post not found");
};

exports.addComment = async (id, commentData) => {
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) throw new Error("Blog post not found");
    blogPost.comments.push(commentData);
    await blogPost.save();
    return blogPost;
};
