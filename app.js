const express       = require('express');
const app           = express();
const port          = process.env.PORT || 5020;
const mongoose      = require('mongoose');
const passport      = require('passport');
const LocalStrategy = require('passport-local');
const url           = 'mongodb://localhost:27017/Adventure-Venture';
const seedDB        = require('./seeds');

const commentRoutes    = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes       = require('./routes/index');

const User = require("./models/UserModel");

mongoose.connect(url, {useNewUrlParser:true});
const con      = mongoose.connection;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// seeding the DB
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again cute dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();  
})

con.on('open', () => {
    console.log("connected...");
})
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// routes
app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})