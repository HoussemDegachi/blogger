const express = require("express")
const { isLogedin, isBlogAuth } = require("../middlewares/auth")
const workshop = require("../controller/Workshop")
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
const router = express.Router()

router.route("/")
    .post(isLogedin, workshop.init)

router.route("/:blogId")
    .get(isLogedin, isBlogAuth, workshop.show)
    .delete(isLogedin, isBlogAuth, workshop.delete)
    .patch(upload.single("image"), isLogedin, isBlogAuth, workshop.patch)

module.exports = router