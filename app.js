const express = require('express');
const app = express();
const port = process.env.PORT || 5020;
const routes = require('./routes/route');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/Blogging';
mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log("connected...")
})
app.set("view engine", "ejs");
app.use(express.json());

app.use('/',routes)


app.listen(5020, ()=>{
    console.log(`Server started on port ${port}`)
})