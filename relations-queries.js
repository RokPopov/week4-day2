const { user, todoList } = require("./models");

async function allUsers() {
  const lists = await todoList.findAll({
    include: [{ model: user, attributes: ["id"] }],
  });

  return lists.map((list) => list.get({ plain: true }));
}

// allUsers().then((lists) => console.log(lists));

async function getUsersWithList(id) {
  const lists = await user.findByPk(id, {
    include: [todoList],
  });
  return lists.get({ plain: true });
}

getUsersWithList(2).then((user) => console.log(user));
