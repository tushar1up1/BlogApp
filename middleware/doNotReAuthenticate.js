module.exports = (req, res, next) =>{
    if(req.session.userId){
        console.log("Do Not ReAuth Middleware called");
        return res.redirect('/') 
    }
    next()
}