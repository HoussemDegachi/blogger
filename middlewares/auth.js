const { user: userSchema } = require("../schemas/auth");

module.exports.validateUser = (req, res, next) => {
  const { name, email, job, password, description } = req.body;
  const userData = { name, email, job, description, password };
  const { error } = userSchema.validate(userData);
  if (error) {
    const msg = error.message;
    req.flash("error", msg);
    res.redirect("/register");
  } else {
    next();
  }
};

module.exports.isLogedin = (req, res, next) => {
  const authState = !!req.user;
  if (authState) {
    next();
  } else {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You need to be signed in to access this feature.");
    res.redirect("/login");
  }
};

module.exports.saveReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.isUserAuthorized = (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  if (user._id.equals(id)) {
    return next();
  }
  req.flash("error", "Access denied, You are not authorized");
  res.redirect(`/authors/${id}`);
};
