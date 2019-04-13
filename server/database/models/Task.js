const bookshelf = require("../bookshelf");

class Task extends bookshelf.Model {
  get tableName() {
    return "tasks";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Task", Task);
