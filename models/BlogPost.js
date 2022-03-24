const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    description: String,
    datePosted: {type: Date, default: new Date()},
    image: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}

});

const Blog = mongoose.model('Blog',BlogPostSchema, "blogs");
module.exports = Blog;