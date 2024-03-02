const express = require("express");
const catchAsync = require("../utils/catchAsync");
const user = require("../controller/User");
const { isLogedin, isUserAuthorized } = require("../middlewares/auth");
const auth = require("../controller/Auth");
const router = express.Router();

router.route("/").get(catchAsync(user.index));

router
  .route("/:id")
  .get(catchAsync(user.show))
  .put(isLogedin, isUserAuthorized, catchAsync(user.update))
  .delete(catchAsync(user.delete), auth.logout);

router
  .route("/:id/settings")
  .get(isLogedin, isUserAuthorized, catchAsync(user.showSettings));

router.route("/:id/collections")
  .get(catchAsync(user.showCollections))
  .post(isLogedin, isUserAuthorized, catchAsync(user.createCollection))

router.route("/:id/collections/:collectionId")
  .get(catchAsync(user.showCollection))

module.exports = router;
