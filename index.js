const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')
require('./models/db');

const blogController = require('./controllers/blogsCntl');
const userController = require('./controllers/userCntl');
const authMiddleware = require('./middleware/authentication');
const doNotReAuthMiddleware = require('./middleware/doNotReAuthenticate');
global.checkUser = null;

const app = new express()

app.use(expressSession({
    secret: 'dragonfire',
    resave: true,
    saveUninitialized: true
}))
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(flash())

const validateMiddleWare = (req, res, next)=>{
    console.log("validation middleware called")
    if(req.files == null || req.body.title == null || req.body.title == null){
    return res.redirect('/create')
}
next()
}
app.use('*', (req, res, next) => {
    checkUser = req.session.userId;
    next()
})
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

app.get("/create", authMiddleware, blogController.createBlog);
app.post("/store", authMiddleware, blogController.store); 
app.get("/deleteBlog/:id", blogController.deleteBlog);

app.route("/updateBlog/:id")
    .get(authMiddleware, blogController.getBlogById)
    .post(authMiddleware, blogController.updateBlog)


app.get('/auth/register', doNotReAuthMiddleware, userController.registerUser)
app.post('/users/register', doNotReAuthMiddleware, userController.storeUser)

app.get('/auth/login', doNotReAuthMiddleware, userController.login)
app.post('/users/login', doNotReAuthMiddleware, userController.processLogin)

app.get('/auth/logout', userController.logout)



