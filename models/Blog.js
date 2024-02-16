const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
	likes: Number,
	dislikes: Number,
	creationDate: Date,
	lastEdited: Date,
	author: {type: Schema.Types.ObjectId, ref: "User"},
	image: String,
	content: [{}],
	isPrivate: Boolean,
	isDraft: Boolean,
});{}

module.exports = mongoose.model("Blog", blogSchema)