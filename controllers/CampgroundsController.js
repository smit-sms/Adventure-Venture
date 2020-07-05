// schema access (models)
const Campground = require('../models/CampgroundModel');

module.exports.campgroundspage = async (req,res)=>{
    const campgrounds = await Campground.find();
    res.render('campgrounds/index',{campgrounds:campgrounds}); 
}

module.exports.addnewcampground = async (req,res)=>{
    res.render("campgrounds/newcampground");
}

module.exports.addnew = async (req,res)=>{
    // add new campground
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    const campground =  new Campground({ 
        name: req.body.name,
        image: req.body.image,
        description: req.body.desc,
        author: author 
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
module.exports.showcampground = async (req,res)=> {
    var foundcampground = await (await Campground.findById(req.params.id)).execPopulate("comments");
    if(foundcampground){
        res.render("campgrounds/showcamground",{campground:foundcampground});  
    }else{
        console.log("Error in Finding the specified campground!");
    } 
}

// Edit a campground
module.exports.editcampground = async (req,res)=>{
    var foundcampground = await Campground.findById(req.params.id);
    if(foundcampground){
        res.render("campgrounds/edit",{campground: foundcampground});
    }
    else{
        console.log("Error in getting the specified campground!");
    }
}

// update the campground & redirect
module.exports.updatecampground = async (req,res)=>{
    try{
        var foundcampground = await Campground.findById(req.params.id);
        foundcampground.name        = req.body.campground.name;
        foundcampground.image       = req.body.campground.image;
        foundcampground.description = req.body.campground.description;
        try{
            const updated = await foundcampground.save();
            res.redirect("/campgrounds/" + req.params.id);
        }
        catch(error){
            console.log(error);
            res.redirect("/campgrounds");
        }
    }
    catch(error){
        console.log(error);
    }
}
