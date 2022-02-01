const express = require('express');
const router = express.Router();


router.get("/", function(req, res){
    //res.sendFile(path.resolve(__dirname, 'pages/index.html'));  
    res.render('index');
})

router.get("/about", function(req, res){
    //res.sendFile(path.resolve(__dirname, 'pages/about.html')); 
    res.render('about');   
})

router.get("/post", function(req, res){
    res.render('post');
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'));    
})
router.get("/contact", function(req, res){
    res.render('contact');
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'));    
})

module.exports = router;