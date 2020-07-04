const express = require('express');
const router  = express.Router({mergeParams: true});
const CommentsController    = require("../controllers/CommentsController");

// add a new comment
router.get("/new", isLoggedIn, CommentsController.newcomment);
router.post("/", isLoggedIn, CommentsController.addcomment);

// middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;