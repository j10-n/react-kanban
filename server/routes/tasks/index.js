const express = require("express");
const router = express.Router();

// router
//   .route("/users")
//   .get((req, res) => {
//     return new req.database.User()
//       .fetchAll()
//       .then(users => {
//         return res.json(users);
//       })
//       .catch(err => {
//         console.log(err);
//         res.sendStatus(500);
//       });
//   })
//   .post((req, res) => {
//     const username = req.body.username;
//     return new req.database.User({ username })
//       .save()
//       .then(user => {
//         return res.json({ success: true });
//       })
//       .catch(err => {
//         console.log(err);
//         res.sendStatus(500);
//       });
//   });

// router.route("/tasks").get((req, res) => {
//   return new req.database.Task({ task })
//     .save()
//     .then(task => {
//       return res.json({ success: true });
//     })
//     .catch(err => {
//       console.log(err);
//       res.sendStatus(500);
//     });
// });

router.post("/tasks/delete", (req, res) => {
  let id = req.body.useID;
  console.log(req.body);
  return new req.database.Task({ id: id })
    .where({ id: id })
    .destroy()
    .then(data => {
      return res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/edit/:id", (req, res) => {
  console.log("EDIT");
  console.log("reqbody", req.body);
  return new req.database.Task({ id: req.params.id })
    .save(
      {
        title: req.body.title
        // body: req.body.body,
        // assigned_to: req.assigned_to,
        // created_by: req.body.created_by,
        // priority: req.body.priority,
        // status: req.body.status
      },
      { patch: true }
    )
    .then(card => {
      console.log("card edited");
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.route("/tasks").get((req, res) => {
  return new req.database.Task()
    .fetchAll()
    .then(tasks => {
      return res.json(tasks);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/tasks", (req, res) => {
  const data = req.body;
  console.log(data);
  const title = data.title;
  const body = data.body;
  const priority = data.priority;
  const status = data.status;
  const created_by = data.created_by;
  const assigned_to = data.assigned_to;
  return new req.database.Task({
    title,
    body,
    priority,
    status,
    created_by,
    assigned_to
  })
    .save()
    .then(data => {
      console.log(data);
      return res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});
// router.route("/edit/:id").post((req, res) => {
//   console.log("edit");
//   return new req.database.Task()
//     .where("id", req.params.id)
//     .fetch()
//     .then(card =>
//       new req.database.Task({ id: req.params.id })
//         .save(
//           {
//             title: req.body.title,
//             body: req.body.body,
//             assigned_to: req.assigned_to,
//             created_by: req.body.created_by,
//             priority: req.body.priority,
//             status: req.body.status
//           },
//           { patch: true }
//         )
//         .then(() => {
//           return res.json({ success: true });
//         })
//     );
// });
module.exports = router;
