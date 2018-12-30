// This is a function to wrap all controller function in, so that try{} cartch(e) {} doesn't need to be used every time.
exports.catchErrors = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};