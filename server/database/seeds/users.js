exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users")
        .del()
        .insert([{ username: "justen" }])
        .then(function() {
          return knex("tasks")
            .del()
            .insert([
              {
                title: "grab some dino snacks",
                body: "crusted, flavorful, bunches of goodness",
                priority: "Medium",
                created_by: "justen",
                assigned_to: "j10",
                status: "inQueue"
              },
              {
                title: "work on kaaaaaaaanbaaaaaaaaan",
                body: "what does that even mean?",
                priority: "High",
                created_by: "justen",
                assigned_to: "j10",
                status: "inProgress"
              },
              {
                title: "make this page look noice",
                body: "HA!",
                priority: "High",
                created_by: "justen",
                assigned_to: "j10",
                status: "donezo"
              }
            ]);
        });
    });
};
