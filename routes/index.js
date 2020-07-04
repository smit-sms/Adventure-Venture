const express = require('express');
const router  = express.Router();
const passport      = require('passport');
const User = require("../models/UserModel");

router.get("/", (req,res)=>{
    res.render("landing");
})

// <------------------ AUTH ROUTES --------------------->

router.get("/register", (req,res)=>{
    res.render("register");
})

// handle signup logic
router.post("/register", (req,res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password,(err, User)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res, ()=>{
            res.redirect("/campgrounds");
        });
    } )
})
 
// show login form
router.get("/login", (req,res)=>{
    res.render("login"); 
})

// login logic post
// router.post("/login",middleware, callback)
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }),(req,res)=>{

});

// logout route
router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/campgrounds");
})

// <------------------ END AUTH ROUTES --------------------->

// middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
} 


module.exports = router;