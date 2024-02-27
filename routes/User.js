const express = require("express")
const catchAsync = require("../utils/catchAsync")
const user = require("../controller/User")
const router = express.Router()

router.route("/")
    .get(catchAsync(user.index)) 

router.route("/:id")
    .get(catchAsync(user.show))

module.exports = router