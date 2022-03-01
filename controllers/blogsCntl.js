const Blog = require('../models/BlogPost')
const moment = require('moment')
const path = require('path')

const create = (req, res) =>{
    res.render('create')
}

const index = async (req, res) => {
    const blogs = await Blog.find({});
    res.render('index', {blogposts: blogs});
}

const about = (req, res) => {
    res.render('about');   
}

const post = async function(req, res){
    const blog = await Blog.findById(req.params.id);
    res.render('post', {blog: blog, moment: moment});
}

const store = (req, res) =>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'../public/assets/img',image.name), async(error) => {
        await Blog.create({
            title: req.body.title,
            description: req.body.description, 
            image: '/img/'+image.name})
        res.redirect("/")
    })    
}



module.exports = {
    create, about , index, post, store
}