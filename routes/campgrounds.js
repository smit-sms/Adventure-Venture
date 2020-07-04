const express = require('express');
const router  = express.Router();
const CampgroundsController = require("../controllers/CampgroundsController");


// view campgrounds
router.get("/", CampgroundsController.campgroundspage);

// add a new campground
router.get("/new", isLoggedIn, CampgroundsController.addnewcampground);
router.post("/", isLoggedIn, CampgroundsController.addnew);

// view a campground
router.get("/:id", CampgroundsController.showcampground);

// middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;