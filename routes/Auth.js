const express = require("express");
const passport = require("passport");
const { validateUser, saveReturnTo } = require("../middlewares/auth");
const Auth = require("../controller/Auth");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
const router = express.Router();

router
  .route("/login")
  .get(Auth.showLogin)
  .post(
    saveReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    Auth.login
  );

router
  .route("/register")
  .get(Auth.showRegister)
  .post(upload.single("avatar"), validateUser, Auth.register);

router.route("/logout").post(Auth.logout);

module.exports = router;
