const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const blogController = require('./controllers/blogsCntl');



const Blog = require('./models/BlogPost')


mongoose.connect('mongodb+srv://tushar:covid19@cluster0-fxprk.mongodb.net/genericDB?retryWrites=true&w=majority');

mongoose.connection.on("connected", function(){
    console.log("Application is connected to Databse");
})
const app = new express()
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

const validateMiddleWare = (req, res, next)=>{
    console.log("validation middleware called")
    if(req.files == null || req.body.title == null || req.body.title == null){
    return res.redirect('/create')
}
next()
}
app.use('/store',validateMiddleWare)

//const pageroute = require('./routes/route');

app.set('view engine', 'ejs');

app.listen(3000, ()=>{
    console.log('App listening on port 3000')
})

app.get("/", blogController.index )

app.get("/about", blogController.about)

app.get("/post/:id", blogController.post)
app.get("/contact", function(req, res){
    res.render('contact');
})

app.get("/create", blogController.create)


app.post("/store", blogController.store)  






