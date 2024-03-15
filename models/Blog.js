const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  likes: {
    type: Number,
    default: 0,
  },
  likers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  creationDate: Date,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  image: {
    filename: String,
    url: String,
  },
  content: {
    type: {},
    default: {}
  },
  isDraft: Boolean,
});
{
}

blogSchema.virtual("fmCreationDate").get(function () {
  const creationDate = this.creationDate;
  return (
    creationDate.toLocaleString("default", { month: "long" }).slice(0, 3) +
    " " +
    creationDate.getDate() +
    ", " +
    creationDate.getFullYear()
  );
});

module.exports = mongoose.model("Blog", blogSchema);
