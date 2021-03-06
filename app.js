
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const hostname = "127.0.0.1";
const port = 8080;
const mongojs = require("mongojs");

var db =mongojs("app",["people"]);
var app = express();

// var logger = (req,res,next) =>{
    
//     console.log("logging..");
//     next();

// }

// app.use(logger);
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({extended:false}));


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

// app.use(express.static(path.join(__dirname,"client")));

var people = ["greg","ben","jeff"];
var peopleVerbose = [
    {
        name :"jenny",
        last : "jennyagain"    
    },
    {
        name : "johnny",
        last : "johnnyagain"
    }
];


app.get('/',(req,res)=>{
    db.people.find((error,docs)=>{
        console.log(docs);
        peopleVerbose = docs;
        res.render("index",{
            title: people,
            body: peopleVerbose
        });
    })


});

app.post("/users/add",(req,res) =>{
    var newpersonVerbose = [
        {
            name: req.body.name,
            last: req.body.last
        }
    ]
    console.log(newpersonVerbose);
    res.render('index',{
        title: people,
        body: newpersonVerbose
    })
});

app.listen(port,hostname,() =>{

    console.log("listening on port" + port);

});