const Blog = require('../models/BlogPost')
const moment = require('moment')
const path = require('path')
const async = require('async')
const { nextTick } = require('process')

const createBlog = (req, res) =>{
    if(req.session.userId) {
        res.render('create')
    } else {
        res.redirect('/auth/login') 
    }   
}

const index = async (req, res) => {
    await Blog.find({}).then(blogs=>{
        console.log(req.session)
        res.render('index', {blogposts: blogs, moment: moment});
    }).catch(error=>{
        res.json(error)
    })    
}

const about = (req, res) => {
    res.render('about');   
}

const displayBlog = async function(req, res){
    const blog = await Blog.findById(req.params.id);
    res.render('displayBlog', {blog: blog, moment: moment});
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

const deleteBlog = async(req, res) => {
    console.log(req.params.id);
    await Blog.findByIdAndDelete(req.params.id)
        .then(result=>{      
        res.redirect("/")
    })
    .catch(err => next(err))
     
}
const updateBlog = async(req, res) =>{
    await Blog.findByIdAndUpdate(req.params.id, 
        {
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        })
        .then(result=> {
            console.log(result);
            res.redirect("/")
        })
        .catch(err => next(err))
}
const getBlogById = async(req, res) => {
    await Blog.findById(req.params.id)
        .then(blog =>{
            res.render("updateBlog", {blog: blog})
        })
        .catch(err => next(err));
}



module.exports = {
    createBlog, about , index, displayBlog, store, deleteBlog, updateBlog, getBlogById
}