const mongoose = require('mongoose'); 

const usersSchema = mongoose.Schema({
    userID : {
        type : String,
        require : true
    },    
    Username : {
        type : String, 
        require : true
    },
    Email : {
        type : String, 
        require : true
    },
    Password :{
        type : String, 
        require : true
    } 
});

let Users = module.exports = mongoose.model('Users', usersSchema); 