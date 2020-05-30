const express = require('express')
const router = express.Router()

// schema access (models)
// const Blog = require('../models/blog')

router.get("/", (req,res)=>{
    res.render("landing")
})

router.get("/blogs", (req,res)=>{
    res.render("landing")
})

module.exports = router