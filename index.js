// const express = require("express");
// const user = require("./models").user;
// const todoList = require("./models").todoList;
// const todoItem = require("./models").todoItem;
// const app = express();
// const PORT = 4000;

// app.get("/users", async (req, res) => {
//   const users = await user.findAll();
//   res.send(users);
// });

// app.get("/todolists", async (req, res) => {
//   try {
//     const todolists = await todoList.findAll();
//     res.send(todolists);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// app.get("/todoitems", async (req, res) => {
//   try {
//     const todoItems = await todoItem.findAll();
//     res.send(todoItems);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));

const express = require("express");
const app = express();
const PORT = 4000;

const User = require("./models").user;
const TodoList = require("./models").todoList;

app.use(express.json());

app.post("/echo", (req, res) => {
  res.json(req.body);
});

app.get("/users/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await User.findByPk(userId);
  if (!user) {
    res.status(404).send("User not found!");
  } else {
    res.send(user);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address");
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

app.put("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => console.log(`Server listens in port: ${PORT}`));
