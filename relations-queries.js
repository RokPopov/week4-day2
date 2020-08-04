const { user, todoList, todoItem } = require("./models");

// async function allUsers() {
//   const lists = await todoList.findAll({
//     include: [{ model: user, attributes: ["id"] }],
//   });

//   return lists.map((list) => list.get({ plain: true }));
// }

// allUsers().then((lists) => console.log(lists));

async function getUsersWithList(id) {
  const lists = await user.findByPk(id, {
    include: [todoList],
  });
  return lists.get({ plain: true });
}

// getUsersWithList(2).then((user) => console.log(user));

async function getImportantItems() {
  const items = await todoItem.findAll({
    where: { important: true },
    include: { model: todoList, attributes: ["name"] },
  });
  return items.map((item) => item.get({ plain: true }));
}

// getImportantItems().then((todos) => console.log(todos));

async function getUserListTask(id) {
  const users = await user.findByPk(id, {
    include: [
      {
        model: todoList,
        attributes: ["name"],
        include: { model: todoItem, attributes: ["task"] },
      },
    ],
  });
  // return users.get({ plain: true }).todoLists[0];
  return users.get({ plain: true });
}

getUserListTask(2).then((task) => console.log(task));
