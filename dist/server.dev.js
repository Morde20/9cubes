"use strict";

var express = require("express");

var port = process.env.PORT || 3000;

var path = require("path");

var publicPath = path.join(__dirname, "build");
var app = express();
app.use(express["static"](publicPath));
app.get("*", function (req, res) {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.listen(port, function () {
  console.log("Server is up on port ".concat(port, "!"));
});