const User = require('../models/User')
const path = require('path')
const bcrypt = require('bcrypt')

const registerUser = (req, res) => {
    res.render('register')
}

const storeUser = (req, res) => {
    User.create(req.body, (error, user) => {
        console.log(error)
        if(error) {
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


module.exports = {
    registerUser, storeUser, login, processLogin
}