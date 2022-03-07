const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const blogController = require('./controllers/blogsCntl');
const userController = require('./controllers/userCntl');

mongoose.connect('');

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

app.listen(3001, ()=>{
    console.log('App listening on port 3001')
})

app.get("/", blogController.index )

app.get("/about", blogController.about)

app.get("/displayBlog/:id", blogController.displayBlog)
app.get("/contact", function(req, res){
    res.render('contact');
})

app.get("/create", blogController.createBlog);
app.post("/store", blogController.store); 
app.get("/deleteBlog/:id", blogController.deleteBlog);

app.route("/updateBlog/:id")
    .get(blogController.getBlogById)
    .post(blogController.updateBlog)


app.get('/auth/register', userController.registerUser)
app.post('/users/register', userController.storeUser)

app.get('/auth/login', userController.login)
app.post('/users/login', userController.processLogin)





