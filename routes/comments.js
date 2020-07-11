const express = require('express');
const router  = express.Router({mergeParams: true});
const CommentsController    = require("../controllers/CommentsController");

// add a new comment
router.get("/new", isLoggedIn, CommentsController.newcomment);
router.post("/", isLoggedIn, CommentsController.addcomment);

// edit a comment
router.get("/:comments_id/edit", CommentsController.editcomment);
// update a comment
router.put("/:comments_id", CommentsController.updatecomment);

// delete a comment
router.delete("/:comments_id", CommentsController.deletecomment);


// middlewares
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;