const Blog = require("../models/Blog");
const User = require("../models/User");
const idIndex = require("../utils/idIndex");
const { cloudinary } = require("../cloudinary");

module.exports.init = async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);
  const blog = new Blog({
    title: "New draft",
    creationDate: new Date(),
    isDraft: true,
  });
  blog.author = id;
  await blog.save();
  user.blogs.push(blog);
  await user.save();
  res.redirect(`/workshop/${blog._id}`);
};

module.exports.show = async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  res.render("workshop/index", { blog });
};

module.exports.delete = async (req, res) => {
  const { blogId } = req.params;
  const user = await User.findById(req.user._id);
  const index = idIndex(user.blogs, blogId);
  user.blogs.splice(index, 1);
  await user.save();
  const blog = await Blog.findByIdAndDelete(blogId);
  cloudinary.uploader.destroy(blog.image.filename);
  res.redirect(`/authors/${user._id}`);
};

module.exports.patch = async (req, res) => {
  const { blogId } = req.params;
  let { title, data } = req.body;
  const blog = await Blog.findById(blogId);
  data = JSON.parse(data);
  console.log(data);
  let image;

  if (req.file && blog.image.url) {
    cloudinary.uploader.destroy(blog.image.filename);
  }

  if (req.file) {
    image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  } else if (!blog.image) {
    image = {};
  }

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
    title,
    content: data,
    image,
  });
  console.log(updatedBlog);
  res.redirect(`/${blogId}`);
};
