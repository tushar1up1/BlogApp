const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')


mongoose.connect('mongodb+srv://tushar:covid19@cluster0-fxprk.mongodb.net/genericDB?retryWrites=true&w=majority');

mongoose.connection.on("connected", function(){
    console.log("Application is connected to Databse");
})

/*BlogPost.create({
    title: "This would be the title for the post",
    body: "I am just creating this post from my Node app using mongosse"
}, function(error, BlogPost){
    console.log(error, BlogPost);
})*/



const app = new express()
app.use(express.static('public'));
const pageroute = require('./routes/route');

app.set('view engine', 'ejs');

app.listen(3000, ()=>{
    console.log('App listening on port 3000')
})

app.use('/', pageroute);

//module.exports = app;




