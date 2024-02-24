module.exports = class ExpressError extends Error {
  constructor(
    title,
    message,
    status
  ) {
    super();
    this.title = title;
    this.message = message;
    this.status = status;
  }
};
