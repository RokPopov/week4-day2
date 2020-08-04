const express = require("express");
const user = require("./models").user;
const todoList = require("./models").todoList;
const todoItem = require("./models").todoItem;
const app = express();
const PORT = 4000;

app.get("/users", async (req, res) => {
  const users = await user.findAll();
  res.send(users);
});

app.get("/todolists", async (req, res) => {
  try {
    const todolists = await todoList.findAll();
    res.send(todolists);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/todoitems", async (req, res) => {
  try {
    const todoItems = await todoItem.findAll();
    res.send(todoItems);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
