const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/User");
const ExpressError = require("./utils/ExpressError");
const app = express();

// connect db
mongoose.connect("mongodb://127.0.0.1:27017/blogger");

// config
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride());

// routers
app.use("/authors", userRoutes);
app.use("/", blogRoutes);

app.all("*", (req, res, next) => {
  next(
    new ExpressError(
      "Page wasn't found",
      "The page you are looking for was not found.\nYou may have misspeled they url or the page have been moved.",
      404
    )
  );
});

app.use((err, req, res, next) => {
  if (!err.title) err.title = "Internal server error";
  if (!err.message)
    err.message =
      "We appologize for the inconvenience, please try again later.";
  if (!err.status) err.status = 500;
  console.log(err.stack);
  res.render("error", { err });
  next();
});

// run server
app.listen(3000);
