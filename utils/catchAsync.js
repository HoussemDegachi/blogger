const ExpressError = require("./ExpressError");

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      if (err.name === "CastError") {
        return next(
          new ExpressError(
            "Id wasn't found",
            "The id you are looking for doesn't exist.\n You might've misspeled it or it have been deleted.",
            404
          )
        );
      } else {
        return next(err);
      }
    });
  };
};
