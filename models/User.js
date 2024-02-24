const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  job: String,
  description: String,
  logo: String,
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  // stars: Number,
  // likedPosts: [{type: Schema.Types.ObjectId, ref: "Blog"}],
  // staredAuthors: [{type: Schema.Types.ObjectId, ref: "User"}],
  // collections: [
  //     {
  //         name: String,
  //         isPrivate: Boolean,
  //         blogs: [{type: Schema.Types.ObjectId, ref: "Blog"}],
  //     },
  // ]
});

module.exports = mongoose.model("User", userSchema);