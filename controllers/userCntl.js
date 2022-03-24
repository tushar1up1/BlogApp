const User = require('../models/User')
const path = require('path')
const bcrypt = require('bcrypt')

const registerUser = (req, res) => {
    //console.log(req.session.validationErrors);
    //res.render('register', {errors: req.session.validationErrors})
    var username = ""
    var password = ""
    const data = req.flash('data')[0];
    if(typeof data != "undefined"){
        username = data.username
        password = data.password
    }
    res.render('register', {
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    }) // read back error messages from flash
}

const storeUser = (req, res) => {
    User.create(req.body, (error, user) => {        
        if(error) {
            //console.log(error)
            const validationErrors = Object.keys(error.errors).map(key =>error.errors[key].message
                    //console.log(error.errors[key].message);                    
                )
            //req.session.validationErrors = validationErrors; 
            req.flash('validationErrors', validationErrors); //Instead of directly keeping message into session, add them through flash    
            console.log("storeUser" + validationErrors);  
            req.flash('data', req.body) 
            return res.redirect('/auth/register') // You can pass some data to display error message
        }
        res.redirect('/')
    })
}

const login = (req, res) => {
    res.render('login')
}

const processLogin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username}, function(error, user) {
        if(user) {
            bcrypt.compare(password, user.password, (error, available) => {
                if(available) { //password matching 
                    req.session.userId = user._id;
                    res.redirect('/')
                } else {
                    res.redirect('/auth/login'/*, {validuser: false}*/)
                }
            })
        } else {
            res.redirect('/auth/login'/*, {validuser: false}*/)
        }
    })

}

const logout = (req, res) => {
    req.session.destroy(() =>{
        res.redirect('/')
    })
}


module.exports = {
    registerUser, storeUser, login, processLogin, logout
}