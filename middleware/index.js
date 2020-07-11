// schema access (models)
const Campground = require('../models/CampgroundModel');
const Comment    = require('../models/CommentModel');


module.exports.isLoggedIn = async (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports.checkCampgroundOwnership = async (req, res, next)=>{
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundcampground)=>{
            if(err){
                console.log(err);
                console.log("Error in getting the specified campground!");
                res.redirect("back");
            }
            else{
                if(foundcampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    console.log("You donot have permission to do this!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("back");
    }
}

module.exports.checkCommentOwnership = async (req, res, next)=>{
    if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id, (err, foundComment)=>{
            if(err){
                console.log(err);
                console.log("Error in getting the specified campground!");
                res.redirect("back");
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    console.log("You don't have permission to do this!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("back");
    }
}