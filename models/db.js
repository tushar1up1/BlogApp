const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://tushar:covid19@cluster0-fxprk.mongodb.net/genericDB?retryWrites=true&w=majority');
mongoose.connection.on("connected", function(){
    console.log("Application is connected to Databse");
})