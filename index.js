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

// const express = require("express");
// const app = express();
// const PORT = 4000;

// const User = require("./models").user;
// const TodoList = require("./models").todoList;

// app.use(express.json());

// app.post("/echo", (req, res) => {
//   res.json(req.body);
// });

// app.get("/users/:userId", async (req, res) => {
//   const userId = parseInt(req.params.userId);
//   const user = await User.findByPk(userId);
//   if (!user) {
//     res.status(404).send("User not found!");
//   } else {
//     res.send(user);
//   }
// });

// app.post("/users", async (req, res, next) => {
//   try {
//     const email = req.body.email;
//     if (!email || email === " ") {
//       res.status(400).send("Must provide an email address");
//     } else {
//       const user = await User.create(req.body);
//       res.json(user);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// app.put("/users/:userId", async (req, res, next) => {
//   try {
//     const userId = parseInt(req.params.userId);
//     const userToUpdate = await User.findByPk(userId);
//     if (!userToUpdate) {
//       res.status(404).send("User not found");
//     } else {
//       const updatedUser = await userToUpdate.update(req.body);
//       res.json(updatedUser);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// app.get("/users/:userId/lists", async (req, res, next) => {
//   try {
//     const userId = parseInt(req.params.userId);
//     const user = await User.findByPk(userId, {
//       include: [TodoList],
//     });
//     if (!user) {
//       res.status(404).send("User not found!");
//     } else {
//       res.send(user.todoLists);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// app.post("/users/:userId/lists", async (req, res, next) => {
//   try {
//     const userId = parseInt(req.params.userId);
//     const user = await User.findByPk(userId);
//     if (!user) {
//       res.status(404).send("User not found!");
//     } else {
//       // const newList = await TodoList.create({ userId, ...req.body });
//       const newList = await TodoList.create({
//         userId: userId,
//         name: req.body.name,
//       });
//       res.json(newList);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// app.put("/users/:userId/lists/:listId", async (req, res, next) => {
//   try {
//     const listId = parseInt(req.params.listId);
//     const updateList = await TodoList.findByPk(listId);
//     if (!updateList) {
//       res.status(404).send("List not found!");
//     } else {
//       const listUpdated = await updateList.update(req.body);
//       res.json(listUpdated);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// app.delete("/users/:userId/lists", async (req, res, next) => {
//   try {
//     const userId = parseInt(req.params.userId);
//     const user = await User.findByPk(userId, { include: [TodoList] });
//     if (!user) {
//       res.status(404).send("User not found!");
//     } else {
//       user.todoLists.forEach(async (list) => await list.destroy());
//       res.status(204);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// app.delete("/users/:userId/lists/:listId", async (req, res, next) => {
//   try {
//     const { listId, userId } = req.params;

//     // const userId = parseInt(req.params.userId);
//     // const listId = parseInt(req.params.listId);
//     const user = await User.findByPk(userId, {
//       include: { model: TodoList, where: { id: listId } },
//     });
//     if (!user) {
//       res.status(404).send("User not found!");
//     } else {
//       user.todoLists.forEach(async (list) => await list.destroy());
//       res.status(204);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// app.listen(PORT, () => console.log(`Server listens in port: ${PORT}`));

const express = require("express");
const app = express();
const PORT = 4000;

const User = require("./models").user;
const TodoList = require("./models").todoList;

app.use(express.json());

app.post("/echo", (req, res) => {
  res.json(req.body);
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

app.get("/users/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found!");
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

app.get("/todolists", async (req, res) => {
  const lists = await TodoList.findAll();
  res.json(lists);
});

app.post("/todolists", async (req, res, next) => {
  try {
    const list = await TodoList.create(req.body);
    if (list) {
      res.json(list);
    } else {
      res.status(400).send("The list doesn't exist!");
    }
  } catch (e) {
    next(e);
  }
});

app.put("/todolists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const listToUpdate = await TodoList.findByPk(listId);
    if (!listToUpdate) {
      res.status(404).send("List not found");
    } else {
      const updatedList = await listToUpdate.update(req.body);
      res.json(updatedList);
    }
  } catch (e) {
    next(e);
  }
});

//getting all the lists for one specific user
app.get("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, {
      include: [TodoList],
    });
    if (user) {
      res.json(user.TodoLists);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

app.post("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId);
    const newList = await TodoList.create({ userId, ...req.body });
    if (user) {
      res.json(newList);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    next(e);
  }
});

app.put("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const toUpdate = await TodoList.findByPk(listId);
    if (!toUpdate) {
      res.status(404).send("List not found");
    } else {
      const updated = await toUpdate.update(req.body);
      res.json(updated);
    }
  } catch (e) {
    next(e);
  }
});

app.delete("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const listDelete = await TodoList.findByPk(listId);
    if (!listDelete) {
      res.status(404).send("List not found!");
    } else {
      const deleted = await listDelete.destroy();
      res.json(deleted);
      res.status(204).send();
    }
  } catch (e) {
    next(e);
  }
});

app.delete("/users/:userId/lists", (req, res, next) => {
  app.delete("/users/:userId/lists", async (req, res, next) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await TodoList.findByPk(userId, { include: [TodoList] });
      if (!user) {
        res.status(404).send("User not found!");
      } else {
        user.TodoLists.forEach(async (list) => await list.destroy());
        res.status(204).send();
      }
    } catch (e) {
      next(e);
    }
  });
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
