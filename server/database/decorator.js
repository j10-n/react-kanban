const User = require("./models/User");
const Task = require("./models/Task");

module.exports = function(req, res, next) {
  req.database = { User, Task };
  next();
};
