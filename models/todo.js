const mongoose = require('mongoose'); 

const todoSchema = mongoose.Schema({
    userID : {
        type : String, 
        require : true
    }, 
    Item : {
        type : String, 
        require : true
    }
}); 

let ToDo = module.exports = mongoose.model('ToDo', todoSchema);