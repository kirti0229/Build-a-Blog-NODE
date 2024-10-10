const { body } = require('express-validator');
const Joi = require('joi');

exports.validateBlogPost = [
    body('title').isString().isLength({ max: 150 }).notEmpty(),
    body('content').notEmpty(),
    body('author').notEmpty(),
    body('tags').optional().isArray()
];



exports.validateComment = [
    body('commentText').notEmpty(),
    body('author').notEmpty()
];





exports.updateBlogPostSchema = Joi.object({
    title: Joi.string().min(1).required().messages({
        'any.required': 'Title is required',
        'string.empty': 'Title cannot be empty',
        'string.min': 'Title must have at least 1 character'
    }),
    content: Joi.string().min(1).required().messages({
        'any.required': 'Content is required',
        'string.empty': 'Content cannot be empty',
        'string.min': 'Content must have at least 1 character'
    }),
    tags: Joi.array().items(Joi.string().required()).min(1).required().messages({
        'array.min': 'At least one tag is required',
        'array.empty': 'Tags cannot be empty',
        'string.empty': 'Tags cannot be empty'
    })
});