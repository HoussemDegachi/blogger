const { cloudinary } = require("../cloudinary");
const User = require("../models/User");
const idIndex = require("../utils/idIndex");

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
};

module.exports.delete = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  await cloudinary.uploader.destroy(user.logo.filename);
  for (let blog of user.blogs) {
    await blog.deleteOne();
  }
  for (let collection of user.collections) {
    await collection.deleteOne();
  }
  await user.deleteOne();
  next();
};

module.exports.showSettings = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("authors/settings", { user });
};

module.exports.showCollections = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate("collections.blogs")
    .populate("likedPosts");
  const collections = user.collections.filter((collection) => {
    if (!collection.isPrivate || (req.user && req.user._id.equals(user._id))) {
      return collection;
    }
  });
  user.collections = collections;
  res.render("authors/collections", { author: user });
};

module.exports.showCollection = async (req, res) => {
  const { id, collectionId } = req.params;
  let user = await User.findById(id).populate("collections.blogs");
  user = await user.populate("collections.blogs.author");
  let collection = user.collections.filter((collection) =>
    collection._id.equals(collectionId)
  )[0];
  user.collections = undefined;
  res.render("authors/collection", { user, collection });
};

module.exports.showLiked = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("likedPosts");
  await user.populate("likedPosts.author");
  const collection = {
    isPrivate: true,
    name: "Liked posts",
    blogs: user.likedPosts,
  };
  res.render("authors/collection", { user, collection });
};

module.exports.showFavourites = async (req, res) => {
  const { id } = req.params;
  let author = await User.findById(id).populate("staredAuthors");
  res.render("authors/favourites", { author });
};

module.exports.createCollection = async (req, res) => {
  const id = req.user._id;
  let { name, isPrivate } = req.body;
  if (isPrivate === "on") {
    isPrivate = true;
  } else {
    isPrivate = false;
  }

  const user = await User.findById(id);
  user.collections.push({
    name,
    isPrivate,
  });
  await user.save();
  res.redirect(`/authors/${id}/collections`);
};

module.exports.saveToCollection = async (req, res) => {
  const { collectionId, id } = req.params;
  const { blogId } = req.query;
  const user = await User.findById(id).populate("collections");
  const targetCollection = user.collections.find((collection) =>
    collection._id.equals(collectionId)
  );
  let isSaved = false;
  let i = 0;
  for (let blog of targetCollection.blogs) {
    if (blog.equals(blogId)) {
      isSaved = true;
      break;
    }
    i++;
  }
  if (isSaved) {
    targetCollection.blogs.splice(i, 1);
  } else {
    targetCollection.blogs.push(blogId);
  }
  await user.save();
  res.redirect("/");
};

module.exports.deleteCollection = async (req, res) => {
  const { id, collectionId } = req.params;
  const user = await User.findById(id).populate("collections");
  const newCollections = user.collections.filter(
    (collection) => !collection._id.equals(collectionId)
  );
  user.collections = newCollections;
  await user.save();
  res.redirect(`/authors/${id}`);
};

module.exports.editCollection = async (req, res) => {
  const { id, collectionId } = req.params;
  const { name, isPrivate } = req.body;
  const user = await User.findById(id).populate("collections");
  const targetCollection = user.collections.find((collection) =>
    collection._id.equals(collectionId)
  );
  targetCollection.name = name;
  if (isPrivate === "on") {
    targetCollection.isPrivate = true;
  } else {
    targetCollection.isPrivate = false;
  }
  await user.save();
  res.redirect(`/authors/${id}/collections/${collectionId}`);
};

module.exports.like = async (req, res) => {
  const { id } = req.params;
  const author = await User.findById(id);
  const user = await User.findById(req.user._id);
  const idPos = idIndex(user.staredAuthors, id);
  if (idPos !== -1) {
    author.stars -= 1;
    user.staredAuthors.splice(idPos, 1);
    author.staredBy.splice(idIndex(user.staredBy, id), 1);
  } else {
    author.stars += 1;
    user.staredAuthors.push(id);
    author.staredBy.push(req.user._id);
  }
  await author.save();
  await user.save();
  author;
  res.redirect(`/authors/${id}`);
};
