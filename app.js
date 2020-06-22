const express  = require('express');
const app      = express();
const port     = process.env.PORT || 5020;
const routes   = require('./routes/index');
const mongoose = require('mongoose');
const url      = 'mongodb://localhost:27017/Adventure-Venture';
const seedDB   = require('./seeds');

mongoose.connect(url, {useNewUrlParser:true});
const con      = mongoose.connection;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

seedDB();
con.on('open', () => {
    console.log("connected...");
})
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + "/public"));


app.use('/',routes);

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})