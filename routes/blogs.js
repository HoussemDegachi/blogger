const express = require("express");
const blog = require("../controller/Blog");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

router.route("/")
  .get(catchAsync(blog.index));

router.route("/:id")
  .get(catchAsync(blog.show));

module.exports = router;
