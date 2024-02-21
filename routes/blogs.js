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

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    const featuredBlogs = await Blog.aggregate([
      { $sample: { size: 6 } },
      // { _id: { $nin: [ blog._id ] } },
    ]);
    res.render("blog", { blog, featuredBlogs });
  })
);

module.exports = router;
