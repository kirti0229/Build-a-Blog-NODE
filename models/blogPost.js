const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        commentText: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const BlogPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 150
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            default: []
        },
        comments: [CommentSchema],
    },
    { timestamps: true }
);

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;
