const express = require('express');
const router  = express.Router();
const CampgroundsController = require("../controllers/CampgroundsController");


// view campgrounds
router.get("/", CampgroundsController.campgroundspage);

// add a new campground
router.get("/new", CampgroundsController.addnewcampground);
router.post("/", CampgroundsController.addnew);

// view a campground
router.get("/:id", CampgroundsController.showcampground);

module.exports = router;