const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose")
const app = express();

// connect db
mongoose.connect("mongodb://127.0.0.1:27017/blogger")

// config
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride());

// routers
app.get("/", (req, res) => {
  res.render("home");
});

// run server
app.listen(3000);
