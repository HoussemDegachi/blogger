const Blog = require("../models/Blog");
const User = require("../models/User");

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
  const targetPost = await Blog.findById(id)
  targetPost.likers.push(user._id)
  targetPost.liked += 1
  user.likedPosts.push(id)
  await targetPost.save()
  await user.save()
  res.redirect("/")
};
