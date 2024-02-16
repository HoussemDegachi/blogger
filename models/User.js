const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    job: String,
    image: String,
    blogs: [{type: Schema.Types.ObjectId, ref: "Blog"}],
    stars: Number,
    likedPosts: [{type: Schema.Types.ObjectId, ref: "Blog"}],
    staredUsers: [{type: Schema.Types.ObjectId, ref: "User"}],
    collections: [
        {
            name: String,
            isPrivate: Boolean,
            blogs: [{type: Schema.Types.ObjectId, ref: "Blog"}],
        },
    ]
})

module.exports = mongoose.model("User", userSchema)