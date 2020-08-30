// Creating the routes for viewing the tasks for a particular user, adding tasks 
// and deleting tasks 
const passport = require('passport');
const todos = require('../models/todo');

module.exports = function(app){

    app.get('/', (req, res) => {
        res.redirect('/todo');
    });
    
    app.get('/todo', checkAuthenticated, (req, res) => {
        todos.find({userID : req.user.userID}, (err, data) => {
            if(err){
                console.log(err);
            }else{
                res.render('home', {todos : data}); 
            }
        })
    });

    
    app.post('/todo', (req, res) => {
        let newTodo = new todos();
        if(!req.user){
            return res.redirect('/login');
        }
        newTodo.userID = req.user.userID; 
        newTodo.Item = req.body.item;
        newTodo.save((err) => {
            if(err){
                console.log(err); 
            }else {
                res.redirect('/todo');
            }
        }) 

    }); 

    app.delete('/todo/:item', (req, res) => {
        todos.find({Item : req.params.item.replace(/\-/g, " ")}).deleteOne((err, data) => {
            if(err){
                console.log(err);
            }else{
                res.json(data);
            }
        });
    });

    function checkAuthenticated(req, res, next) { 
        if(req.isAuthenticated()){
            return next(); 
        }
        res.redirect('/login');
    }
}