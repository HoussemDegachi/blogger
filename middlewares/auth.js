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
        next()
    }
}