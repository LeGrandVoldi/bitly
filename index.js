const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
/*
let tab = ["lubanza","kiesse","voldi"];
tab.forEach(function(element){
    app.get("/"+element, (req, res) => {
        res.send(element);
    });
})
*/
let allURL = [] ;
let obj = {

}
app.get("/",(req , res) =>{
    res.render("index");
})
app.post("/ajouterURL" , (req , res) =>{
    const urlLong = req.body.urlLong;
    const urlCourt = req.body.urlCourt;
    obj.urlLong = urlLong ;
    obj.urlCourt = urlCourt ;
    allURL.push(obj);
    obj = {};
    
    allURLResponse();
    res.render("allURL" , { allURL })
    
})

function allURLResponse(){
    for(let i = 0 ; i < allURL.length ; i++){
        app.get("/"+allURL[i].urlCourt, (req, res) => {
            res.redirect(allURL[i].urlLong);
        });   
    }
}
const port = 3005;
app.listen(port,function(){
    console.log(`l'application ecoute sur le port ${port}`);
    console.log(`l'application est disponible sur http://localhost:${port}`);
})