const User = require("../models/User");

module.exports.login = (req, res) => {
    req.flash("success", "Welcome Back!!");
    res.redirect("/");
  };

module.exports.showLogin = (req, res) => {
  res.render("auth/login");
};

module.exports.register = async (req, res) => {
  const { name, email, job, password, description } = req.body;
  const userData = { name, email, job, description };
  try {
    const u = new User(userData);
    const registerdUser = await User.register(u, password);
    req.login(registerdUser, (err) => {
      if (err) return next(err);
      req.flash("success", `Welcome ${name}!`);
      res.redirect("/");
    });
  } catch (e) {
      if (e.code === 11000) {
          req.flash("error", "A user with the given name is already registerd");
      } else {
          req.flash("error", "We are unable to register you now, try again later");
    }
    res.redirect("/register");
  }
};

module.exports.showRegister = (req, res) => {
  res.render("auth/register");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Hope to see you again soon");
    res.redirect("/");
  });
};
