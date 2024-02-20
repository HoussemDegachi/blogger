const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Blog = require("../models/Blog");
const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const blogs = await Blog.find({});
    res.render("home", { blogs });
  })
);

module.exports = router;
