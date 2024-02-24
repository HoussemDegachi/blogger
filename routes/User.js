const express = require("express")
const catchAsync = require("../utils/catchAsync")
const User = require("../models/User")
const router = express.Router()

router.get("/", catchAsync(async (req, res) => {
    const authors = await User.find({})
    res.render("authors/index", {authors})
}))

router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params
    const author = await User.findById(id).populate("blogs")
    res.render("authors/author", { author })
}))

module.exports = router