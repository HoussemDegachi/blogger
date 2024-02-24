const express = require("express");
const catchAsync = require("../utils/catchAsync");
const Blog = require("../models/Blog");
const User = require("../models/User");
const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const blogs = await Blog.find({}).populate("author");
    res.render("home", { blogs });
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author");
    const featuredBlogs = await Blog.aggregate([
      { $sample: { size: 6 } },
      // { _id: { $nin: [ blog._id ] } },
    ]);
    await User.populate(featuredBlogs, { path: "author" });
    res.render("blog", { blog, featuredBlogs });
  })
);

module.exports = router;
