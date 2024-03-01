const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  job: String,
  description: String,
  logo: {
    filename: String,
    url: String
  },
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

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameCaseInsensitive: true,
});

userSchema.virtual("blogsLength").get(function () {
  return this.blogs.length;
});

userSchema.virtual("logo.fmurl").get(function () {
  return this.logo.url.replace("/upload", "/upload/w_100,h_100,c_fill")
})

module.exports = mongoose.model("User", userSchema);
