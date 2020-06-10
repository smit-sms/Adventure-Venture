const express = require('express')
const router  = express.Router()
const CampgroundsController = require("../controllers/CampgroundsController");
const CommentsController    = require("../controllers/CommentsController");

// <----------------------- CAMPGROUND ROUTES ----------------------------->

// landing/home page
router.get("/", CampgroundsController.landingpage);
// view campgrounds
router.get("/campgrounds", CampgroundsController.campgroundspage);
// add a new campground
router.get("/campgrounds/new", CampgroundsController.addnewcampground);
router.post("/campgrounds", CampgroundsController.addnew);
// view a campground
router.get("/campgrounds/:id", CampgroundsController.showcampground);


// <----------------------- COMMENTS ROUTES ----------------------------->

// add a new comment
router.get("/campgrounds/:id/comments/new", CommentsController.newcomment);
router.post("/campgrounds/:id/comments", CommentsController.addcomment);



module.exports = router;