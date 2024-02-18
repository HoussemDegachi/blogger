const mongoose = require("mongoose")
const blogsData = require("./blogsData")
const Blog = require("../models/Blog")

mongoose.connect("mongodb://127.0.0.1:27017/blogger")

const seedBlogs = async () => {
    let i = 1
    await Blog.deleteMany({})
    for (let blog of blogsData) {
        const newBlog = new Blog(blog)
        await newBlog.save()
        console.log(`blog ${i} saved`)
        i++
    }
}

const seedDb = async () => {
    await seedBlogs()
}

seedDb().then(() => {
    console.log("Success")
    mongoose.connection.close()
})