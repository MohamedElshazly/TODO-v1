const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); 
const { model } = require('./models/users');

let users = require('./models/users');


function initialize(passport) {
    const authenticateUser =  (email, password, done) => {
        users.findOne({Email : email}, async (err, user) => {
            if(err){
                done(err); 
            }else{
                if(user){
                    if(await bcrypt.compare(password, user.Password)){
                        done(null, user);
                    }else{
                        done(null, false, {message : "Invalid Email or Password"});
                    }    
                }else {
                    done(null, false, {message : "Invalid Email or Password"});
                }
            }
        });

    }
   
    passport.use(new LocalStrategy({usernameField : "email"}, authenticateUser)); 
    passport.serializeUser((user, done) => {done(null, user)}); 
    passport.deserializeUser((user, done) => {done(null, user)}); 
}

module.exports = initialize;