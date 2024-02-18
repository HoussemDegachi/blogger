const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  likes: Number,
  // likers: [{type: Schema.Types.ObjectId, ref: "User"}],
  creationDate: Date,
  // author: {type: Schema.Types.ObjectId, ref: "User"},
  author: String,
  image: String,
  // content: [{}],
  content: String,
  // isPrivate: Boolean,
  // isDraft: Boolean,
});
{
}

module.exports = mongoose.model("Blog", blogSchema);
