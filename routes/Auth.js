const express = require("express");
const passport = require("passport");
const { validateUser } = require("../middlewares/auth");
const Auth = require("../controller/Auth")
const router = express.Router();

router
  .route("/login")
  .get(Auth.showLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    Auth.login
  );

router
  .route("/register")
  .get(Auth.showRegister)
  .post(
    validateUser,
    Auth.register
  );

router.route("/logout").post(Auth.logout);

module.exports = router;
