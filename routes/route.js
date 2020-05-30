const express = require('express')
const router = express.Router()

var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/57e1dd4a4350a514f1dc84609620367d1c3ed9e04e50744075277bd4964fc3_340.jpg"},
    {name: "Granite Hills", image: "https://pixabay.com/get/57e1dd4a4350a514f1dc84609620367d1c3ed9e04e50744075277bd4964fc3_340.jpg"},
    {name: "Mountain Goat", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744075277bd4964fc3_340.jpg"}
]
// schema access (models)
// const Blog = require('../models/blog')

router.get("/", (req,res)=>{
    res.render("landing");
})

router.get("/campgrounds", (req,res)=>{
    res.render('campgrounds',{campgrounds:campgrounds}); 
})

router.get("/campgrounds/new", (req,res)=>{
    res.render("newcampground");
})

router.post("/campgrounds", (req,res)=>{
    // add new campground
    var name  = req.body.name
    var image = req.body.image
    var newcampground = {name:name, image:image}
    campgrounds.push(newcampground);
    res.redirect('/campgrounds');
})

module.exports = router