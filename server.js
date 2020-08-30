if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express'); 
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');   

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection; 

db.once('open', () => {
    console.log('connected to database!!'); 
});

db.on('error', (err) => {
    console.log(err); 
});

let users = require('./models/users');

const initializePassport = require('./passport-config'); 
initializePassport(passport);

const todoController = require('./controllers/todoController');
const usersController = require('./controllers/usersController');  

const app = express();
app.set('view engine', 'ejs'); 
app.use(express.static('./public')); 
app.use(express.json()); 
app.use(express.urlencoded({extended : false}));
app.use(methodOverride('_method'));
app.use(flash()); 
app.use(session({
    secret : process.env.SECRET_SESSION, 
    resave:false, 
    saveUninitialized:false
})); 

app.use(passport.initialize()); 
app.use(passport.session());

todoController(app);
usersController(app);


app.listen(3000);