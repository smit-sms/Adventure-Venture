const express = require('express')
const router = express.Router()
const CampgroundsController = require("../controllers/CampgroundsController");

// landing/home page
router.get("/", CampgroundsController.landingpage);
// view campgrounds
router.get("/campgrounds", CampgroundsController.campgroundspage);
// add a new campground
router.get("/campgrounds/new", CampgroundsController.addnewcampground);
router.post("/campgrounds", CampgroundsController.addnew);

//


module.exports = router