const User = require("../models/User");

module.exports.index = async (req, res) => {
  let authors = await User.find({});
  authors = authors.sort((a, b) => b.blogs.length - a.blogs.length);
  res.render("authors/index", { authors });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const author = await User.findById(id).populate("blogs");
  res.render("authors/author", { author });
};
