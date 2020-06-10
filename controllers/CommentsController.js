// schema access (models)
const Campground = require('../models/CampgroundModel');
const Comment    = require('../models/CommentModel');


module.exports.newcomment = async (req,res) => {
    // find campground by id
    var campground = await Campground.findById(req.params.id);
    if(campground){
        res.render("comments/new", {campground:campground}); 
    }else{
        console.log("Error in Finding the specified campground!");
    } 
}

module.exports.addcomment = async (req,res) => {
    // find campground by id
    var campground = await Campground.findById(req.params.id);
    try {
        if(campground){
            try{
                var comment = new Comment(req.body.comment);
                var commentsaved = await comment.save();
                if(commentsaved){
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id); 
                }
                else{
                    console.log("Error in Finding the specified campground!");
                }
            }
            catch(error){
                console.log(error);
            }        
        }else{
            console.log("Error in Finding the specified campground!");
        }    
    } catch (error) {
        console.log(error);
    } 
}