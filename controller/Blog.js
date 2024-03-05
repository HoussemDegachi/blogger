const Blog = require("../models/Blog");
const User = require("../models/User");
const idIndex = require("../utils/idIndex");

module.exports.index = async (req, res) => {
  const blogs = await Blog.find({}).populate("author");
  res.render("home", { blogs });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("author");
  const featuredBlogs = await Blog.aggregate([
    { $sample: { size: 6 } },
    // { _id: { $nin: [ blog._id ] } },
  ]);
  await User.populate(featuredBlogs, { path: "author" });
  res.render("blog", { blog, featuredBlogs });
};

module.exports.like = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.user._id);
  const targetPost = await Blog.findById(id);
  const idPos = idIndex(user.likedPosts, id)
  if (idPos !== -1) {
    targetPost.likers.splice(idIndex(targetPost.likers, id), 1)
    targetPost.likes -= 1
    user.likedPosts.splice(idIndex, 1)
  } else {
    targetPost.likers.push(user._id);
    targetPost.likes += 1;
    user.likedPosts.push(id);
  }

  await targetPost.save();
  await user.save();
  res.redirect("/");
};