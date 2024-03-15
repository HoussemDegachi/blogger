if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogs");
const userRoutes = require("./routes/User");
const authRoutes = require("./routes/Auth");
const workshopRoutes = require("./routes/Workshop")
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/User");
const LocalStrategy = require("passport-local");
const ExpressError = require("./utils/ExpressError");
const mongoStore = require("connect-mongo");
const idIndex = require("./utils/idIndex");
const app = express();

// connect db
mongoose.connect(process.env.DB_URL);

// config
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
const store = mongoStore.create({
  mongoUrl: process.env.DB_URL,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "session",
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 3600 * 24 * 7,
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordFields: "password",
    },
    User.authenticate()
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  const paths = req.path.split("/")
  const lastPath = paths[paths.length - 1]
  res.locals.lastPath = lastPath
  res.locals.idIndex = idIndex
  next();
});

// routers
app.use("/", authRoutes);
app.use("/workshop", workshopRoutes)
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
  if (process.env.NODE_ENV !== "production") {
    console.log("error at", req.originalUrl);
    console.log(err.stack);
  }
  res.render("error", { err });
  next();
});

// run server
app.listen(3000);
