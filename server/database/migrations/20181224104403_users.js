exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", function(table) {
      table.increments("id");
      table.string("username");
    })
    .createTable("tasks", function(table) {
      table.increments("id");
      table.string("title");
      table.string("body");
      table.string("priority");
      table.string("status");
      table.string("created_by");
      table.string("assigned_to");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users").dropTable("tasks");
};
