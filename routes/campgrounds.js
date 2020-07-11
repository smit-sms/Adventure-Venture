const express = require('express');
const router  = express.Router();
const CampgroundsController = require("../controllers/CampgroundsController");
// schema access (models)
const Campground = require('../models/CampgroundModel');

// view campgrounds
router.get("/", CampgroundsController.campgroundspage);

// add a new campground
router.get("/new", isLoggedIn, CampgroundsController.addnewcampground);
router.post("/", isLoggedIn, CampgroundsController.addnew);

// view a campground
router.get("/:id", CampgroundsController.showcampground);

// edit view campground
router.get("/:id/edit", checkCampgroundOwnership, CampgroundsController.editcampground);

// update campground
router.put("/:id", checkCampgroundOwnership, CampgroundsController.updatecampground);

// destroy campground route
router.delete("/:id", checkCampgroundOwnership, CampgroundsController.deletecampground);


// middlewares
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
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


module.exports = router;