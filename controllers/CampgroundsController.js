// schema access (models)
const Campground = require('../models/CampgroundModel');


module.exports.landingpage = async (req,res)=>{
    res.render("landing");
}

module.exports.campgroundspage = async (req,res)=>{
    const campgrounds = await Campground.find();
    res.render('index',{campgrounds:campgrounds}); 
}

module.exports.addnewcampground = async (req,res)=>{
    res.render("newcampground");
}

module.exports.addnew = async (req,res)=>{
    // add new campground
    const campground =  new Campground({
        name: req.body.name,
        image: req.body.image,
        description: req.body.desc 
    })
    const saved = await campground.save();
    if(saved){
        res.redirect('/campgrounds');
    }
    else{
        console.log("Some Error in Adding the Campground!");
    }
}

// show a campground info
module.exports.showcampground = async (req,res)=>{
    const foundcampground = await (await Campground.findById(req.params.id)).execPopulate("Comment");
    if(foundcampground){
        res.render("showcamground",{campground:foundcampground});  
    }else{
        console.log("Error in Finding the specified campground!");
    } 
}