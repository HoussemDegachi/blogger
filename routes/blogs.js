const express = require("express");
const blog = require("../controller/Blog");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLogedin } = require("../middlewares/auth");

router.route("/")
  .get(catchAsync(blog.index));

router.route("/:id")
  .get(catchAsync(blog.show));

router.route("/:id/like")
  .post(isLogedin, blog.like)

module.exports = router;
