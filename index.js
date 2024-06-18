const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require('body-parser');
const app = express();
const QRCode = require('qrcode');

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
    message = "";
    res.render("index" ,{ message });
})
app.post("/ajouterURL" ,async (req , res) =>{
    const urlLong = req.body.urlLong;
    const urlCourt = req.body.urlCourt;
    const qrCodeDataURL = await QRCode.toDataURL(urlLong);
    let id = (new Date()).getTime().toString(16)
    let valide = 0 ;
    for(let i = 0 ; i < allURL.length ; i++){
        if(urlCourt == allURL[i].urlCourt){
            valide += 1 ;
        }
    }
    if(valide != 0){
        message = "URL court déjà utilisé";
        res.render("index" ,{ message });
    }else{
        obj.id = id ;
        obj.urlLong = urlLong ;
        obj.urlCourt = urlCourt ;
        
        obj.codeQR = qrCodeDataURL ;
        allURL.push(obj);
        obj = {};
           
        allURLResponse();
        res.render("allURL" , { allURL })
    }
    
    
})
app.get("/ajouterURL" ,async (req , res) =>{
    
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

app.delete("/supprimer/:id", (req, res) => {
    const { id } = req.params;
 
    const articleIndex = allURL.findIndex((allURL) => allURL.id === id);
    allURL.splice(articleIndex, 1);

    allURLResponse();
    res.render("allURL" , { allURL })

});

const port = 3005;
app.listen(port,function(){
    console.log(`l'application ecoute sur le port ${port}`);
    console.log(`l'application est disponible sur http://localhost:${port}`);
})