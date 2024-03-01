const { cloudinary } = require("../cloudinary");
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

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, job, description } = req.body;
  try {
    await User.findByIdAndUpdate(id, { name, job, description });
    res.redirect(`/authors/${id}`);
  } catch (e) {
    req.flash("error", e.message);
    res.redirect(`/authors/${id}/settings`);
  }
}

module.exports.delete = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  await cloudinary.uploader.destroy(user.logo.filename)
  for (let blog of user.blogs) {
    await blog.deleteOne();
  }
  await user.deleteOne();
  next();
}

module.exports.showSettings = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("authors/settings", { user });
}