const express = require('express')
const path = require('path')
const ejs = require('ejs')

const app = new express()
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.listen(3000, ()=>{
    console.log('App listening on port 3000')
})


app.get("/", function(req, res){
    //res.sendFile(path.resolve(__dirname, 'pages/index.html'));  
    res.render('index');
})

app.get("/about", function(req, res){
    //res.sendFile(path.resolve(__dirname, 'pages/about.html')); 
    res.render('about');   
})

app.get("/post", function(req, res){
    res.render('post');
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'));    
})
app.get("/contact", function(req, res){
    res.render('contact');
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'));    
})

