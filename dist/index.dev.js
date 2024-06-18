"use strict";

var express = require("express");

var path = require("path");

var fs = require("fs");

var bodyParser = require('body-parser');

var app = express();

var QRCode = require('qrcode');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
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

var allURL = [];
var obj = {};
app.get("/", function (req, res) {
  message = "";
  res.render("index", {
    message: message
  });
});
app.post("/ajouterURL", function _callee(req, res) {
  var urlLong, urlCourt, qrCodeDataURL, id, valide, i;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          urlLong = req.body.urlLong;
          urlCourt = req.body.urlCourt;
          _context.next = 4;
          return regeneratorRuntime.awrap(QRCode.toDataURL(urlLong));

        case 4:
          qrCodeDataURL = _context.sent;
          id = new Date().getTime().toString(16);
          valide = 0;

          for (i = 0; i < allURL.length; i++) {
            if (urlCourt == allURL[i].urlCourt) {
              valide += 1;
            }
          }

          if (valide != 0) {
            message = "URL court déjà utilisé";
            res.render("index", {
              message: message
            });
          } else {
            obj.id = id;
            obj.urlLong = urlLong;
            obj.urlCourt = urlCourt;
            obj.codeQR = qrCodeDataURL;
            allURL.push(obj);
            obj = {};
            allURLResponse();
            res.render("allURL", {
              allURL: allURL
            });
          }

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get("/ajouterURL", function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          allURLResponse();
          res.render("allURL", {
            allURL: allURL
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});

function allURLResponse() {
  var _loop = function _loop(i) {
    app.get("/" + allURL[i].urlCourt, function (req, res) {
      res.redirect(allURL[i].urlLong);
    });
  };

  for (var i = 0; i < allURL.length; i++) {
    _loop(i);
  }
}

app["delete"]("/supprimer/:id", function (req, res) {
  var id = req.params.id;
  var articleIndex = allURL.findIndex(function (allURL) {
    return allURL.id === id;
  });
  allURL.splice(articleIndex, 1);
  allURLResponse();
  res.render("allURL", {
    allURL: allURL
  });
});
var port = 3005;
app.listen(port, function () {
  console.log("l'application ecoute sur le port ".concat(port));
  console.log("l'application est disponible sur http://localhost:".concat(port));
});