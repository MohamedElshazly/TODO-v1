const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); 
const passport = require('passport');


// import in the users model 
let users = require("D:/nodeProjects/newTODO/models/users");

module.exports = function(app) {

    app.get('/login', checkNotAuthenticated, (req, res) => {
        res.render('login');
    });
    app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
        successRedirect :'/todo', 
        failureRedirect : '/login',
        failureFlash:true
    }));
    
    app.get('/register', checkNotAuthenticated, (req, res) => {
        res.render('register', {err : ""});
    });
    
    app.post('/register', checkNotAuthenticated,  (req, res) => {
        users.findOne({Username : req.body.name}, async (err, data) => {
            if(err){
                console.log(err); 
            }if (data){
                res.render('register', {err: "Username already exists"});
            }else{
                let newUser = new users(); 
                try{
                    const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
                    newUser.userID = Date.now().toString();
                    newUser.Username = req.body.name; 
                    newUser.Email = req.body.email; 
                    newUser.Password = hashedPassword;
                    newUser.save((err) => {
                        if(err){
                            console.log(err);
                        }else {
                            res.redirect('/login');  
                        }
                    });
                }catch{
                    res.redirect('/register');
                }   
            }
        });
        
        

    });

    app.delete('/logout', (req, res) => {
        req.logOut(); 
        res.redirect('/login')
    })
    
    
    function checkNotAuthenticated(req, res, next) {
        if(req.isAuthenticated()){
            return res.redirect('/todo');  
        }
        next();
    }
    
}