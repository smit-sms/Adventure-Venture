const express = require('express');
const app = express();
const port = process.env.PORT || 5020;
const routes = require('./routes/route');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/AdventureVenture';
mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

con.on('open', () => {
    console.log("connected...")
})
app.set("view engine", "ejs");
app.use(express.json());

app.use('/',routes)

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})